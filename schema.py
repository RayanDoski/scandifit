from flask import Blueprint, render_template, request, session, redirect
from db import cursor, db
#to get the cart values 
from cart import show_products_in_cart
#checking if user is logged in
from login_register import is_logged_in

schema = Blueprint('schema', __name__)
        
@schema.route("/schedual", methods=["GET","POST"])
def schedual():
    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')
    
    #getting their quiz values
    cursor.execute('select * from quiz where user_id = %s', (user_data[0]))
    quiz_info = cursor.fetchone()

    #checking if Their account is linked to a Schedual
    if quiz_info is None:
        schedual = ''
        return render_template('profile-schema.html', product_info=show_products_in_cart(), quiz_info=quiz_info, schedual=schedual, namn=user_data[1])


    # Antalet Tränings Pass Per Vecka
    amount_of_exercises_per_week = amount_per_week(quiz_info[9])

    # Users Situation (Gym Or Home | Equiptment Access)
    thier_situation = your_situation(quiz_info[11], quiz_info[12])

    # Vilka Övningar Ska Implementeras?
    exercise_list = added_exercises(thier_situation)

    # Writing Amount Of Sets And Reps Based On Thier Fitness Goals
    their_goal = fitness_goals(quiz_info[3])

    # For Better Readability
    sets = their_goal[1]
    reps = their_goal[0]

    #getting all Exercises
    cardio_exercise = get_exercise_from_database(exercise_list[0])
    chest_exercise = get_exercise_from_database(exercise_list[1])
    triceps_exercise = get_exercise_from_database(exercise_list[2])
    axlar_exercise = get_exercise_from_database(exercise_list[3])
    rygg_exercise = get_exercise_from_database(exercise_list[4])
    biceps_exercise = get_exercise_from_database(exercise_list[5])
    mage_exercise = get_exercise_from_database(exercise_list[6])
    legs_exercise = get_exercise_from_database(exercise_list[7])

    # Adding a List Of Cardio Exercises
    cardio_training_list = cardio_exercises(quiz_info[11], quiz_info[12], quiz_info[3], cardio_exercise)

    # Problem Område (Vilken Kroppsdel Vill De Utvekcla Mer?)
    more_of_these_exercises = problem_area(quiz_info[5], chest_exercise, triceps_exercise, biceps_exercise, mage_exercise, legs_exercise, sets, reps)

    #How Manny Training sessions per Week
    if amount_of_exercises_per_week == 1:
        schedual = f'''
            <h2>Första TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}                        

            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}
            {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], axlar_exercise[1][2], sets, reps)}
            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}
            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}
        '''
    elif amount_of_exercises_per_week == 2:
        schedual = f'''
            <h2>Första TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}
            {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], axlar_exercise[1][2], sets, reps)}

            <h2>Andra TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}
            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}
        '''
    elif amount_of_exercises_per_week == 3:
        schedual = f'''
            <h2>Första TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]} 

            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {more_of_these_exercises[0][0]}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}

            <h2>Andra TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}  

            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}
            {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], axlar_exercise[1][2], sets, reps)}

            <h2>Tredje TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}
            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
        '''
    elif amount_of_exercises_per_week == 4:
        schedual = f'''
            <h2>Första TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}
            
            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}
            {create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], triceps_exercise[0][2], sets, reps)}

            <h2>Andra TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}
            {create_exercise(axlar_exercise[0][0], axlar_exercise[0][1], axlar_exercise[0][2], sets, reps)}

            <h2>Tredje TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[1][0], legs_exercise[1][1], legs_exercise[1][2], sets, reps)}

            <h2>Fjärde TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}
            
            {more_of_these_exercises[0][0]}
            {more_of_these_exercises[1][0]}
            {more_of_these_exercises[2][0]}
        '''                  
    elif amount_of_exercises_per_week == 5:
        schedual = f'''
            <h2>Första TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}
            {create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], sets, reps)}

            <h2>Andra TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}
            {create_exercise(axlar_exercise[0][0], axlar_exercise[0][1], sets, reps)}

            <h2>Tredje TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[1][0], legs_exercise[1][1], sets, reps)}

            <h2>Fjärde TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]} 

            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}
            {create_exercise(mage_exercise[1][0], mage_exercise[1][1], sets, reps)}

            <h2>Femte TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {more_of_these_exercises[0][0]}
            {more_of_these_exercises[1][0]}
            {more_of_these_exercises[2][0]}
            '''
    elif amount_of_exercises_per_week == 6:
        schedual = f'''
            <h2>Första TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(chest_exercise[0][0], chest_exercise[0][1], chest_exercise[0][2], sets, reps)}
            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {create_exercise(chest_exercise[2][0], chest_exercise[2][1], chest_exercise[2][2], sets, reps)}

            <h2>Andra TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], triceps_exercise[0][2], sets, reps)}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}

            <h2>Tredje TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(axlar_exercise[0][0], axlar_exercise[0][1], axlar_exercise[0][2], sets, reps)}
            {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], axlar_exercise[1][2], sets, reps)}
            
            <h2>Fjärde TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}

            <h2>Femte TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}
            {create_exercise(mage_exercise[1][0], mage_exercise[1][1], mage_exercise[1][2], sets, reps)}

            <h2>Sjätte TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[1][0], legs_exercise[1][1], legs_exercise[1][2], sets, reps)}
        '''
    else:
        schedual = f'''
            <h2>Chest - TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {create_exercise(chest_exercise[0][0], chest_exercise[0][1], chest_exercise[0][2], sets, reps)}
            {create_exercise(chest_exercise[2][0], chest_exercise[2][1], chest_exercise[2][2], sets, reps)}

            <h2>Triceps - TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], triceps_exercise[0][2], sets, reps)}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}                        

            <h2>Axlar - TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(axlar_exercise[0][0], axlar_exercise[0][1], axlar_exercise[0][2], sets, reps)}                        
            {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], axlar_exercise[1][2], sets, reps)}                        
            
            <h2>Rygg - TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}                        
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}                        

            <h2>Mage - TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}                        
            {create_exercise(mage_exercise[1][0], mage_exercise[1][1], mage_exercise[1][2], sets, reps)}                        

            <h2>Ben - TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}                      

            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}                        
            {create_exercise(legs_exercise[1][0], legs_exercise[1][1], legs_exercise[1][2], sets, reps)}                        

            <h2>Extra - TräningsPass:</h2>
            {cardio_training_list[0][0]}                        
            {cardio_training_list[1][0]}                        
            {cardio_training_list[2][0]}

            {more_of_these_exercises[0][0]}
            {more_of_these_exercises[1][0]}
            {more_of_these_exercises[2][0]}

        '''
        
    return render_template('profile-schema.html', product_info=show_products_in_cart(), quiz_info=quiz_info, schedual=schedual, namn=user_data[1])

#to get exercises from database
def get_exercise_from_database(exercise):
    cursor.execute('SELECT * FROM workouts WHERE id IN %s', (exercise,))
    exercise_data = cursor.fetchall()
    return exercise_data

#generating html code for exercise
def create_exercise(link, exercise, muscle_group, sets, reps):
    training_exercise = f'''
        <aside>
            <h3><a href="workout?id={ link }">{ exercise }</a>{ sets }{ reps }</h3>
            <a href="/workouts?muskelgrupp={ muscle_group }">Visa Alternativ Övningar</a>
        </aside>
    '''
    return training_exercise

# Antalet Tränings Pass Per Vecka
def amount_per_week(amount_of_exercises_per_week):
    if amount_of_exercises_per_week == '1':
        training_sessions_per_week = 1
    elif amount_of_exercises_per_week == '2':
        training_sessions_per_week = 2
    elif amount_of_exercises_per_week == '3':
        training_sessions_per_week = 3
    elif amount_of_exercises_per_week == '4':
        training_sessions_per_week = 4
    elif amount_of_exercises_per_week == '5':
        training_sessions_per_week = 5
    elif amount_of_exercises_per_week == '6':
        training_sessions_per_week = 6
    elif amount_of_exercises_per_week == '7':
        training_sessions_per_week = 7

    return training_sessions_per_week

# Users Situation (Gym Or Home | Equiptment Access)
def your_situation(home_or_gym, equipment_assets):
    if home_or_gym == 'hemma':
        #Checking what type of equiptment they have access to
        if equipment_assets == 'ingen utrustning':
            thier_situation = 'Home, no Equiptment'
        elif equipment_assets == 'grundläggande utrustning':
            thier_situation = 'Home, Little Equiptment'
        else:
            thier_situation = 'Home, All Equiptment'
    else:
        thier_situation = 'Gym, All Equiptment'
    
    return thier_situation

# Vilka Övningar Ska Implementeras?
def added_exercises(thier_situation):
    if thier_situation == 'Home, no Equiptment':
        #exercises that fit them (DATABASE ID:S)
        cardio_exercise_list = [42, 44, 45]
        chest_exercise_list = [3, 2, 4]
        triceps_exercise_list = [7, 11]
        axlar_exercise_list = [16, 17]
        rygg_exercise_list = [20]
        biceps_exercise_list = [27]
        mage_exercise_list = [28, 32]
        legs_exercise_list = [40, 41]
    elif thier_situation == 'Home, Little Equiptment':
        #exercises that fit them (DATABASE ID:S)
        cardio_exercise_list = [43, 42, 44, 45]
        chest_exercise_list = [3, 2, 4]
        triceps_exercise_list = [1, 10, 7, 11]
        axlar_exercise_list = [12, 13, 14, 15, 16, 17]
        rygg_exercise_list = [18, 22, 20]
        biceps_exercise_list = [23, 24, 25, 26, 27]
        mage_exercise_list = [28, 29, 32]
        legs_exercise_list = [38, 39, 40, 41]
    else:
        #They have either choosen full equptment or gym
        cardio_exercise_list = [47]
        chest_exercise_list = [8, 5, 3]
        triceps_exercise_list = [6, 9, 1, 10, 7, 11]
        axlar_exercise_list = [12, 13, 14, 15, 16, 17]
        rygg_exercise_list = [18, 19, 21, 22, 20]
        biceps_exercise_list = [23, 24, 25, 26, 27]
        mage_exercise_list = [30, 28, 31, 33, 29, 32]
        legs_exercise_list = [34, 35, 36, 37, 38, 39, 40, 41]
    
    return cardio_exercise_list, chest_exercise_list, triceps_exercise_list, axlar_exercise_list, rygg_exercise_list, biceps_exercise_list, mage_exercise_list, legs_exercise_list

# Writing Amount Of Sets And Reps Based On Thier Fitness Goals
def fitness_goals(their_goal):
    if their_goal == 'Förbättra din fysik':
        reps = ' - 12 Reps '
        sets = ' - 3 Sets '
    elif their_goal == 'muskelmassa':
        reps = ' - 8 Reps '
        sets = ' - 3 Sets '
    else:
        #they want to cut weight
        reps = ' - 15 Reps '
        sets = ' - 3 Sets '

    return reps, sets

# Problem Område (Vilken Kroppsdel Vill De Utvekcla Mer?)
def problem_area(more_of_what, chest_exercise, triceps_exercise, biceps_exercise, mage_exercise, legs_exercise, sets, reps):
    if more_of_what == 'chest':
        added_exercise = [
            [create_exercise(chest_exercise[0][0], chest_exercise[0][1], chest_exercise[0][2], sets, reps)],
            [create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)],
            [create_exercise(chest_exercise[2][0], chest_exercise[2][1], chest_exercise[2][2], sets, reps)],
        ]
    elif more_of_what == 'arms':
        added_exercise = [
            [create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], triceps_exercise[0][2], sets, reps)],
            [create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)],
            [create_exercise(biceps_exercise[2][0], biceps_exercise[2][1], biceps_exercise[2][2], sets, reps)],
        ]
    elif more_of_what == 'stomach':
        added_exercise = [
            [create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)],
            [create_exercise(mage_exercise[1][0], mage_exercise[1][1], mage_exercise[1][2], sets, reps)],
            [''],
        ]
    else:
        # more_of_what == 'legs'
        added_exercise = [
            [create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)],
            [create_exercise(legs_exercise[1][0], legs_exercise[1][1], legs_exercise[1][2], sets, reps)],
            [''],
        ]
    
    return added_exercise

# Anpassar Cardio Till Användaren
def cardio_exercises(home_or_gym, equipment_assets, their_goal, cardio_exercise):
    # Users Situation (Gym Or Home | Equiptment Access)
    thier_situation = your_situation(home_or_gym, equipment_assets)
    if thier_situation == 'Home, All Equiptment' or thier_situation == 'Gym, All Equiptment':

        if their_goal == 'Förbättra din fysik':
            cardio = ' - 15 Min '
        elif their_goal == 'muskelmassa':
            cardio = ' - 10 Min '
        else:
            cardio = ' - 20 Min '
        
        cardio_training_list = [
            [create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')],
            [''],
            [''],
        ]

    else:

        if their_goal == 'Förbättra din fysik':
            cardio = ' - 1 Min Kör / 1 Min Vila x 3 '
        elif their_goal == 'muskelmassa':
            cardio = ' - 1 Min Kör / 1 Min Vila x 2 '
        else:
            cardio = ' - 1 Min Kör / 1 Min Vila x 4 '
        
        cardio_training_list = [
            [create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')],
            [create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')],
            [create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')],
        ]
    
    
    return cardio_training_list
    