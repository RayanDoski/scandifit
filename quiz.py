from flask import Blueprint, render_template, request, session, redirect
from db import cursor, db
from flask_mail import Mail, Message
from db import mail

quiz = Blueprint('quiz', __name__)

@quiz.route("/quiz", methods=['GET', 'POST'])
def quizing():
    if request.method == "POST":

        #getting all the values
        age = request.form.get('age')
        goal = request.form.get('goal')
        body_type = request.form.get('body-type')
        problem_area = request.form.get('problem-area')
        height = request.form.get('height')
        vikt = request.form.get('vikt')
        malvikt = request.form.get('malvikt')
        gng_per_vecka = request.form.get('gng-per-vecka')
        sjukdom = request.form.get('sjukdom')
        home_or_gym = request.form.get('home-or-gym')
        utrustning = request.form.get('utrustning')
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('pass')

        #insert into users table
        cursor.execute('insert into users (namn, email, password) values (%s, %s, %s)', (name, email, password))
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
            return redirect('/profile-information')
        
    else:
        return render_template('quiz.html')