import os
from urllib.parse import urlparse, urlunparse, parse_qsl, urlencode
from flask import Blueprint, render_template, request, session, redirect
from db import db, cursor
#to get the cart values 
from cart import show_products_in_cart

recensioner = Blueprint('recensioner', __name__)

@recensioner.route("/recension/<product_html>/<product_id>", methods=['GET', 'POST'])
def recension(product_html, product_id):

    cursor.execute('SELECT COUNT(*) FROM reviews WHERE product_id = %s', (product_id,))
    amount_of_rows = cursor.fetchone()[0]  # Access the first element of the tuple

    cursor.execute('SELECT SUM(stars) FROM reviews WHERE product_id = %s', (product_id,))
    amount_of_stars = cursor.fetchone()[0]  # Access the first element of the tuple

    if amount_of_rows > 0:
        average_rating = round(amount_of_stars / amount_of_rows, 2)
        average_rating = "{:.1f}".format(average_rating)
    else:
        average_rating = 0

    # five star
    cursor.execute('SELECT COUNT(*) FROM reviews WHERE product_id = %s AND stars = 5', (product_id,))
    five_star_reviews = cursor.fetchone()[0]

    if amount_of_rows > 0:
        percentage_five_star = round(five_star_reviews / amount_of_rows, 3) * 100
        percentage_five_star = "{:.1f}".format(percentage_five_star)
    else:
        percentage_five_star = 0
    
    # four star
    cursor.execute('SELECT COUNT(*) FROM reviews WHERE product_id = %s AND stars = 4', (product_id,))
    four_star_reviews = cursor.fetchone()[0]

    if amount_of_rows > 0:
        percentage_four_star = round(four_star_reviews / amount_of_rows, 3) * 100
        percentage_four_star = "{:.1f}".format(percentage_four_star)
    else:
        percentage_five_star = 0

    # three star
    cursor.execute('SELECT COUNT(*) FROM reviews WHERE product_id = %s AND stars = 3', (product_id,))
    three_star_reviews = cursor.fetchone()[0]

    if amount_of_rows > 0:
        percentage_three_star = round(three_star_reviews / amount_of_rows, 3) * 100
        percentage_three_star = "{:.1f}".format(percentage_three_star)
    else:
        percentage_five_star = 0

    # two star
    cursor.execute('SELECT COUNT(*) FROM reviews WHERE product_id = %s AND stars = 2', (product_id,))
    two_star_reviews = cursor.fetchone()[0]

    if amount_of_rows > 0:
        percentage_two_star = round(two_star_reviews / amount_of_rows, 3) * 100
        percentage_two_star = "{:.1f}".format(percentage_two_star)
    else:
        percentage_five_star = 0

    # one star
    cursor.execute('SELECT COUNT(*) FROM reviews WHERE product_id = %s AND stars = 1', (product_id,))
    one_star_reviews = cursor.fetchone()[0]

    if amount_of_rows > 0:
        percentage_one_star = round(one_star_reviews / amount_of_rows, 3) * 100
        percentage_one_star = "{:.1f}".format(percentage_one_star)
    else:
        percentage_five_star = 0


    # viewing order review 
    if request.method == 'POST':
        order_by = request.form.get('order-reviews')
        if order_by == 'top':
            top_review = 'selected'
            five_review = ''
            four_review = ''
            three_review = ''
            two_review = ''
            one_review = ''
            cursor.execute("select * from reviews where product_id = %s ORDER BY helpful DESC", (product_id,))
            reviews = cursor.fetchall()
            return render_template(product_html, product_info=show_products_in_cart(), product_html=product_html, product_id=product_id, reviews=reviews, top_review=top_review, five_review=five_review, four_review=four_review, three_review=three_review, two_review=two_review, one_review=one_review, average_rating=average_rating, percentage_five_star=percentage_five_star, percentage_four_star=percentage_four_star, percentage_three_star=percentage_three_star, percentage_two_star=percentage_two_star, percentage_one_star=percentage_one_star)
        elif order_by == 'five':
            top_review = ''
            five_review = 'selected'
            four_review = ''
            three_review = ''
            two_review = ''
            one_review = ''
            cursor.execute("select * from reviews where product_id = %s AND stars = 5", (product_id,))
            reviews = cursor.fetchall()
            return render_template(product_html, product_info=show_products_in_cart(), product_html=product_html, product_id=product_id, reviews=reviews, top_review=top_review, five_review=five_review, four_review=four_review, three_review=three_review, two_review=two_review, one_review=one_review, average_rating=average_rating, percentage_five_star=percentage_five_star, percentage_four_star=percentage_four_star, percentage_three_star=percentage_three_star, percentage_two_star=percentage_two_star, percentage_one_star=percentage_one_star)
        elif order_by == 'four':
            top_review = ''
            five_review = ''
            four_review = 'selected'
            three_review = ''
            two_review = ''
            one_review = ''
            cursor.execute("select * from reviews where product_id = %s AND stars = 4", (product_id,))
            reviews = cursor.fetchall()
            return render_template(product_html, product_info=show_products_in_cart(), product_html=product_html, product_id=product_id, reviews=reviews, top_review=top_review, five_review=five_review, four_review=four_review, three_review=three_review, two_review=two_review, one_review=one_review, average_rating=average_rating, percentage_five_star=percentage_five_star, percentage_four_star=percentage_four_star, percentage_three_star=percentage_three_star, percentage_two_star=percentage_two_star, percentage_one_star=percentage_one_star)
        elif order_by == 'three':
            top_review = ''
            five_review = ''
            four_review = ''
            three_review = 'selected'
            two_review = ''
            one_review = ''
            cursor.execute("select * from reviews where product_id = %s AND stars = 3", (product_id,))
            reviews = cursor.fetchall()
            return render_template(product_html, product_info=show_products_in_cart(), product_html=product_html, product_id=product_id, reviews=reviews, top_review=top_review, five_review=five_review, four_review=four_review, three_review=three_review, two_review=two_review, one_review=one_review, average_rating=average_rating, percentage_five_star=percentage_five_star, percentage_four_star=percentage_four_star, percentage_three_star=percentage_three_star, percentage_two_star=percentage_two_star, percentage_one_star=percentage_one_star)
        elif order_by == 'two':
            top_review = ''
            five_review = ''
            four_review = ''
            three_review = ''
            two_review = 'selected'
            one_review = ''
            cursor.execute("select * from reviews where product_id = %s AND stars = 2", (product_id,))
            reviews = cursor.fetchall()
            return render_template(product_html, product_info=show_products_in_cart(), product_html=product_html, product_id=product_id, reviews=reviews, top_review=top_review, five_review=five_review, four_review=four_review, three_review=three_review, two_review=two_review, one_review=one_review, average_rating=average_rating, percentage_five_star=percentage_five_star, percentage_four_star=percentage_four_star, percentage_three_star=percentage_three_star, percentage_two_star=percentage_two_star, percentage_one_star=percentage_one_star)
        elif order_by == 'one':
            top_review = ''
            five_review = ''
            four_review = ''
            three_review = ''
            two_review = ''
            one_review = 'selected'
            cursor.execute("select * from reviews where product_id = %s AND stars = 1", (product_id,))
            reviews = cursor.fetchall()
            return render_template(product_html, product_info=show_products_in_cart(), product_html=product_html, product_id=product_id, reviews=reviews, top_review=top_review, five_review=five_review, four_review=four_review, three_review=three_review, two_review=two_review, one_review=one_review, average_rating=average_rating, percentage_five_star=percentage_five_star, percentage_four_star=percentage_four_star, percentage_three_star=percentage_three_star, percentage_two_star=percentage_two_star, percentage_one_star=percentage_one_star)
    
    added_review = request.args.get('addreview')
    helpful_clicked_id = request.args.get('helpfulid')
    if added_review:
        top_review = 'selected'
        five_review = ''
        four_review = ''
        three_review = ''
        two_review = ''
        one_review = ''
        cursor.execute("select * from reviews where product_id = %s ORDER BY id DESC", (product_id,))
        reviews = cursor.fetchall()
        return render_template(product_html, product_info=show_products_in_cart(), product_html=product_html, product_id=product_id, reviews=reviews, top_review=top_review, five_review=five_review, four_review=four_review, three_review=three_review, two_review=two_review, one_review=one_review, average_rating=average_rating, percentage_five_star=percentage_five_star, percentage_four_star=percentage_four_star, percentage_three_star=percentage_three_star, percentage_two_star=percentage_two_star, percentage_one_star=percentage_one_star)
    elif helpful_clicked_id:
        top_review = 'selected'
        five_review = ''
        four_review = ''
        three_review = ''
        two_review = ''
        one_review = ''
        cursor.execute("(SELECT * FROM reviews WHERE product_id = %s AND id = %s) UNION ALL (SELECT * FROM reviews WHERE product_id = %s AND id != %s ORDER BY id DESC)", (product_id, helpful_clicked_id, product_id, helpful_clicked_id))
        reviews = cursor.fetchall()
        return render_template(product_html, product_info=show_products_in_cart(), product_html=product_html, product_id=product_id, reviews=reviews, top_review=top_review, five_review=five_review, four_review=four_review, three_review=three_review, two_review=two_review, one_review=one_review, average_rating=average_rating, percentage_five_star=percentage_five_star, percentage_four_star=percentage_four_star, percentage_three_star=percentage_three_star, percentage_two_star=percentage_two_star, percentage_one_star=percentage_one_star)
    else:
        top_review = 'selected'
        five_review = ''
        four_review = ''
        three_review = ''
        two_review = ''
        one_review = ''
        cursor.execute("select * from reviews where product_id = %s ORDER BY helpful DESC", (product_id,))
        reviews = cursor.fetchall()
        return render_template(product_html, product_info=show_products_in_cart(), product_html=product_html, product_id=product_id, reviews=reviews, top_review=top_review, five_review=five_review, four_review=four_review, three_review=three_review, two_review=two_review, one_review=one_review, average_rating=average_rating, percentage_five_star=percentage_five_star, percentage_four_star=percentage_four_star, percentage_three_star=percentage_three_star, percentage_two_star=percentage_two_star, percentage_one_star=percentage_one_star)
    

#inserting reviews
@recensioner.route("/insert-review/<product_id>", methods=['GET', 'POST'])
def insert_review(product_id):
        if request.method == 'POST':
            star = request.form.get('star')
            rubrik = request.form.get('rubrik')
            recention = request.form.get('recention')
            name = request.form.get('name')
            if 'picture' in request.files:
                file = request.files['picture']
                if file:
                    if file.filename != '':
                        # Create the upload folder if it doesn't exist
                        if not os.path.exists('/Users/rayan/Documents/scandifit/static/pictures/review-pictures'):
                            os.makedirs('/Users/rayan/Documents/scandifit/static/pictures/review-pictures')
                
                    # Save the uploaded file to the specified folder
                    file.save(os.path.join('/Users/rayan/Documents/scandifit/static/pictures/review-pictures', file.filename))
            cursor.execute('insert into reviews (name, stars, rubrik, review_text, product_id, helpful, verifierad, image) values (%s, %s, %s, %s, %s, %s, %s, %s)', (name, star, rubrik, recention, product_id, 0, 'Inte Verifierad', file.filename))
            db.commit()
            
            # Get the base URL without query parameters
            parts = list(urlparse(request.referrer))
            parts = list(urlparse(request.referrer))
            query_params = dict(parse_qsl(parts[4]))
            query_params['addreview'] = True
            parts[4] = urlencode(query_params)

            # Construct the new URL
            url_with_query = urlunparse(parts)

            return redirect(url_with_query)
        
#add helpful count
@recensioner.route("/helpful")
def helpful():
    id = request.args.get('id')
    
    # Get the base URL without query parameters
    parts = list(urlparse(request.referrer))
    parts = list(urlparse(request.referrer))
    query_params = dict(parse_qsl(parts[4]))
    query_params['helpfulid'] = id
    parts[4] = urlencode(query_params)

    # Construct the new URL
    url_with_query = urlunparse(parts)

    if 'helpful-once' in session:
        if session['helpful-once'] == id:
            return redirect(url_with_query)

    session['helpful-once'] = id
    cursor.execute("UPDATE reviews SET helpful = helpful + 1 WHERE id = %s;", (id))
    db.commit()
    return redirect(url_with_query)