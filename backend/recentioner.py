import os
from urllib.parse import urlparse, urlunparse
from flask import Blueprint, render_template, request, session, redirect, url_for
from db import make_db_connection

# To get the cart values 
from cart import show_products_in_cart

recensioner = Blueprint('recensioner', __name__)

def recension(product_html, pid, view_first):
    '''
    When Viewing a product We view It throue This Function IN Order to display the reviews
    '''
    try:

        #Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        review_values =  getting_review_values_for_specific_product(pid)

        # If these values Values Exist We Will retrive them 
        view_first = request.args.get('view_first')

        cursor.execute("SELECT *  FROM review WHERE pid = %s ORDER BY CASE WHEN id = %s THEN 0 ELSE 1 END, helpful DESC;", (pid, view_first,))
        reviews = cursor.fetchall()
        return render_template(product_html, cart_info=show_products_in_cart(), product_html=product_html, pid=pid, reviews=reviews, average_rating=review_values[5], percentage_five_star=review_values[0], percentage_four_star=review_values[1], percentage_three_star=review_values[2], percentage_two_star=review_values[3], percentage_one_star=review_values[4])
    
    finally:

        # Close Database Connection
        db.close()
        cursor.close()

def show_specific_reviews(product_html, product_id, show_review):
    '''
    When Viewing a product We view It throue This Function IN Order to display the reviews

    This function varies becouse it allows an extra varaiable: show_review

    - show_review (string): this varaible will allow you to view specfic reviews example: 5 stars, or show all reviews
    '''
    try:
        #Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        review_values =  getting_review_values_for_specific_product(product_id)

        # If They Want To View All The Top Reviews 
        if show_review == 'top':
            cursor.execute("select * from review where pid = %s ORDER BY helpful DESC", (product_id,))
            reviews = cursor.fetchall()
            return render_template(product_html, cart_info=show_products_in_cart(), product_html=product_html, product_id=product_id, reviews=reviews, average_rating=review_values[5], percentage_five_star=review_values[0], percentage_four_star=review_values[1], percentage_three_star=review_values[2], percentage_two_star=review_values[3], percentage_one_star=review_values[4])
        
        cursor.execute("select * from review where pid = %s AND stars = %s", (product_id, show_review,))
        reviews = cursor.fetchall()
        return render_template(product_html, cart_info=show_products_in_cart(), product_html=product_html, product_id=product_id, reviews=reviews, average_rating=review_values[5], percentage_five_star=review_values[0], percentage_four_star=review_values[1], percentage_three_star=review_values[2], percentage_two_star=review_values[3], percentage_one_star=review_values[4])
    
    finally:
        # Close Database Connection
        db.close()
        cursor.close()

@recensioner.route("/insert_review/<pid>", methods=['GET', 'POST'])
def insert_review(pid):
        '''
        Inserting A Review For A Product Is Done Through THis Function

        return:
        - redirect(base_url + '?view_first=' + str(rid) + '#review')
        '''
        try:

            #Make Database Connection
            db = make_db_connection()
            cursor = db.cursor()

            if request.method == 'POST':

                # Retreving The Values
                star = request.form.get('star')
                rubrik = request.form.get('rubrik')
                recention = request.form.get('recention')
                name = request.form.get('name')

                # Inserting The Review Valeus
                cursor.execute('insert into review (name, stars, rubrik, review_text, pid, helpful, verifierad) values (%s, %s, %s, %s, %s, %s, %s)', (name, star, rubrik, recention, pid, 0, 'Inte Verifierad'))
                db.commit()

                # Retrieve the last inserted id
                cursor.execute('SELECT LAST_INSERT_ID()')
                rid = cursor.fetchone()[0]

                # If they added a picture
                if 'picture' in request.files:
                    file = request.files['picture']
                    if file:
                        if file.filename != '':
                            # Create the upload folder if it doesn't exist
                            if not os.path.exists('/Users/rayan/Documents/scandifit/static/pictures/review-pictures'):
                                os.makedirs('/Users/rayan/Documents/scandifit/static/pictures/review-pictures')
                    
                        # Save the uploaded file to the specified folder
                        file.save(os.path.join('/Users/rayan/Documents/scandifit/static/pictures/review-pictures', file.filename))
                        # Inserting The values For The Image That They Inserted
                        cursor.execute('insert into image (rid, image) values (%s, %s)', (rid, file.filename))
                        db.commit()

                # Get the base URL without query parameters
                referrer_url = request.referrer
                parsed_url = urlparse(referrer_url)

                # Get the base URL without query parameters
                base_url = urlunparse((parsed_url.scheme, parsed_url.netloc, parsed_url.path, '', '', ''))

                return redirect(base_url + '?view_first=' + str(rid) + '#review')
        finally:
            # Close Database Connection
            db.close()
            cursor.close()

@recensioner.route("/helpful/<id>")
def helpful(id):
    '''
    This function adds one onto helpful when its clicked

    return:
        - redirect(base_url + '?view_first=' + str(rid) + '#review')
    '''
    try:

        #Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        if 'helpful' not in session:
            session['helpful']= []
            session['helpful'].append(id)

            # Reasigning It's Own value To Itself 
            session['helpful'] = session['helpful']

            # Adding Value To helpful where id matches
            cursor.execute("UPDATE review SET helpful = helpful + 1 WHERE id = %s;", (id,))
            db.commit()

        else:
            if id not in session['helpful']:

                session['helpful'].append(id)

                # Reasigning It's Own value To Itself 
                session['helpful'] = session['helpful']

                # Adding Value To helpful where id matches
                cursor.execute("UPDATE review SET helpful = helpful + 1 WHERE id = %s;", (id),)
                db.commit()

        # Get the base URL without query parameters
        referrer_url = request.referrer
        parsed_url = urlparse(referrer_url)

        # Get the base URL without query parameters
        base_url = urlunparse((parsed_url.scheme, parsed_url.netloc, parsed_url.path, '', '', ''))

        return redirect(base_url + '?view_first=' + str(id) + '#review')
        # return redirect(url_for('recensioner.recension', pid=pid))
    
    finally:
        # Close Database Connection
        db.close()
        cursor.close()

def calculates_percentage_of_star(cursor, pid, stars, amount_of_rows):
    '''
    This function calculates procentage of specific stars,

    Example:
    - 5 stars: 38%
    - 4 stars: 20%
    - 3 stars: 10%
    - etc...

    '''
    cursor.execute('SELECT COUNT(*) FROM review WHERE pid = %s AND stars = %s', (pid, stars,))
    star_reviews = cursor.fetchone()[0]

    if amount_of_rows > 0:
        percentage_star = round(star_reviews / amount_of_rows, 3) * 100
        percentage_star = "{:.1f}".format(percentage_star)
    else:
        percentage_star = 0
    
    return percentage_star

def getting_review_values_for_specific_product(product_id):
    '''
    This Function calculates The procentage of stars for the chosen product

    return:
    - percentage_five_star
    - percentage_four_star
    - percentage_three_star
    - percentage_two_star
    - percentage_one_star
    - average_rating
    '''
    #Make Database Connection
    db = make_db_connection()
    cursor = db.cursor()

    try:
        cursor.execute('SELECT COUNT(*) FROM review WHERE pid = %s', (product_id,))
        amount_of_rows = cursor.fetchone()[0]  # Access the first element of the tuple

        cursor.execute('SELECT SUM(stars) FROM review WHERE pid = %s', (product_id,))
        amount_of_stars = cursor.fetchone()[0]  # Access the first element of the tuple

        if amount_of_rows > 0:
            average_rating = round(amount_of_stars / amount_of_rows, 2)
            average_rating = "{:.1f}".format(average_rating)
        else:
            average_rating = 0

        # five star
        percentage_five_star = calculates_percentage_of_star(cursor, product_id, 5, amount_of_rows)
        
        # four star
        percentage_four_star = calculates_percentage_of_star(cursor, product_id, 4, amount_of_rows)

        # three star
        percentage_three_star = calculates_percentage_of_star(cursor, product_id, 3, amount_of_rows)

        # two star
        percentage_two_star = calculates_percentage_of_star(cursor, product_id, 2, amount_of_rows)

        # one star
        percentage_one_star = calculates_percentage_of_star(cursor, product_id, 1, amount_of_rows)

        return percentage_five_star, percentage_four_star, percentage_three_star, percentage_two_star, percentage_one_star, average_rating

    finally:
        # Close Database Connection
        db.close()
        cursor.close()