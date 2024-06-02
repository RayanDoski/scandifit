# from flask import Blueprint, render_template
from flask import Blueprint, render_template, request, redirect
from flask_mail import Message
from db import mail

# To Get The Cart Values 
from cart import show_products_in_cart

views = Blueprint('views', __name__)

@views.route("/")
def home():
    return render_template('index.html', cart_info=show_products_in_cart())

@views.route("/send_message", methods=['GET', 'POST'])
def send_message():
    '''
    Takes Information From Contact Form and sends It as a mail to us and to them.
    '''
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
    return render_template('jobb.html', cart_info=show_products_in_cart())

@views.route("/blog")
def blog():
    return render_template('blog.html', cart_info=show_products_in_cart())

@views.route("/blog/bygg_muskelmassa_snabbt_med_våra_magiska_tips")
def blog_post():
    return render_template('blog_post.html', cart_info=show_products_in_cart())

@views.route("/blog/upptäck_hemligheterna_bakom_effektiv_hemmaträning")
def blog_post_two():
    return render_template('blog_post_two.html', cart_info=show_products_in_cart())

@views.route("/blog/effektiv_viktnedgång_din_väg_till_drömkroppen")
def blog_post_three():
    return render_template('blog_post_three.html', cart_info=show_products_in_cart())

@views.route("/blog/så_skapar_du_det_perfekta_träningsprogrammet")
def blog_post_four():
    return render_template('blog_post_four.html', cart_info=show_products_in_cart())

@views.route("/blog/gå_ner_i_vikt_och_bygg_muskler_med_dessa_magiska_strategier")
def blog_post_five():
    return render_template('blog_post_five.html', cart_info=show_products_in_cart())

@views.route("/returpolicy")
def returpolicy():
    return render_template('retur_policy.html', cart_info=show_products_in_cart())

@views.route("/terms_of_use")
def terms_of_use():
    return render_template('terms_of_use.html', cart_info=show_products_in_cart())