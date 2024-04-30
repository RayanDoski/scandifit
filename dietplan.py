from flask import Blueprint, render_template, request, session, redirect
from db import make_db_connection
import requests

#checking if user is logged in
from login_register import is_logged_in, is_exklusiv

dietplan = Blueprint('dietplan', __name__)

@dietplan.route("/profile/dietplan")
def dietplan_def():
    try:

        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        #are they logged in?
        user_data = is_logged_in()
        if user_data is None:
            return redirect('/login')
        
        uid = user_data[0]
        namn = user_data[1]
        
        exklusiv = is_exklusiv()

        cursor.execute('select * from dietplan where uid = %s', (uid,))
        user_dietplan = cursor.fetchone()
        
        # checking their elagability to view sertant information
        gtv = showing_dietplan(user_dietplan, exklusiv)

        if user_dietplan:
            calorie_intake = calorie_calculator(user_dietplan)
            water_intake = water_intake_calculator(user_dietplan)
            recipes = get_recipe(6)
        else:
            calorie_intake = None
            water_intake = None
            recipes = None

        return render_template(
            'profile_dietplan.html',
            namn=namn,
            exklusiv=exklusiv,
            calorie_intake=calorie_intake,
            water_intake=water_intake,
            user_dietplan=user_dietplan,
            btn_link=gtv[0],
            btn_text=gtv[1],
            heading=gtv[2],
            show_dietplan=gtv[3],
            recipes=recipes
        )
    finally:
        # Closing Database Connection
        cursor.close()
        db.close()

def showing_dietplan(user_dietplan, exklusiv):
    '''
    This Function Checks users elagability to view sertant information

    args:
    btn_link = the link on the button
    btn_text = The text on the button
    heading = what should be shown as a Heading
    show_dietplan = Should the DietPlan be displayed or not
    '''
    # If They Are Both Exklusiv And They Have a dietplan
    if exklusiv and user_dietplan:
        btn_link = ''
        btn_text = ''
        heading = ''
        show_dietplan = True
    # If They Are Exklusiv And They Don't Have a Dietplan
    elif exklusiv and user_dietplan is None:
        btn_link = '/quiz/dietplan'
        btn_text = 'Skapa din Kostplan'
        heading = ''
        show_dietplan = False
    # They Are Not Exklsuiv And They Do Not Have A Dietplan
    else:
        btn_link = '/profile/plans'
        btn_text = 'Bli En exklusiv Användare'
        heading = 'Denna tjänst är reserverad för våra exklusiva användare'
        show_dietplan = False
    
    return btn_link, btn_text, heading, show_dietplan

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

@dietplan.route('/quiz/dietplan', methods=['post', 'get'])
def quiz_dietplan():
    
    # Check if user is logged in
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')

    uid = user_data[0]

    # Default values
    dietplan_info = {
        'goal': None,
        'age': None,
        'gender': None,
        'height': None,
        'weight': None,
        'target_weight': None,
        'activity_level': None,
        'training_sessions_per_week': None,
        'dietary_preferences': None,
        'current_daily_water_intake': None,
        'sugar_intake': None
    }

    try:
        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        cursor.execute('SELECT * FROM dietplan WHERE uid = %s', (uid,))
        dietplan = cursor.fetchone()

        if dietplan:
            # Assign diet plan values
            dietplan_info = {
                'goal': dietplan[1],
                'age': dietplan[2],
                'gender': dietplan[3],
                'height': dietplan[4],
                'weight': dietplan[5],
                'target_weight': dietplan[6],
                'activity_level': dietplan[7],
                'training_sessions_per_week': dietplan[8],
                'dietary_preferences': dietplan[9],
                'current_daily_water_intake': dietplan[10],
                'sugar_intake': dietplan[11]
            }
        else:
            # Check if there's sleep plan info
            cursor.execute('SELECT * FROM sleepplan WHERE uid = %s', (uid,))
            extract_sleepplan_info = cursor.fetchone()

            if extract_sleepplan_info:
                dietplan_info['age'] = extract_sleepplan_info[1]
                dietplan_info['weight'] = extract_sleepplan_info[2]

    finally:
        # Closing Database Connection
        cursor.close()
        db.close()

    return render_template('dietplan_quiz.html', dietplan_info=dietplan_info)

@dietplan.route('/quiz/dietplan/completed', methods=['post', 'get'])
def quiz_dietplan_completed():
    try: 
        goal = request.form.get('goal')
        gender = request.form.get('gender')
        age = request.form.get('age')
        height = request.form.get('height')
        currentweight = request.form.get('currentweight')
        targetweight = request.form.get('targetweight')
        physically_demanding_everyday_life = request.form.get('physically_demanding_everyday_life')
        training_sessions_per_week = request.form.get('training_sessions_per_week')
        current_daily_water_intake = request.form.get('current_daily_water_intake')
        dietary_preferences = request.form.get('dietary_preferences')
        sugar_intake = request.form.get('sugar_intake')

        # Are they logged in?
        user_data = is_logged_in()
        if user_data is None:
            return redirect('/login')
        
        uid = user_data[0]
        
        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        # Do they already have a sleepplan
        cursor.execute('select * from dietplan where uid = %s', (uid,))
        result = cursor.fetchone()

        if result:
            # Update Values
            cursor.execute('update dietplan set goal = %s, age = %s, gender = %s, height = %s, weight = %s, target_weight = %s, activity_level = %s, training_session_per_week = %s, dietary_preferences = %s, current_daily_water_intake = %s, sugar_intake = %s where uid = %s', (goal, age, gender, height, currentweight, targetweight, physically_demanding_everyday_life, training_sessions_per_week, dietary_preferences, current_daily_water_intake, sugar_intake, uid))
            db.commit()
        else:
            # insert new values
            cursor.execute('insert into dietplan (uid, goal, age, gender, height, weight, target_weight, activity_level, training_session_per_week, dietary_preferences, current_daily_water_intake, sugar_intake) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (uid, goal, age, gender, height, currentweight, targetweight, physically_demanding_everyday_life, training_sessions_per_week, dietary_preferences, current_daily_water_intake, sugar_intake))
            db.commit()

        return redirect('/profile/dietplan')
    
    # except:
    #     return redirect('/quiz/dietplan')
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