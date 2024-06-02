from flask import Blueprint, render_template, request, session, redirect

from db import make_db_connection, insert_into_user, add_phonenumber_to_user

from flask_mail import Mail, Message
from db import mail

login_register = Blueprint('login_register', __name__)

@login_register.route("/signup")
def signup():
    '''
    We show Them The signup page if they aren't already logged in
    '''

    # If They Are Logged In They can't access logged in or signup
    if is_logged_in():
        return redirect('/profile/trainingplan')
    else:
        return render_template('login_signup.html')

@login_register.route("/login")
def login():
    '''
    We show Them The login page if they aren't already logged in
    '''

    # If They Are Logged In They can't access logged in or signup
    if is_logged_in():
        return redirect('/profile/trainingplan')
    else:
        return render_template('login_signup.html')

@login_register.route('/login_processing', methods=['GET', 'POST'])
def login_processing():
    '''
    This Function Checks If the password and email are correkt or not
    '''
    try:
        if request.method == 'POST':
            
            # Retriving values
            email = request.form.get('email').lower()
            password = request.form.get('password').lower()

            # Make Database Connection
            db = make_db_connection()
            cursor = db.cursor()

            # Checking If the password and email matches a row in out user table
            cursor.execute('select * from user where password = %s and email = %s', (password, email))
            user = cursor.fetchone()

            if user:
                session['user_id'] = user[0]
                return redirect('/profile/trainingplan')
            else:
                wrong_information = True
                return render_template('login_signup.html', wrong_information=wrong_information)
    except:
        # Fel Med inloggning
        print("Fel vid bearbetning av inloggningsinformation")
    finally:
        # Close Database Connection
        db.close()
        cursor.close()
         
@login_register.route('/signup_processing', methods=['GET', 'POST'])
def signup_processing():
    '''
    This Function tales values and sends them to does_mail_already_exist() and either return mail_exists or takes them to login
    '''
    if request.method == 'POST':
        
        # Retriving values
        namn = request.form.get('namn').lower()
        email = request.form.get('email').lower()
        password = request.form.get('password').lower()
        telefonnummer = request.form.get('telefonnummer')

        mail_exists = does_mail_already_exist(email, namn, telefonnummer, password)

        # If The Mail They Entered Already Existed In Out user table
        if mail_exists == True:
            return render_template('login_signup.html', mail_exists=mail_exists, email=email)

        return redirect('/login')

def is_logged_in():
    '''
    Function that checks whether or not the user is logged in by checking if the 'user_id' exists in the session object.

    Return:
    - id
    - name
    - email
    - password
    '''
    try:

        #Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        if 'user_id' in session:
            cursor.execute('select * from user where id = %s', (session['user_id'],))
            data = cursor.fetchone()
            return session['user_id'], data[1], data[2], data[3]
        else:
            return None
    except:
        print('Fel Med Att Ta Emot Information Från Användare')
    finally:
        # Close Database Connection
        db.close()
        cursor.close()

def is_exklusiv():
    '''
    Function to check if the current user has exklusiv status or not. Returns a boolean value.
    '''
    try:

        #Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        #are they logged in?
        user_data = is_logged_in()
        id = user_data[0]

        # Looking To See If They have exklusiv membership
        cursor.execute('select * from exklusiv where uid = %s', (id,))
        exklusiv = cursor.fetchone()
        return exklusiv

    finally:
        # Close Database Connection
        db.close()
        cursor.close()
    
def does_mail_already_exist(email, namn, telefonnummer, password):
    '''
    What Does This Function Do?
     - Makes sure the mail doesn't alreayd exist 
     - Adds Values To User table If they doesn't already exist
     - adds values to phonenumber table if they entered a phonenumber
     - Send them a Welcome Email
    '''
    try:

        #Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        # Does the informaiton already exist?
        cursor.execute("SELECT * FROM user WHERE email=%s", (email,))
        does_mail_exist = cursor.fetchall()

        if does_mail_exist:
            mail_exists = True
            return mail_exists
        else:
            
            # Getting the latest autogenerated Id and Inset values 
            uid = insert_into_user(namn, email, password)

            # Did They enter a phone Number Or did they Leave It empty
            if telefonnummer:
                add_phonenumber_to_user(uid, telefonnummer)
            
            # for mail sending 
            msg = Message('Vi Har Tagit Emot Ditt Medelande', recipients=[email])
            msg.html = render_template('mail_welcome.html', namn=namn)
            mail.send(msg)
    except:
        print("Fel med att kontrollera om information finns.")
    finally:
        # Close Database Connection
        db.close()
        cursor.close()