from flask import Blueprint, render_template, request, session, redirect, jsonify
from db import make_db_connection
import requests

#checking if user is logged in
from login_register import is_logged_in, is_exklusiv

dietplan = Blueprint('dietplan', __name__)

@dietplan.route("/profile/dietplan", methods=['GET', 'POST'])
def dietplan_def():
    try:

        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()
        
        cursor.execute('select * from dietplan where uid = %s', (session['user_id'],))
        user_dietplan = cursor.fetchone()
        
        if user_dietplan:
            calorie_intake = calorie_calculator(user_dietplan)
            water_intake = water_intake_calculator(user_dietplan)
            # recipes = get_recipe(6)
        else:
            calorie_intake = None
            water_intake = None
            recipes = None
        
        return jsonify({
            "CalorieIntake": calorie_intake,
            "WaterIntake": water_intake
        })
                  
    finally:
        # Closing Database Connection
        cursor.close()
        db.close()

def calorie_calculator(dietplan_row_values):
    '''
    Calculates Calories with the Mifflin St junior Equation and my own equation
    '''
    # calculating BMR (Basal Metabolic Rate) with Mifflin St junior Equation
    weight = int(dietplan_row_values[5])
    height = int(dietplan_row_values[4])
    age = int(dietplan_row_values[2])
    gender = dietplan_row_values[3]

    bmr = (10 * weight) + (6.25 * height) + (5 * age)

    if gender == 'man':
        bmr = bmr + 5
    else:
        bmr = bmr - 161

    activity_level = int(dietplan_row_values[7])

    if activity_level == 1:
        activity_baseline = 1.1
    elif activity_level == 2:
        activity_baseline = 1.2
    elif activity_level == 3:
        activity_baseline = 1.3
    else:
        activity_baseline = 1.4

    training_sessions_per_week = int(dietplan_row_values[8])

    activity_factor = activity_baseline + (0.07498571 * training_sessions_per_week)

    calorie_intake = bmr * activity_factor

    fitness_goal = dietplan_row_values[1]

    if fitness_goal == 'viktminskning':
        calorie_intake -= 500
    elif fitness_goal == 'maintenance':
        calorie_intake = calorie_intake
    else:
        calorie_intake += 500
    
    return round(calorie_intake)

def water_intake_calculator(dietplan_row_values):
    '''
    This function calculates the amount of water that a person should drink based on their informatin
    '''
    weight = int(dietplan_row_values[5])

    # Convert weight from kg to lbs
    weight = weight * 2.2

    two_thirds_of_weight = weight * 0.6666

    # Their Water Intake
    water_intake = two_thirds_of_weight * 0.0295735

    gender = dietplan_row_values[3]

    # Change Water Intake Values Based On Gender
    if gender == 'man':
        water_intake = water_intake
    else:
        water_intake = water_intake * ((100 - 27.03) / 100)

    non_training_days = water_intake
    training_days = water_intake + 0.35

    return round(non_training_days, 2), round(training_days, 2)
    
def get_recipe(num_recipes):
    url = "https://low-carb-recipes.p.rapidapi.com/random"

    headers = {
        "X-RapidAPI-Key": "706d2375c3msh223563b91efcfe9p15e916jsn65d5dcf62c32",
        "X-RapidAPI-Host": "low-carb-recipes.p.rapidapi.com"
    }

    recipes = []
    for i in range(num_recipes):
        response = requests.get(url, headers=headers)
        recipe = response.json()
        
        # Check if 'image' key exists in the recipe
        if 'image' in recipe:
            recipes.append({'image': recipe['image'], 'name': recipe['name'], 'id': recipe['id']})
        else:
            print("Image key not found in recipe:", recipe)

    return recipes

@dietplan.route('/dietplan/get/info', methods=['post', 'get'])
def dietplanGetInfo():
    try:

        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        # Are They Logged in
        if 'user_id' in session:
            # Do they already have a sleepplan
            cursor.execute('select * from dietplan where uid = %s', (session['user_id'],))
            result = cursor.fetchone()

            if result:
                return jsonify({
                    'success': True,
                    'id': result[0],
                    'goal': result[1],
                    'age': result[2],
                    'gender': result[3],
                    'height': result[4],
                    'weight': result[5],
                    'targetWeight': result[6],
                    'activityLevel': result[7],
                    "trainingSessionPerWeek": str(result[8]),
                    "dietaryPrefrences": result[9],
                    "currentDailyWaterIntake": result[10],
                    "sugarIntake": result[11]
                })
            else:
                return jsonify({
                    'success': False,
                })
        else:
            return jsonify({
                'success': False,
            })
    
    finally:
        # Closing Database Connection
        cursor.close()
        db.close()

@dietplan.route('/dietplan/quiz/completed', methods=['post', 'get'])
def quiz_dietplan_completed():
    try: 

        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        # Fetching info sent from frontend react
        data = request.get_json()

        goal = data.get('goal')
        gender = data.get('gender')
        age = data.get('age')
        height = data.get('height')
        currentweight = data.get('weight')
        targetweight = data.get('targetWeight')
        physically_demanding_everyday_life = data.get('activityLevel')
        training_sessions_per_week = data.get('trainingSessionPerWeek')
        current_daily_water_intake = data.get('currentDailyWaterIntake')
        dietary_preferences = data.get('dietaryPrefrences')
        sugar_intake = data.get('sugarIntake')

        # Validate that all required fields are present
        if not goal:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Mål', 'index': 0})
        elif not gender:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Kön', 'index': 1})
        elif not age:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Ålder', 'index': 2})
        elif not height:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Längd', 'index': 3})
        elif not currentweight:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Nuvarande Vikt', 'index': 4})
        elif not targetweight:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Mål Vikt', 'index': 4})
        elif not physically_demanding_everyday_life:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Fysiskt krävande vardagsliv', 'index': 5})
        elif not training_sessions_per_week:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Träningspass per vecka', 'index': 6})
        elif not current_daily_water_intake:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Ditt Dagliga Vattenintag', 'index': 7})
        elif not dietary_preferences:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: kostpreferenser', 'index': 8})
        elif not sugar_intake:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: sockerintag', 'index': 9})
        

        # Do they already have a sleepplan
        cursor.execute('select * from dietplan where uid = %s', (session['user_id'],))
        result = cursor.fetchone()

        if result:
            # Update Values
            cursor.execute('update dietplan set goal = %s, age = %s, gender = %s, height = %s, weight = %s, target_weight = %s, activity_level = %s, training_session_per_week = %s, dietary_preferences = %s, current_daily_water_intake = %s, sugar_intake = %s where uid = %s', (goal, age, gender, height, currentweight, targetweight, physically_demanding_everyday_life, training_sessions_per_week, dietary_preferences, current_daily_water_intake, sugar_intake, session['user_id']))
            db.commit()
        else:
            # insert new values
            cursor.execute('insert into dietplan (uid, goal, age, gender, height, weight, target_weight, activity_level, training_session_per_week, dietary_preferences, current_daily_water_intake, sugar_intake) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (session['user_id'], goal, age, gender, height, currentweight, targetweight, physically_demanding_everyday_life, training_sessions_per_week, dietary_preferences, current_daily_water_intake, sugar_intake))
            db.commit()

        return jsonify(
            {
                'success': True,
            }
        )
    
    except:
        return jsonify(
            {
                'success': True,
            }
        )
    finally:
        # Closing Database Connection
        cursor.close()
        db.close()

@dietplan.route('/profile/recipe/<id>')
def specific_recipe(id):

    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')
        
    namn = user_data[1]

    exklusiv = is_exklusiv()

    url = "https://low-carb-recipes.p.rapidapi.com/recipes/" + id

    headers = {
        "X-RapidAPI-Key": "706d2375c3msh223563b91efcfe9p15e916jsn65d5dcf62c32",
        "X-RapidAPI-Host": "low-carb-recipes.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)
    recipe = response.json()

    return render_template('recipe.html', recipe=recipe, namn=namn, exklusiv=exklusiv)