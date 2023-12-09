from flask import Blueprint, render_template, request, session, redirect
from db import cursor, db
from flask_mail import Mail, Message
from db import mail

#checking if user is logged in
from login_register import is_logged_in

quiz = Blueprint('quiz', __name__)

@quiz.route("/quiz", methods=['GET', 'POST'])
def quizing():
    if request.method == "POST":

        #getting all the values
        age = request.form.get('age').lower()
        goal = request.form.get('goal').lower()
        body_type = request.form.get('body-type').lower()
        problem_area = request.form.get('problem-area').lower()
        height = request.form.get('height').lower()
        vikt = request.form.get('vikt').lower()
        malvikt = request.form.get('malvikt').lower()
        gng_per_vecka = request.form.get('gng-per-vecka').lower()
        sjukdom = request.form.get('sjukdom').lower()
        home_or_gym = request.form.get('home-or-gym').lower()
        utrustning = request.form.get('utrustning').lower()
        name = request.form.get('name').lower()
        email = request.form.get('email').lower()
        password = request.form.get('pass').lower()
        #checkin if they entered phone nr
        if request.form.get('telefonnummer'):
            phone = request.form.get('telefonnummer')
        else:
            phone = "Information Saknas"

        #insert into users table
        cursor.execute('insert into users (namn, email, telephonenumber, password) values (%s, %s, %s, %s)', (name, email, phone, password))
        db.commit()

        # Retrieve the last inserted user_id
        cursor.execute('SELECT LAST_INSERT_ID()')
        user_id = cursor.fetchone()[0]

        #insert into quiz table
        cursor.execute('insert into quiz (user_id, age, goal, body_type, problem_area, height, vikt, malvikt, gng_per_vecka, sjukdom, home_or_gym, utrustning) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (user_id, age, goal, body_type, problem_area, height, vikt, malvikt, gng_per_vecka, sjukdom, home_or_gym, utrustning))
        db.commit()

        #login user
        cursor.execute('select * from users where password = %s and email = %s', (password, email))
        user = cursor.fetchone()

        if user:
            session['user_id'] = user[0]
            # for mail sending 
            msg = Message('Välkommen Till Scandifit', recipients=[email])
            msg.html = render_template('mail_welcome.html', namn=name)
            mail.send(msg)  # Use 'mail', not 'Mail'
            return redirect('/schedual')
        
    else:
        # Om De Är Inloggade Så Skickar Vi De Till Schemat Annars Så Får De Göra En Quiz
        if is_logged_in():
            return redirect('/schedual')
        else:
            return render_template('quiz.html')