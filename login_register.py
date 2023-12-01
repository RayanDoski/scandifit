from flask import Blueprint, render_template, request, session, redirect
from db import cursor, db
from flask_mail import Mail, Message
from db import mail

login_register = Blueprint('login_register', __name__)

# Logga In 
@login_register.route('/login-processing', methods=['GET', 'POST'])
def login_processing():
    if request.method == 'POST':
        email = request.form.get('email').lower()
        password = request.form.get('password').lower()
        cursor.execute('select * from users where password = %s and email = %s', (password, email))
        user = cursor.fetchone()

        if user:
            session['user_id'] = user[0]
            return redirect('/profile-information')
        else:
            wrong_information = True
            return render_template('login-signup.html', wrong_information=wrong_information)
        
# Registrera 
@login_register.route('/register-processing', methods=['GET', 'POST'])
def registreringar():
    if request.method == 'POST':
        namn = request.form.get('namn')
        email = request.form.get('email').lower()
        telefonnummer = request.form.get('telefonnummer')
        password = request.form.get('password').lower()

        mail_exists = does_mail_already_exist(email, namn, telefonnummer, password)
        if mail_exists == True:
            return render_template('login-signup.html', mail_exists=mail_exists, email=email)

        return redirect('/login')

#checking if user is logged in and passing values
def is_logged_in():
    if 'user_id' in session:
        cursor.execute('select * from users where id = %s', (session['user_id']))
        data = cursor.fetchone()
        return session['user_id'], data[1], data[2], data[3], data[4], data[5], data[6], data[7]
    else:
        return None
    
def does_mail_already_exist(email, namn, telefonnummer, password):
    # Does the informaiton already exist?
    cursor.execute("SELECT * FROM users WHERE email=%s", (email))
    does_mail_exist = cursor.fetchall()

    if does_mail_exist:
        mail_exists = True
        return mail_exists
    else:
        cursor.execute('insert into users (namn, email, telephonenumber, password) values (%s, %s, %s, %s)', (namn, email, telefonnummer, password))
        db.commit()
        
        # for mail sending 
        msg = Message('Vi Har Tagit Emot Ditt Medelande', recipients=[email])
        msg.html = render_template('mail_welcome.html', namn=namn)
        mail.send(msg)