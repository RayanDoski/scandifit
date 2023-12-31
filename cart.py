from flask import session
from db import make_db_connection

#to show add to card info
product_info = None

def show_products_in_cart():

    #Make Database Connection
    db = make_db_connection()
    cursor = db.cursor()

    if 'product-id' in session:
        ids = session['product-id']
        # Becouse It's a list of ids and l am using IN
        formatted_ids = ', '.join(map(str, ids))
        query = f'SELECT * FROM products WHERE id IN ({formatted_ids})'
        cursor.execute(query)
        product_info = cursor.fetchall()

        # Close Database Connection
        db.close()
        cursor.close()
        
        return product_info