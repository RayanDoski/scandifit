from flask import Blueprint, render_template, request, session, redirect
from db import cursor, db
#to get the cart values 
from cart import show_products_in_cart
#checking if user is logged in
from login_register import is_logged_in

exercises = Blueprint('exercises', __name__)

#workouts
@exercises.route("/workouts", methods=['GET', 'POST'])
def workouts():
    
    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')

    namn = user_data[1]
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
        
    return render_template('workouts.html', workouts=workouts, product_info=show_products_in_cart(), all=values[8], cardio=values[1], chest=values[2], triceps=values[3], biceps=values[4], back=values[5], shoulders=values[6], stomach=values[7], legs=values[0], namn=namn)
    

@exercises.route("/workout")
def workout():

    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')
    
    namn = user_data[1]
    id = request.args.get('id')
    cursor.execute('select * from workouts where id = %s', (id))
    workout = cursor.fetchone()
    return render_template('workout.html', workout=workout, product_info=show_products_in_cart(), namn=namn)
    

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
    