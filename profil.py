from flask import Blueprint, render_template, request, session, redirect
from db import make_db_connection
db = make_db_connection()
cursor = db.cursor()
#to get the cart values 
from cart import show_products_in_cart
#checking if user is logged in
from login_register import is_logged_in

profil = Blueprint('profil', __name__)
        
@profil.route("/profile-information")
def profile_information():
    
    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')
    
    namn = user_data[1]
    email = user_data[2]
    telefonnummer = user_data[3]
    password = user_data[4]

    if telefonnummer == None:
        telefonnummer = 'Information Saknas'

    return render_template('profile-information.html', namn=namn, email=email, telefonnummer=telefonnummer, password=password, product_info=show_products_in_cart())
    


@profil.route("/profile-adress")
def profile_adress():
    
    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')

    namn = user_data[1]
    gatuadres = user_data[5]
    postnummer = user_data[6]
    stad = user_data[7]

    if gatuadres == None:
        gatuadres = 'Information Saknas'

    if postnummer == None:
        postnummer = 'Information Saknas'

    if stad == None:
        stad = 'Information Saknas'
    
    return render_template('profile-adress.html', gatuadres=gatuadres, postnummer=postnummer, stad=stad, namn=namn, product_info=show_products_in_cart())
    
@profil.route("/logout")
def logout():
    session.pop('user_id')
    return redirect('/')

#updatera användat information
@profil.route("/update-profile-information", methods=['GET', 'POST'])
def update_profile_information():

    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')

    id = user_data[0]
    namn = request.form.get('namn')
    email = request.form.get('email')
    telefonnummer = request.form.get('telefonnummer')
    password = request.form.get('password')

    #update info 
    cursor.execute("UPDATE users SET namn = %s, email = %s, telephonenumber = %s, password = %s WHERE id = %s", (namn, email, telefonnummer, password, id))
    db.commit()
    return redirect('/profile-information')
    
@profil.route("/update-profile-adress", methods=['GET', 'POST'])
def update_profile_adress():
    
    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')
    
    id = user_data[0]
    gatuadres = request.form.get('gatuadres')
    postnummer = request.form.get('postnummer')
    stad = request.form.get('stad')

    #update info 
    cursor.execute("UPDATE users SET gatuadres = %s, postnummer = %s, stad = %s WHERE id = %s", (gatuadres, postnummer, stad, id))
    db.commit()
    return redirect('/profile-adress')