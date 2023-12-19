import stripe
from flask import redirect, Blueprint, session, request, render_template
from datetime import datetime
import uuid

#to get the cart values 
from cart import show_products_in_cart

stripe_py = Blueprint('stripe_py', __name__)

stripe.api_key = 'sk_test_51O2qX1KgpFWeoEQVkbkv7tG1dSNCsq7JOfBa84AJAbWHJg2blyhO8y5ljQT8rsi2AAILHnXKBt47IdLYesxho6hG00yYZVnFw4'

your_domain = 'http://127.0.0.1:8000'

@stripe_py.route('/create-checkout-session', methods=['post', 'get'])
def create_checkout_session():

    # Generate a unique customer identifier (you can use your own logic)
    customer_identifier = str(uuid.uuid4())

    #checking witch items that are in cart
    if 'product-id' in session:
        product_ids = session['product-id']
        for ids in product_ids:
            if ids == 1:

                if request.method == 'POST':
                    quanity = request.form.get('quanity1')

                line_item_variable = {
                    'price': 'price_1OAZRrKgpFWeoEQVvgaTuAC2',
                    'quantity': quanity
                }

                mode = 'payment'
                card = ['card', 'klarna']

            elif ids == 2:

                line_item_variable = {
                    'price': 'price_1OC2sCKgpFWeoEQVt8v8nDVm',
                    'quantity': 1
                }
                
                mode = 'subscription'
                card = ['card']
            
    try:

        # Get the current time
        purchase_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        checkout_session = stripe.checkout.Session.create(
            line_items = [
                line_item_variable
            ],

            #in sweden
            locale='sv',

            #payment options we provide
            payment_method_types=card,

            #Already inserted mail
            # customer_email='Rayan.d15@outlook.com',

            #allow promotions
            allow_promotion_codes=True,

            #phonenr reqired
            phone_number_collection={"enabled": True},
            
            #add collection
            billing_address_collection='required',

            #billing mode
            mode=mode,

            #Giving customer a value, (For retrival Purposes)
            customer=stripe.Customer.create(id=customer_identifier),

            # Create Date When Purchases
            metadata={
                'purchase_time': purchase_time
            },

            #success and cancel url:s
            success_url = your_domain + '/order-complete?session_id={CHECKOUT_SESSION_ID}',
            cancel_url = your_domain + '/',

        )
    
    except Exception as e:
        return str(e)
    
    return redirect(checkout_session.url)

@stripe_py.route("/order-complete", methods=['GET'])
def order_complete():
    try:
        stripe_session = stripe.checkout.Session.retrieve(request.args.get(('session_id')))
        customer = stripe.Customer.retrieve(stripe_session.customer)
        
        #Radera deras Kundvagn
        if 'product-id' in session:
            session.pop('product-id')

        return render_template('order-complete.html', product_info=show_products_in_cart(), customer=customer, stripe_session=stripe_session)
    except:
        return redirect('/')