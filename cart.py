from flask import session
from db import start_db_connection

# Making The connection To Database
database = start_db_connection()

#to show add to card info
product_info = None
def show_products_in_cart():
    if 'product-id' in session:
        ids = session['product-id']
        # Becouse It's a list of ids and l am using IN
        formatted_ids = ', '.join(map(str, ids))
        query = f'SELECT * FROM products WHERE id IN ({formatted_ids})'
        database[0].execute(query)
        product_info = database[0].fetchall()
        return product_info