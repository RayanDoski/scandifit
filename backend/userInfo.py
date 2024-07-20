from flask import Blueprint, render_template, request, session, redirect, jsonify

from db import make_db_connection, add_phonenumber_to_user, add_adress_to_user

#checking if user is logged in
from login_register import is_logged_in, is_exklusiv

profil = Blueprint('profil', __name__)
        
@profil.route("/profile/information", methods=['GET', 'POST'])
def profile_information():
    '''
    This function allows users to see there information

    What Infomration?
    - Name
    - Email
    - Phonenumber
    - Password
    '''
    try:

        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        if 'user_id' in session:
            cursor.execute('select * from user where id = %s', (session['user_id']))
            userInfo = cursor.fetchone()

            uid = userInfo[0]
            namn = userInfo[1]
            email = userInfo[2]
            password = userInfo[3]

            #kollar Om Deras Telefonnummr Existerar i Vår Databas
            cursor.execute('select * from phonenumber where uid = %s', (uid,))
            # Vi Tar Emot En Rad Från Databasen Och Sedan Tar Vi Emot Den Tredje Columnen (Telefonnummret)
            telefonnummer = cursor.fetchone()
            if telefonnummer:
                telefonnummer = telefonnummer[1]
            else:
                telefonnummer = 'Information Saknas'

            return jsonify(
                {
                    'success': True,
                    'namn': namn,
                    'email': email,
                    'telefonnummer': int(telefonnummer),
                    'password': password
                }
            )
        else:
            return jsonify(
                {
                    'success': False
                }
            )
    except:
        return jsonify(
                {
                    'success': False
                }
            )
    finally:
        # Close Database Connection
        db.close()
        cursor.close()

@profil.route("/profile/information/update", methods=['GET', 'POST'])
def update_profile_information():
    '''
    Updating User Information,

    This Route takes infomraiton that user inserts and adds it to the database and then sends them back.
    '''
    try:

        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        # Fetching info sent from frontend react
        data = request.get_json()

        uid = session['user_id']
        namn = data.get('namn')
        email = data.get('email').lower()
        telefonnummer = data.get('telefonnummer')
        password = data.get('password').lower()

        # email Check
        if '@' not in email:
            return jsonify({'success': False, 'message': 'Ogiltigt e-postformat'})
        
        if not namn:
            return jsonify({'success': False, 'message': 'Namn Fattas'})

        if not password:
            return jsonify({'success': False, 'message': 'Lösenord Fattas'})
        
        # Updating Info Inside  users
        cursor.execute("UPDATE user SET namn = %s, email = %s, password = %s WHERE id = %s", (namn, email, password, uid))
        db.commit()

        # Updating Info Inside user_telephonenumber
        cursor.execute('select * from phonenumber where uid = %s', (uid,))
        userPhonenumber = cursor.fetchone()

        # Does There Row Exist Or Do We Have To Create It
        if userPhonenumber:
            cursor.execute("UPDATE phonenumber SET phonenumber = %s WHERE uid = %s", (telefonnummer, uid))
            db.commit()
        else:
            cursor.execute("insert into phonenumber (uid, phonenumber) values (%s, %s)", (uid, telefonnummer))
            db.commit()

        return jsonify(
            {
                'success': True
            }
        )
    
    except:
        return jsonify(
            {
                'success': False
            }
        )
    finally:
        # Close Database Connection
        db.close()
        cursor.close()

@profil.route("/logout", methods=['GET', 'POST'])
def logout():
    '''
    This function will logout uses by destroying session['user_id']
    '''
    if 'user_id' in session:
        session.pop('user_id')
        return jsonify(
            {
                'success': True
            }
        )
    else:
        # They are already logged out
        return jsonify(
            {
                'success': True
            }
        )

# The Code Beneth Is Not In Use

@profil.route("/profile/adress")
def profile_adress():
    '''
    This function allows users to see there information

    What Infomration?
    - Gatuadres
    - Postnummer
    - Stad
    '''
    try:

        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        #are they logged in?
        user_data = is_logged_in()
        if user_data is None:
            return redirect('/login')
        
        uid = user_data[0]
        namn = user_data[1]

        cursor.execute('select * from adress where uid = %s', (uid,))
        user_adress = cursor.fetchone()

        if user_adress:
            gatuadres = user_adress[1]
            postnummer = user_adress[2]
            stad = user_adress[3]
        else:
            gatuadres = 'Information Saknas'
            postnummer = 'Information Saknas'
            stad = 'Information Saknas'
        
        return render_template('profile_adress.html', gatuadres=gatuadres, postnummer=postnummer, stad=stad, namn=namn, exklusiv=is_exklusiv())
    except:
        return "Det Gick Snett!"
    finally:
        # Close Database Connection
        db.close()
        cursor.close()
    
@profil.route("/profile/adress/update", methods=['GET', 'POST'])
def update_profile_adress():
    '''
    This function takes information from form and inserts it into user_adress
    '''
    try:

        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        #are they logged in?
        user_data = is_logged_in()
        if user_data is None:
            return redirect('/login')
        
        uid = user_data[0]
        gatuadres = request.form.get('gatuadres').lower()
        postnummer = request.form.get('postnummer').lower()
        stad = request.form.get('stad').lower()

        # Are They Updating Adress Or Adding It?
        cursor.execute('select * from adress where uid = %s', (uid,))
        user_adress_info = cursor.fetchone()

        # Does User Already Have An Existing Adress In Database 
        if user_adress_info:
            # Updating An Existing Row In The Database
            cursor.execute("UPDATE adress SET gatuadress = %s, postnummer = %s, stad = %s WHERE uid = %s", (gatuadres, postnummer, stad, uid,))
            db.commit()
        else:
            # Creating a New Row With values 
            add_adress_to_user(uid, gatuadres, postnummer, stad)

        return redirect('/profile/adress')
    except Exception as e:
        print(e)
    finally:
        # Close Database Connection
        db.close()
        cursor.close()

@profil.route('/profile/plans')
def plans_and_pricing():
    '''
    This Function shows users Pricing plans
    '''
    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')
    
    # Getting Their Name
    namn = user_data[1]

    return render_template('profile_pricing.html', namn=namn)

    