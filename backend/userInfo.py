from flask import Blueprint, render_template, request, session, redirect, jsonify

from db import make_db_connection

profil = Blueprint('profil', __name__)
        
@profil.route("/api/profile/information", methods=['GET', 'POST'])
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
            cursor.execute('select * from "user" where id = %s', (session['user_id'],))
            userInfo = cursor.fetchone()

            uid = userInfo[0]
            namn = userInfo[1]
            email = userInfo[2]
            password = userInfo[3]

            #kollar Om Deras Telefonnummr Existerar i Vår Databas
            cursor.execute('select * from "phonenumber" where uid = %s', (uid,))
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

@profil.route("/api/profile/information/update", methods=['GET', 'POST'])
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
        cursor.execute('UPDATE "user" SET namn = %s, email = %s, "Password" = %s WHERE id = %s', (namn, email, password, uid))
        db.commit()

        # Updating Info Inside user_telephonenumber
        cursor.execute('select * from "phonenumber" where uid = %s', (uid,))
        userPhonenumber = cursor.fetchone()

        # Does There Row Exist Or Do We Have To Create It
        if userPhonenumber:
            cursor.execute('UPDATE "phonenumber" SET phonenumber = %s WHERE uid = %s', (telefonnummer, uid))
            db.commit()
        else:
            cursor.execute('insert into "phonenumber" (uid, phonenumber) values (%s, %s)', (uid, telefonnummer))
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

@profil.route("/api/logout", methods=['GET', 'POST'])
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