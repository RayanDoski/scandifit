import stripe
from flask import redirect, Blueprint, session, request, render_template, jsonify
from datetime import datetime
import uuid

stripePy = Blueprint('stripePy', __name__)

stripe.api_key = 'sk_test_51O2qX1KgpFWeoEQVkbkv7tG1dSNCsq7JOfBa84AJAbWHJg2blyhO8y5ljQT8rsi2AAILHnXKBt47IdLYesxho6hG00yYZVnFw4'

your_domain = 'http://127.0.0.1:3000'

@stripePy.route('/api/create_checkout_session', methods=['post', 'get'])
def create_checkout_session():
    '''
    This function creates a new Checkout Session for a customer
    '''
    try:
        # Validate the request data
        data = request.get_json()
        products = data.get('products', [])

        if not products:
            return jsonify({'success': False, 'message': 'Din varukorg är tom'}), 400

        # default Values
        mode = 'payment'
        payment_method_types = ['card', 'klarna']
        discounts = []
        allow_promotion_codes = True

        # Create line items from the provided products
        line_items = []
        for product in products:
            # Checking if it's subscription
            if product['subOrOnce'] == 'sub':
                mode = 'subscription'
                payment_method_types = ['card']
                discounts = [{"coupon": 'UhRLUPk3'}]
                allow_promotion_codes = None

            line_items.append({
                'price': product['stripePriceId'],
                'quantity': product['quantity']
            })

        # Create a unique customer identifier
        customer_identifier = str(uuid.uuid4())

        checkout_session = stripe.checkout.Session.create(
            line_items=line_items,
            locale='sv',
            discounts=discounts,
            payment_method_types=payment_method_types,
            allow_promotion_codes=allow_promotion_codes,
            phone_number_collection={"enabled": True},
            billing_address_collection='required',
            mode=mode,

            # To indentify Specifik Customers
            customer=stripe.Customer.create(
                id=customer_identifier,
            ),

            # Getting The time of Purchase 
            metadata={'purchase_time': datetime.now().strftime("%Y-%m-%d %H:%M:%S")},

            # Where they are directed to depending on success of failure
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