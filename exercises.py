from flask import Blueprint, render_template, request, session, redirect

# Getting Database variables In Order To Connect 
from db import make_db_connection

# Checking if user is logged in
from login_register import is_logged_in, is_exklusiv

exercises = Blueprint('exercises', __name__)

@exercises.route("/workouts/<muscle>", methods=['GET', 'POST'])
def workouts(muscle):
    '''
    This Function Shows Exercises in groups

    variables:
    - muscle (string): the name of the muscle you want to see exercises off
    '''

    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')
    
    # Getting Their Name
    namn = user_data[1]

    # Getting The Specific Exercises
    workouts = selectation(muscle)

    return render_template('workouts.html', workouts=workouts, muscle=muscle, namn=namn, exklusiv=is_exklusiv())
    
@exercises.route("/workout/<id>")
def workout(id):
    '''
    This Route Shows Specific Workouts and detailed text on how to execute them
    '''

    #Make Database Connection
    db = make_db_connection()
    cursor = db.cursor()

    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')
    
    namn = user_data[1]
    
    # Selecting the specific workout 
    cursor.execute('select * from workout where id = %s', (id,))
    workout = cursor.fetchone()

    # Close Database Connection
    db.close()
    cursor.close()
    
    return render_template('workout.html', workout=workout, namn=namn, exklusiv=is_exklusiv())

def selectation(muscle):
    '''
    This Function gets The Exercises
    '''
    #Make Database Connection
    db = make_db_connection()
    cursor = db.cursor()

    #om vi anropar funktion utan ett parameter värde
    if muscle == 'alla':
        cursor.execute('select * from workout')
        specific_workouts = cursor.fetchall()
    else:
        cursor.execute('select * from workout where target_muscle = %s', (muscle,))
        specific_workouts = cursor.fetchall()
    
    # Close Database Connection
    db.close()
    cursor.close()
    
    return specific_workouts

    