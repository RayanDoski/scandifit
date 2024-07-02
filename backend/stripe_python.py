import stripe
from flask import redirect, Blueprint, session, request, render_template, jsonify
from datetime import datetime
import uuid

stripePy = Blueprint('stripePy', __name__)

stripe.api_key = 'sk_test_51O2qX1KgpFWeoEQVkbkv7tG1dSNCsq7JOfBa84AJAbWHJg2blyhO8y5ljQT8rsi2AAILHnXKBt47IdLYesxho6hG00yYZVnFw4'

your_domain = 'http://127.0.0.1:3000'

@stripePy.route('/create_checkout_session', methods=['post', 'get'])
def create_checkout_session():
    '''
    This function creates a new Checkout Session for a customer
    '''
    try:
        # Validate the request data
        data = request.get_json()
        products = data.get('products', [])

        if not products:
            return jsonify({'success': False, 'message': 'No products provided'}), 400

        # Create line items from the provided products
        line_items = []
        for product in products:
            line_items.append({
                'price': product['stripePriceId'],
                'quantity': product['quantity']
            })

        # Create a unique customer identifier
        customer_identifier = str(uuid.uuid4())

        # Get the current time
        purchase_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        checkout_session = stripe.checkout.Session.create(
            line_items=line_items,
            locale='sv',
            payment_method_types=['card', 'klarna'],
            allow_promotion_codes=True,
            phone_number_collection={"enabled": True},
            billing_address_collection='required',
            mode='payment',
            customer=stripe.Customer.create(
                id=customer_identifier,
                email='Rayan.d15@outlook.com',
            ),
            metadata={'purchase_time': purchase_time},
            success_url=f'{your_domain}/ordercomplete/{{CHECKOUT_SESSION_ID}}',
            cancel_url=f'{your_domain}/',
        )

        return jsonify({'success': True, 'redirect_url': checkout_session.url})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    

@stripePy.route('/api/stripe-session/<session_id>', methods=['GET'])
def get_stripe_session(session_id):
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        return jsonify(session)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# The code Beneth Is not in use

@stripePy.route('/scandifit_exklusiv', methods=['post', 'get'])
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

@stripePy.route('/exklusiv/<checkout_session_id>')
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

@stripePy.route("/order_complete/<session_id>", methods=['GET'])
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