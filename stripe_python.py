import stripe
from flask import redirect, Blueprint, session, request, render_template

# Get Database Informaiton
from db import make_db_connection, insert_into_user, add_phonenumber_to_user, add_adress_to_user, make_user_exklusiv

#checking if user is logged in
from login_register import is_logged_in, is_exklusiv

from datetime import datetime
import uuid

#to get the cart values 
from cart import show_products_in_cart

stripe_py = Blueprint('stripe_py', __name__)

stripe.api_key = 'sk_test_51O2qX1KgpFWeoEQVkbkv7tG1dSNCsq7JOfBa84AJAbWHJg2blyhO8y5ljQT8rsi2AAILHnXKBt47IdLYesxho6hG00yYZVnFw4'

your_domain = 'http://127.0.0.1:8000'

@stripe_py.route('/create_checkout_session', methods=['post', 'get'])
def create_checkout_session():
    '''
    This function creates a new Checkout Session for a customer
    '''
    # Define a mapping of product types to price IDs
    multivitamin_product = {
        'once': 'price_1OPAFZKgpFWeoEQVlTl26PyM',
        'sub': 'price_1OPAGDKgpFWeoEQVRiucrGxx',
    }

    #are they logged in?
    user_data = is_logged_in()

    if user_data is None:
        # This Custom Field Will Make Users Have To Enter A Password Becouse They Don't Have An Account 
        custom_field_info = {
            "key": "password",
            "label": {"type": "custom", "custom": "Välj Ett Lösenord För Ditt Scandifit Konto"},
            "type": "text",
        }

        # Adding The appropriate mail becouse they aren't logged in
        mail = None

    else:
        custom_field_info = {}
        mail = user_data[2]

    # Checking witch items that are in cart
    if 'cart_pid' in session:

        for items in session['cart_pid']:
            if items[0] == 1 and items[1] in multivitamin_product:
                
                if items[1] == 'once':
                    mode = 'payment'
                    card = ['card', 'klarna']

                    # Getting The Amount
                    if request.method == 'POST':
                        quantity = request.form.get(f'quantity{items[0]}')

                elif items[1] == 'sub':
                    mode = 'subscription'
                    card = ['card']
                    
                    # Getting The Amount
                    quantity = 1
                
                line_item_variable = {
                    'price': multivitamin_product[items[1]],
                    'quantity': quantity
                }

    # If They Complete the Order, where do we send them?
    success_end_url = '/order_complete/{CHECKOUT_SESSION_ID}'
    return stripe_checkout_code(line_item_variable, card, mode, success_end_url, custom_field_info, mail)

@stripe_py.route('/scandifit_exklusiv', methods=['post', 'get'])
def scandifit_exklusiv_checkout():
    '''
    This Function Creates a new checkout only for the exklusiv plan 
    '''
    # We Don't Want Any Custom Fields By Default
    custom_field_info = {}

    #are they logged in?
    user_data = is_logged_in()

    if user_data is None:
        # This Custom Field Will Make Users Have To Enter A Password Becouse They Don't Have An Account 
        custom_field_info = {
            "key": "password",
            "label": {"type": "custom", "custom": "Välj Ett Lösenord För Ditt Scandifit Konto"},
            "type": "text",
        }

        # Mail needs To Be Sent
        mail = None
    else:
        mail = user_data[2]


    # The Produkt To Checkout    
    line_item_variable = {
        'price': 'price_1OdKJvKgpFWeoEQVRnXzYV2L',
        'quantity': 1
    }
    
    # Type Of Payment And Payment Providers
    mode = 'payment'
    card = ['card', 'klarna']

    # If They Complete the Order, where do we send them?
    success_end_url = '/exklusiv/{CHECKOUT_SESSION_ID}'
    return stripe_checkout_code(line_item_variable, card, mode, success_end_url, custom_field_info, mail)

def stripe_checkout_code(line_item_variable, card, mode, success_end_url, custom_field_info, mail):
    '''
    This Function Creates the checkout
    '''
    try:

        # Generate a unique customer identifier (you can use your own logic)
        customer_identifier = str(uuid.uuid4())

        # Get the current time
        purchase_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        checkout_session = stripe.checkout.Session.create(
            line_items = [
                line_item_variable
            ],

            custom_fields=[
                custom_field_info
            ],

            # In sweden
            locale='sv',

            # Payment options we provide
            payment_method_types=card,

            # Already inserted mail
            # customer_email='Rayan.d15@outlook.com',

            # Allow promotions
            allow_promotion_codes=True,

            # Phonenr reqired
            phone_number_collection={"enabled": True},
            
            # Add collection
            billing_address_collection='required',

            # Billing mode
            mode=mode,

            # Giving customer a value, (For retrival Purposes)
            customer=stripe.Customer.create(
                id=customer_identifier,
                email=mail,
            ),

            # Create Date When Purchases
            metadata={
                'purchase_time': purchase_time
            },

            # Success and cancel url:s
            success_url = your_domain + success_end_url,
            cancel_url = your_domain + '/',

        )
    
    except Exception as e:
        return str(e)
    
    return redirect(checkout_session.url)

@stripe_py.route('/exklusiv/<checkout_session_id>')
def become_exklusiv(checkout_session_id):
    '''
    This function makes users exklusiv and adds values there values to out database

    What functions does this function use:
    - make_user_exklusiv
    - insert_into_user
    - add_phonenumber_to_user
    - add_adress_to_user
    '''
    try:
        
        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        stripe_session = stripe.checkout.Session.retrieve(checkout_session_id)
        customer = stripe.Customer.retrieve(stripe_session.customer)

        # It Works, This Will Retrive The Password
        password = next((field.get("text", {}).get("value") for field in stripe_session.get("custom_fields", []) if field.get("key") == "password"), None)

        if password:
            # Creating a New User And retriving His ID
            uid = insert_into_user(stripe_session.customer_details.name, stripe_session.customer_details.email, password)
        else:
            # Are they logged in?
            user_data = is_logged_in()
            if user_data is not None:
                uid = user_data[0]
        
        # Looking if user has Phonenumber
        cursor.execute('select * from phonenumber where uid = %s', (uid))
        phone_number = cursor.fetchone()

        if phone_number is None:
            add_phonenumber_to_user(uid, stripe_session.customer_details.phone)

        # Looking if user has adress connected to their account
        cursor.execute('select * from adress where uid = %s', (uid))
        address = cursor.fetchone()

        if address is None:
            # Giving User Adress Information
            add_adress_to_user(uid, f'{stripe_session.customer_details.address.line1} {stripe_session.customer_details.address.line2}', stripe_session.customer_details.address.postal_code, stripe_session.customer_details.address.city)

        # Make User Exklusiv
        make_user_exklusiv(uid)
            
        # Giving The Session Its approprtiate User
        session['user_id'] = uid

        return redirect('/profile/trainingplan')

    except:
        return redirect('/scandifit_exklusiv')
    finally:
        # Close Database Connection
        db.close()
        cursor.close()

@stripe_py.route("/order_complete/<session_id>", methods=['GET'])
def order_complete(session_id):
    '''
    This function handles completed orders

    This function also adds values to database
    '''
    try:
        
        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        stripe_session = stripe.checkout.Session.retrieve(session_id)
        customer = stripe.Customer.retrieve(stripe_session.customer)

        # It Works, This Will Retrive The Password
        password = next((field.get("text", {}).get("value") for field in stripe_session.get("custom_fields", []) if field.get("key") == "password"), None)

        if password:
            # Creating a New User And retriving His ID
            uid = insert_into_user(stripe_session.customer_details.name, stripe_session.customer_details.email, password)
        else:
            # Are they logged in?
            user_data = is_logged_in()
            if user_data is not None:
                uid = user_data[0]
        
        # Looking if user has Phonenumber
        cursor.execute('select * from phonenumber where uid = %s', (uid))
        phone_number = cursor.fetchone()

        if phone_number is None:
            add_phonenumber_to_user(uid, stripe_session.customer_details.phone)

        # Looking if user has adress connected to their account
        cursor.execute('select * from adress where uid = %s', (uid))
        address = cursor.fetchone()

        if address is None:
            # Giving User Adress Information
            add_adress_to_user(uid, f'{stripe_session.customer_details.address.line1} {stripe_session.customer_details.address.line2}', stripe_session.customer_details.address.postal_code, stripe_session.customer_details.address.city)
            
        # Giving The Session Its approprtiate User
        session['user_id'] = uid
        
        # Radera deras Kundvagn
        if 'cart_pid' in session:
            session.pop('cart_pid')

        return render_template('order_complete.html', cart_info=show_products_in_cart(), customer=customer, stripe_session=stripe_session)
    except:
        return redirect('/')
    finally:
        # Close Database Connection
        db.close()
        cursor.close()