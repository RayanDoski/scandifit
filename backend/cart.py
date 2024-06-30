from flask import redirect, Blueprint, session, request, jsonify
from db import make_db_connection

cart = Blueprint('cart', __name__)

@cart.route('/GetdddCartInfo', methods=['GET', 'POST'])
def tesdddtings():
    return session['cart_items']

@cart.route('/GetCartInfo', methods=['GET', 'POST'])
def GetCartInfo():
    if 'cart_items' in session:
        products = []
        for items in session['cart_items']:
            product = {
                'id': items['id'],
                'name': items['name'],
                'price': items['price'],
                'picture': items['picture'],
                'quantity': items['quantity']
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
    
@cart.route('/AddCartInfo', methods=['GET', 'POST'])
def AddCartInfo():

    # # Fetching info sent from frontend react
    # data = request.get_json()

    # id = data.get('id')
    # name = data.get('name')
    # price = data.get('price')
    # picture = data.get('picture')
    # quantity = data.get('quantity')

    # Define the new product
    new_product = {
        # 'id': id,
        # 'name': name,
        # 'price': price,
        # 'picture': picture,
        # 'quantity': quantity

        'id': 2,
        'name': 'Multiiii',
        'price': 499,
        'picture': 'opti-men-multivitamin.jpg',
        'quantity': 1
    }

    if 'cart_items' not in session:
        session['cart_items'] = []
        cartItems = []
    else:
        cartItems = session['cart_items']

    # Check if the product already exists in the cart
    for items in cartItems:
        if items['id'] == new_product['id']:
            return jsonify(
                {
                    'success': False,
                    'message': 'Product already in cart'
                }
            )

    # Add new product to the cart
    cartItems.append(new_product)
    session['cart_items'] = cartItems

    return jsonify(
        {
            'success': True,
            'message': 'Product added to cart'
        }
    )

@cart.route('/deleteFromCart', methods=['GET', 'POST'])
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

# The code beneth is not in use

@cart.route('/add_product/<product>', methods=['post', 'get'])
def add_product(product):
    '''
    Add a product to session['cart_pid'].

    args:
    - product (str): The ID of the product being added.
    - sub_or_once (str): Either Sub or Once
    '''

    # Get product and subscription type from request
    if product is not None:
        product = int(product)
    sub_or_once = request.args.get('sub_or_once')
    
    # Making A List Of The Product They Added
    added_to_cart = [product, sub_or_once]

    # It's The First Product They are Adding To Cart
    if 'cart_pid' not in session:
        session['cart_pid'] = []
        session['cart_pid'].append(added_to_cart)

        # Reasigning seesion value to itself after any change
        session['cart_pid'] = session['cart_pid']

        return redirect(request.referrer)

    # This Variable Has a default value of true, it can change later on in the for loop
    product_add = True

    for items in session['cart_pid']:
        if items[0] == product:
            # We Only Change The Value Of The Payment Type
            items[1] = sub_or_once

            # Reasigning seesion vlaue to itself afer any change
            session['cart_pid'] = session['cart_pid']

            # New Product Will Not be Added
            product_add = False
    
    if product_add:
        session['cart_pid'].append(added_to_cart)

        # Reasigning seesion vlaue to itself afer any change
        session['cart_pid'] = session['cart_pid']
        
    return redirect(request.referrer)

def show_products_in_cart():
    '''
    This Function Tkaes Information from Cart_pid and extrakts the ids from the database product and sends back two lists, one with the database product infomration and the other is cart_pid

    args:
    - item_info_list (list): List of products from database
    - cart_pid (list): List of id and payments type (sub or once)
    '''
    try:
        #Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        item_info_list = []
        cart_pid = []

        if 'cart_pid' in session:

            cart_pid = session['cart_pid']

            for items in cart_pid:
                cursor.execute('select * from product where id = %s', (items[0]))
                item_info = cursor.fetchone()
                item_info_list.append(item_info)

        return item_info_list, cart_pid
        
    finally:
        # Close Database Connection
        db.close()
        cursor.close()