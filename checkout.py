import stripe
from flask import redirect, Blueprint, render_template, session, request
from db import db, cursor
#to get the cart values 
from cart import show_products_in_cart
from datetime import datetime


checkout = Blueprint('checkout', __name__)

stripe.api_key = 'sk_test_51O2qX1KgpFWeoEQVkbkv7tG1dSNCsq7JOfBa84AJAbWHJg2blyhO8y5ljQT8rsi2AAILHnXKBt47IdLYesxho6hG00yYZVnFw4'

your_domain = 'http://127.0.0.1:8000'

# Generate a unique customer identifier (you can use your own logic)
import uuid
customer_identifier = str(uuid.uuid4())

@checkout.route('/create-checkout-session', methods=['post', 'get'])
def create_checkout_session():
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


@checkout.route('/delete-from-cart')
def delete_item():
    item_id = request.args.get('id')

    if 'product-id' in session:
        product_ids = session['product-id']

        if int(item_id) in session['product-id']:
            product_ids.remove(int(item_id))
            session['product-id'] = product_ids

        if not session['product-id']:
            session.pop('product-id')
            return redirect(request.referrer)
        
        return redirect(request.referrer)

from recentioner import recension
@checkout.route("/multivitamin")
def product():
    # Visar recention Samtidigt Som Du Visar Sidan
    return recension('product-page.html', 1)

@checkout.route('/add-product', methods=['post', 'get'])
def add_product():
    id = request.args.get('id')
    if 'product-id' not in session:
        session['product-id'] = []
    if int(id) not in session['product-id']:
        product_ids = session['product-id']
        product_ids += [int(id)]

        #subscription product and one itme purchase not together
        if 1 in product_ids and 2 in product_ids:
            product_ids.remove(1)

    return redirect(request.referrer)

