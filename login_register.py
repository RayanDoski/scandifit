from flask import Blueprint, render_template, request, session, redirect
from db import cursor, db
from flask_mail import Mail, Message
from db import mail

login_register = Blueprint('login_register', __name__)

# Logga In 
@login_register.route('/login-processing', methods=['GET', 'POST'])
def login_processing():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        cursor.execute('select * from users where password = %s and email = %s', (password, email))
        user = cursor.fetchone()

        if user:
            session['user_id'] = user[0]
            session['namn'] = user[1]
            session['email'] = user[2]
            session['telefonnummer'] = user[3]
            session['password'] = user[4]
            session['gatuadres'] = user[5]
            session['postnummer'] = user[6]
            session['stad'] = user[7]

            return redirect('/profile-information')
        else:
            wrong_information = True
            return render_template('login-signup.html', wrong_information=wrong_information)
        
# Registrera 
@login_register.route('/register-processing', methods=['GET', 'POST'])
def registreringar():
    if request.method == 'POST':
        namn = request.form.get('namn')
        email = request.form.get('email')
        telefonnummer = request.form.get('telefonnummer')
        password = request.form.get('password')
        
        # Does the informaiton already exist?
        cursor.execute("SELECT * FROM users WHERE email=%s", (email))
        does_mail_exist = cursor.fetchall()

        if does_mail_exist:
            mail_exists = True
            return render_template('login-signup.html', mail_exists=mail_exists, email=email)
        else:
            cursor.execute('insert into users (namn, email, telephonenumber, password) values (%s, %s, %s, %s)', (namn, email, telefonnummer, password))
            db.commit()
            # for mail sending 
            msg = Message('Vi Har Tagit Emot Ditt Medelande', recipients=[email])
            msg.html = render_template('mail_welcome.html', namn=namn)
            mail.send(msg)  # Use 'mail', not 'Mail'
            return redirect('/login')
        
