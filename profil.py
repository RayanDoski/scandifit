from flask import Blueprint, render_template, request, session, redirect
from db import cursor, db

profil = Blueprint('profil', __name__)
        
@profil.route("/profile-information")
def profile_information():
    #to show add to card info
    product_info = None
    if 'product-id' in session:
        ids = session['product-id']
        cursor.execute('SELECT * FROM products WHERE id IN %s', (ids,))
        product_info = cursor.fetchall()

    if 'user_id' in session:
        namn = session['namn']
        email = session['email']
        telefonnummer = session['telefonnummer']
        password = session['password']

        if telefonnummer == None:
            telefonnummer = 'Information Saknas'

        return render_template('profile-information.html', namn=namn, email=email, telefonnummer=telefonnummer, password=password, product_info=product_info)
    else:
        return redirect('/login')


@profil.route("/profile-adress")
def profile_adress():
    #to show add to card info
    product_info = None
    if 'product-id' in session:
        ids = session['product-id']
        cursor.execute('SELECT * FROM products WHERE id IN %s', (ids,))
        product_info = cursor.fetchall()
    if 'user_id' in session:
        namn = session['namn']
        gatuadres = session['gatuadres']
        postnummer = session['postnummer']
        stad = session['stad']

        if gatuadres == None:
            gatuadres = 'Information Saknas'

        if postnummer == None:
            postnummer = 'Information Saknas'

        if stad == None:
            stad = 'Information Saknas'
        
        return render_template('profile-adress.html', gatuadres=gatuadres, postnummer=postnummer, stad=stad, namn=namn, product_info=product_info)
    else:
        return redirect('/login')
    
@profil.route("/logout")
def logout():
    session.pop('user_id')
    return redirect('/')

#updatera användat information
@profil.route("/update-profile-information", methods=['GET', 'POST'])
def update_profile_information():
    if 'user_id' in session:
        id = session['user_id']
        namn = request.form.get('namn')
        email = request.form.get('email')
        telefonnummer = request.form.get('telefonnummer')
        password = request.form.get('password')

        #update info 
        cursor.execute("UPDATE users SET namn = %s, email = %s, telephonenumber = %s, password = %s WHERE id = %s", (namn, email, telefonnummer, password, id))
        db.commit()
        return redirect('/logout')
    
@profil.route("/update-profile-adress", methods=['GET', 'POST'])
def update_profile_adress():
    if 'user_id' in session:
        id = session['user_id']
        gatuadres = request.form.get('gatuadres')
        postnummer = request.form.get('postnummer')
        stad = request.form.get('stad')

        #update info 
        cursor.execute("UPDATE users SET gatuadres = %s, postnummer = %s, stad = %s WHERE id = %s", (gatuadres, postnummer, stad, id))
        db.commit()
        return redirect('/logout')