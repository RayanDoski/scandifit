# from flask import Blueprint, render_template

from flask import Blueprint, render_template, request, session, redirect
from db import cursor, db
from flask_mail import Mail, Message
from db import mail
#to get the cart values 
from cart import show_products_in_cart

views = Blueprint('views', __name__)

@views.route("/")
def home():
    return render_template('index.html', product_info=show_products_in_cart())

@views.route("/send-message", methods=['GET', 'POST'])
def send_message():
    if request.method == 'POST':
        namn = request.form.get('namn')
        email = request.form.get('email')
        meddelande = request.form.get('meddelande')
        
        # for mail sending 
        msg = Message('Vi Har Tagit Emot Ditt Medelande', recipients=[email, 'kontakta@scandifit.se'])
        msg.html = render_template('mail_contact.html', namn=namn, meddelande=meddelande)
        mail.send(msg)  # Use 'mail', not 'Mail'
        return redirect(request.referrer)

@views.route("/jobb")
def jobb():
    return render_template('jobb.html', product_info=show_products_in_cart())

@views.route("/order-complete")
def order_complete():
    return render_template('order-complete.html', product_info=show_products_in_cart())

@views.route("/blog")
def blog():
    return render_template('blog.html', product_info=show_products_in_cart())

@views.route("/blog/bygg_muskelmassa_snabbt_med_våra_magiska_tips")
def blog_post():
    return render_template('blog-post.html', product_info=show_products_in_cart())

@views.route("/blog/upptäck_hemligheterna_bakom_effektiv_hemmaträning")
def blog_post_two():
    return render_template('blog-post-two.html', product_info=show_products_in_cart())

@views.route("/blog/effektiv_viktnedgång_din_väg_till_drömkroppen")
def blog_post_three():
    return render_template('blog-post-three.html', product_info=show_products_in_cart())

@views.route("/blog/så_skapar_du_det_perfekta_träningsprogrammet")
def blog_post_four():
    return render_template('blog-post-four.html', product_info=show_products_in_cart())

@views.route("/blog/gå_ner_i_vikt_och_bygg_muskler_med_dessa_magiska_strategier")
def blog_post_five():
    return render_template('blog-post-five.html', product_info=show_products_in_cart())

@views.route("/secretespolicy")
def secretespolicy():
    return render_template('secretespolicy.html', product_info=show_products_in_cart())

@views.route("/terms_of_use")
def terms_of_use():
    return render_template('terms-of-use.html', product_info=show_products_in_cart())