from flask import session
from db import cursor

#to show add to card info
product_info = None
def show_products_in_cart():
    if 'product-id' in session:
        ids = session['product-id']
        #Becouse It's a list of ids and l am using IN
        formatted_ids = ', '.join(map(str, ids))
        query = f'SELECT * FROM products WHERE id IN ({formatted_ids})'
        cursor.execute(query)
        product_info = cursor.fetchall()
        return product_info