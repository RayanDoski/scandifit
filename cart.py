from flask import session
from db import cursor

#to show add to card info
product_info = None
def show_products_in_cart():
    if 'product-id' in session:
        ids = session['product-id']
        cursor.execute('SELECT * FROM products WHERE id IN %s', (ids,))
        product_info = cursor.fetchall()
        return product_info