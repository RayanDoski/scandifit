from flask import Blueprint, session, request, jsonify

cart = Blueprint('cart', __name__)

@cart.route('/GetdddCartInfo', methods=['GET', 'POST'])
def tesdddtings():
    return session['cart_items']

@cart.route('/api/GetCartInfo', methods=['GET', 'POST'])
def GetCartInfo():
    if 'cart_items' in session:
        products = []
        for items in session['cart_items']:
            product = {
                'id': items['id'],
                'subOrOnce': items['subOrOnce'],
                'name': items['name'],
                'price': items['price'],
                'picture': items['picture'],
                'quantity': items['quantity'],
                'stripePriceId': items['stripePriceId']
            }
            products.append(product)
        return jsonify(
            {
                'success': True,
                'products': products
            }
        )
    else:
        return jsonify(
            {
                'success': False
            }
        )
    
@cart.route('/api/AddCartInfo', methods=['GET', 'POST'])
def AddCartInfo():

    # Fetching info sent from frontend react
    data = request.get_json()

    id = data.get('id')
    subOrOnce = data.get('subOrOnce')
    name = data.get('name')
    price = data.get('price')
    picture = data.get('picture')
    quantity = data.get('quantity')
    stripePriceId = data.get('stripePriceId')

    # Define the new product
    new_product = {
        'id': id,
        'subOrOnce': subOrOnce,
        'name': name,
        'price': price,
        'picture': picture,
        'quantity': quantity,
        'stripePriceId': stripePriceId
        # 'id': 2,
        # 'name': 'Multiiii',
        # 'price': 499,
        # 'picture': 'opti-men-multivitamin.jpg',
        # 'quantity': 1,
        # 'stripePriceId': 'price_1OPAFZKgpFWeoEQVlTl26PyM'
    }

    if 'cart_items' not in session:
        session['cart_items'] = []
        cartItems = []
    else:
        cartItems = session['cart_items']

    # Check if the product already exists in the cart
    for items in cartItems:
        if items['id'] == new_product['id']:
            if items['subOrOnce'] != new_product['subOrOnce']:
                # Remove the old item
                cartItems.remove(items)
                # Add the new product
                cartItems.append(new_product)
                session['cart_items'] = cartItems
                return jsonify({'success': True})
            return jsonify({'success': False,})

    # Add new product to the cart
    cartItems.append(new_product)
    session['cart_items'] = cartItems

    return jsonify(
        {
            'success': True,
        }
    )

@cart.route('/api/deleteFromCart', methods=['GET', 'POST'])
def deleteItem():
    """Remove an item from the user's shopping cart."""

    # Fetching info sent from frontend react
    data = request.get_json()

    index = data.get('index')

    if 'cart_items' in session:
        items = session['cart_items']
        for item in items:
            if str(item['id']) == str(index):
                items.remove(item)
                session['cart_items'] = items

        return jsonify(
            {
                'success': True,
            }
        )
    else:
        return jsonify(
            {
                'success': False,
            }
        )    
    
@cart.route('/api/deleteAllFromCart', methods=['GET', 'POST'])
def deleteAllItem():
    """Remove an item from the user's shopping cart."""
    if 'cart_items' in session:
        session['cart_items'] = []

        return jsonify(
            {
                'success': True,
            }
        )
    else:
        return jsonify(
            {
                'success': False,
            }
        )    