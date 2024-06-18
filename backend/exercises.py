from flask import Blueprint, render_template, request, session, redirect, jsonify

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
    
    # Getting The Specific Exercises
    workouts = selectation(muscle)
    return jsonify(
        {
            "workouts": workouts,
        }
    )

@exercises.route("/workout/<id>", methods=['GET', 'POST'])
def workout(id):
    '''
    This Route Shows Specific Workouts and detailed text on how to execute them
    '''
    try:
        #Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        # Selecting the specific workout 
        cursor.execute('select * from workout where id = %s', (id,))
        workout = cursor.fetchone()

        return jsonify(
            {
                "workout": workout,
            }
        )

    finally:
        # Close Database Connection
        db.close()
        cursor.close()
    

def selectation(muscle):
    '''
    This Function gets The Exercises
    '''
    try:

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

        return specific_workouts
    
    finally:
        # Close Database Connection
        db.close()
        cursor.close()
    