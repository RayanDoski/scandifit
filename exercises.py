from flask import Blueprint, render_template, request, session, redirect
from db import cursor, db

exercises = Blueprint('exercises', __name__)

#workouts
@exercises.route("/workouts", methods=['GET', 'POST'])
def workouts():
    #to show add to card info
    product_info = None
    if 'product-id' in session:
        ids = session['product-id']
        cursor.execute('SELECT * FROM products WHERE id IN %s', (ids,))
        product_info = cursor.fetchall()

    if 'user_id' in session:
        namn = session['namn']
        #getting specific selected workout
        if request.method == 'POST':
            selected_target = request.form.get('order-workouts')
            values = which_muscle_group(selected_target)
            workouts = selectation(selected_target)

        elif request.args.get('muskelgrupp') != None:
            selected_target = request.args.get('muskelgrupp')
            values = which_muscle_group(selected_target)
            workouts = selectation(selected_target)
            
        else:
            workouts = selectation(None)
            values = which_muscle_group(None)
            
        return render_template('workouts.html', workouts=workouts, product_info=product_info, all=values[8], cardio=values[1], chest=values[2], triceps=values[3], biceps=values[4], back=values[5], shoulders=values[6], stomach=values[7], legs=values[0], namn=namn)
    else:
        return redirect('/login')

@exercises.route("/workout")
def workout():
    #to show add to card info
    product_info = None
    if 'product-id' in session:
        ids = session['product-id']
        cursor.execute('SELECT * FROM products WHERE id IN %s', (ids,))
        product_info = cursor.fetchall()
    #om användare är inloggad
    if 'user_id' in session:
        namn = session['namn']
        id = request.args.get('id')
        cursor.execute('select * from workouts where id = %s', (id))
        workout = cursor.fetchone()
        return render_template('workout.html', workout=workout, product_info=product_info, namn=namn)
    else:
        return redirect('/login')

#show exercises for specific muscle group
def selectation(selected_value):
    #om vi anropar funktion utan ett parameter värde
    if selected_value == None:
        cursor.execute('select * from workouts')
        specific_workouts = cursor.fetchall()
    else:
        cursor.execute('select * from workouts where target_muscle = %s', (selected_value))
        specific_workouts = cursor.fetchall()
    return specific_workouts

#which muscle group did they choose?
def which_muscle_group(selected_target):
    #declering variables
    all = ''
    cardio = ''
    chest = ''
    triceps = ''
    biceps = ''
    back = ''
    shoulders = ''
    stomach = ''
    legs = ''

    if selected_target == 'ben':
        legs = 'selected'
    elif selected_target == 'cardio':
        cardio = 'selected'
    elif selected_target == 'chest':
        chest = 'selected'
    elif selected_target == 'triceps':
        triceps = 'selected'
    elif selected_target == 'biceps':
        biceps = 'selected'
    elif selected_target == 'rygg':
        back = 'selected'
    elif selected_target == 'axlar':
        shoulders = 'selected'
    elif selected_target == 'mage':
        stomach = 'selected'
    else:
        all = 'selected'
        #giving the function no value in order to get all exercises
        selected_target = None
    return legs, cardio, chest, triceps, biceps, back, shoulders, stomach, all
    