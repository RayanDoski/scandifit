from flask import Blueprint, render_template, request, session, redirect

# Insert Into Database
from db import make_db_connection, insert_into_user, add_phonenumber_to_user, add_adress_to_user, make_user_exklusiv, insert_info_trainingplan

from flask_mail import Mail, Message
from db import mail

#checking if user is logged in
from login_register import is_logged_in

trainingplan_quiz = Blueprint('quiz', __name__)

@trainingplan_quiz.route("/trainingplan/quiz", methods=['GET', 'POST'])
def tq():
    '''
    Showing Out Training Quiz And Adapting It Based On If They Are Logged In Or Not
    '''
    #are they logged in? We Want To know if they are logged in or not in the schedual
    user_data = is_logged_in()
    
    return render_template('trainingplan_quiz.html', user_data=user_data)
    
@trainingplan_quiz.route("/trainingplan/quiz/completed", methods=['GET', 'POST'])
def tq_completed():
    '''
    When They Finish The Quiz We Handle The Informaiton In Here
    '''

    # Getting All Values
    age = request.form.get("age")
    goal = request.form.get("goal")
    body_type = request.form.get("body-type")
    problem_area = request.form.get("problem-area")
    height = request.form.get("height")
    vikt = request.form.get("vikt")
    malvikt = request.form.get("malvikt")
    gng_per_vecka = request.form.get("gng-per-vecka")
    sjukdom = request.form.get('sjukdom')
    home_or_gym = request.form.get('home-or-gym')
    utrustning = request.form.get("utrustning")
    name = request.form.get("name")
    email = request.form.get("email")
    password = request.form.get("pass")
    phonenumber = request.form.get("telefonnummer")

    #Make Database Connection
    db = make_db_connection()
    cursor = db.cursor()

    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:

        # Making All The Values Lower Case
        name = name.lower()
        email = email.lower()
        password = password.lower()

        # Insert Into Users And Table Retrieve the last inserted user_id
        uid = insert_into_user(name, email, password)

        # If They Added A Phonenumber 
        if phonenumber is not None:
            add_phonenumber_to_user(uid, phonenumber)
        
        # Insert Values Into Trainingplan
        insert_info_trainingplan(uid, age, goal, body_type, problem_area, height, vikt, malvikt, gng_per_vecka, sjukdom, home_or_gym, utrustning)

        #login user
        cursor.execute('select * from user where password = %s and email = %s', (password, email,))
        user = cursor.fetchone()

        if user:
            session['user_id'] = user[0]
            # for mail sending 
            msg = Message('Välkommen Till Scandifit', recipients=[email])
            msg.html = render_template('mail_welcome.html', namn=name)
            mail.send(msg)  # Use 'mail', not 'Mail'

            return redirect('/profile/trainingplan')
        
    else:
        # They Already Have An account and we are getting their id
        uid = user_data[0]

        # We Need To Check If They Already have a Trainingplan
        cursor.execute('select * from trainingplan where uid = %s', (uid,))
        plan = cursor.fetchall()
        if plan:
            #insert New Values Into trainingplan table
            cursor.execute('UPDATE trainingplan SET age = %s, goal = %s, body_type = %s, problem_area = %s, height = %s, vikt = %s, malvikt = %s, gng_per_vecka = %s, sjukdom = %s, home_or_gym = %s, utrustning = %s WHERE uid = %s', (age, goal, body_type, problem_area, height, vikt, malvikt, gng_per_vecka, sjukdom, home_or_gym, utrustning, uid))
            db.commit()
        else:
            # Insert Values Into Trainingplan
            insert_info_trainingplan(uid, age, goal, body_type, problem_area, height, vikt, malvikt, gng_per_vecka, sjukdom, home_or_gym, utrustning)
        return redirect('/profile/trainingplan')
    