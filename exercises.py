from flask import Blueprint, render_template, request, session, redirect
from db import cursor, db

exercises = Blueprint('exercises', __name__)

#workouts
@exercises.route("/workouts")
def workouts():
    #to show add to card info
    product_info = None
    if 'product-id' in session:
        ids = session['product-id']
        cursor.execute('SELECT * FROM products WHERE id IN %s', (ids,))
        product_info = cursor.fetchall()
    if 'user_id' in session:
        namn = session['namn']
        cursor.execute('select * from workouts')
        workouts = cursor.fetchall()

        #getting specific selected workout
        if request.method == 'post':
            selected_target = request.form.get('order-workouts')
            workouts = selectation(selected_target)
            
        return render_template('workouts.html', workouts=workouts, product_info=product_info, namn=namn)
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

#selecting the 
def selectation(selected_value):
    cursor.execute('select * from workouts where target_muscle = %s', (selected_value))
    specific_workouts = cursor.fetchall()
    return specific_workouts
