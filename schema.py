from flask import Blueprint, render_template, request, session, redirect
from db import cursor, db
#to get the cart values 
from cart import show_products_in_cart
#checking if user is logged in
from login_register import is_logged_in

schema = Blueprint('schema', __name__)

#for training shcedual
@schema.route("/schedual", methods=["GET","POST"])
def schedual():
        
    #are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')
    
    namn = user_data[1]
    
    #getting their quiz values
    cursor.execute('select * from quiz where user_id = %s', (user_data[0]))
    quiz_info = cursor.fetchone()

    #antal gånger per vecka
    if quiz_info[9] == '1':
        training_sessions_per_week = 1
    elif quiz_info[9] == '2':
        training_sessions_per_week = 2
    elif quiz_info[9] == '3':
        training_sessions_per_week = 3
    elif quiz_info[9] == '4':
        training_sessions_per_week = 4
    elif quiz_info[9] == '5':
        training_sessions_per_week = 5
    elif quiz_info[9] == '6':
        training_sessions_per_week = 6
    elif quiz_info[9] == '7':
        training_sessions_per_week = 7

    #if they are trainign at home or at the gym
    if quiz_info[11] == 'hemma':
        #Checking what type of equiptment they have access to
        if quiz_info[12] == 'ingen utrustning':
            thier_situation = 'Home, no Equiptment'
        elif quiz_info[12] == 'grundläggande utrustning':
            thier_situation = 'Home, Little Equiptment'
        else:
            thier_situation = 'Home, All Equiptment'
    else:
        thier_situation = 'Gym, All Equiptment'

    #How long Should they be doing cardio, Based on their finess goal
    if quiz_info[3] == 'Förbättra din fysik':
        their_goal = 'better-fysik'
    elif quiz_info[3] == 'muskelmassa':
        their_goal = 'more-muscles'
    else:
        their_goal = 'cut-weight'
    
    #Problem Område (Vilken Kroppsdel Vill De Utvekcla Mer?)
    if quiz_info[5] == 'chest':
        more_of_what = 'chest'
    elif quiz_info[5] == 'arms':
        more_of_what = 'arms'
    elif quiz_info[5] == 'stomach':
        more_of_what = 'stomach'
    else:
        more_of_what = 'legs'

    #vilka övningar ska implementeras?
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
    elif thier_situation == 'grundläggande utrustning':
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
        cardio_exercise_list = [47, 46, 43, 42, 44, 45]
        chest_exercise_list = [8, 5, 3, 2, 4]
        triceps_exercise_list = [6, 9, 1, 10, 7, 11]
        axlar_exercise_list = [12, 13, 14, 15, 16, 17]
        rygg_exercise_list = [18, 19, 21, 22, 20]
        biceps_exercise_list = [23, 24, 25, 26, 27]
        mage_exercise_list = [30, 28, 31, 33, 29, 32]
        legs_exercise_list = [34, 35, 36, 37, 38, 39, 40, 41]

    #getting all Exercises
    cardio_exercise = get_exercise_from_database(cardio_exercise_list)
    chest_exercise = get_exercise_from_database(chest_exercise_list)
    triceps_exercise = get_exercise_from_database(triceps_exercise_list)
    axlar_exercise = get_exercise_from_database(axlar_exercise_list)
    rygg_exercise = get_exercise_from_database(rygg_exercise_list)
    biceps_exercise = get_exercise_from_database(biceps_exercise_list)
    mage_exercise = get_exercise_from_database(mage_exercise_list)
    legs_exercise = get_exercise_from_database(legs_exercise_list)

    #what are their training goal
    if their_goal == 'better-fysik':
            reps = ' - 12 Reps '
            sets = ' - 3 Sets '
            cardio = ' - 1 Min Kör / 1 Min Vila x 3 '
    elif their_goal == 'more-muscles':
            reps = ' - 8 Reps '
            sets = ' - 3 Sets '
            cardio = ' - 1 Min Kör / 1 Min Vila x 2 '
    else:
        #they want to cut weight
        reps = ' - 15 Reps '
        sets = ' - 3 Sets '
        cardio = ' - 1 Min Kör / 1 Min Vila x 4 '

    #what do they want to priotitise
    if more_of_what == 'chest':
        added_exercise = create_exercise(chest_exercise[0][0], chest_exercise_list[0][1], chest_exercise_list[0][2], sets, reps)
        added_exercise_two = create_exercise(chest_exercise[1][0], chest_exercise_list[1][1], chest_exercise_list[1][2], sets, reps)
        added_exercise_three = create_exercise(chest_exercise[2][0], chest_exercise_list[2][1], chest_exercise_list[2][2], sets, reps)
    elif more_of_what == 'arms':
        added_exercise = create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], triceps_exercise[0][2], sets, reps)
        added_exercise_two = create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)
        added_exercise_three = create_exercise(biceps_exercise[2][0], biceps_exercise[2][1], biceps_exercise[2][2], sets, reps)
    elif more_of_what == 'stomach':
        added_exercise = create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)
        added_exercise_two = create_exercise(mage_exercise[1][0], mage_exercise[1][1], mage_exercise[1][2], sets, reps)
        added_exercise_three = ''
    else:
        # more_of_what == 'legs'
        added_exercise = create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)
        added_exercise_two = create_exercise(legs_exercise[1][0], legs_exercise[1][1], legs_exercise[1][2], sets, reps)
        added_exercise_three = ''

    #How Manny Training sessions per Week
    if training_sessions_per_week == 1:
        schedual = f'''
            <h2>Första TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}
            {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], axlar_exercise[1][2], sets, reps)}
            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}
            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}
                    '''
    elif training_sessions_per_week == 2:
        schedual = f'''
            <h2>Första TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')} 

            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}
            {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], axlar_exercise[1][2], sets, reps)}

            <h2>Andra TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}
            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}
            '''
    elif training_sessions_per_week == 3:
        schedual = f'''
            <h2>Första TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}  

            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {added_exercise}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}

            <h2>Andra TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}  

            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}
            {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], axlar_exercise[1][2], sets, reps)}

            <h2>Tredje TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}
            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            '''
    elif training_sessions_per_week == 4:
        schedual = f'''
            <h2>Första TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}
            
            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}
            {create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], sets, reps)}

            <h2>Andra TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')} 

            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}
            {create_exercise(axlar_exercise[0][0], axlar_exercise[0][1], sets, reps)}

            <h2>Tredje TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')} 

            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[1][0], legs_exercise[1][1], sets, reps)}

            <h2>Fjärde TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}
            
            {added_exercise}
            {added_exercise_two}
            {added_exercise_three}
            '''                  
    elif training_sessions_per_week == 5:
        schedual = f'''
            <h2>Första TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}
            {create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], sets, reps)}

            <h2>Andra TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}
            {create_exercise(axlar_exercise[0][0], axlar_exercise[0][1], sets, reps)}

            <h2>Tredje TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[1][0], legs_exercise[1][1], sets, reps)}

            <h2>Fjärde TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')} 

            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}
            {create_exercise(mage_exercise[1][0], mage_exercise[1][1], sets, reps)}

            <h2>Femte TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {added_exercise}
            {added_exercise_two}
            {added_exercise_three}
            '''
    elif training_sessions_per_week == 6:
        schedual = f'''
            <h2>Första TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(chest_exercise[0][0], chest_exercise[0][1], chest_exercise[0][2], sets, reps)}
            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {create_exercise(chest_exercise[2][0], chest_exercise[2][1], chest_exercise[2][2], sets, reps)}

            <h2>Andra TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], triceps_exercise[0][2], sets, reps)}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}

            <h2>Tredje TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(axlar_exercise[0][0], axlar_exercise[0][1], axlar_exercise[0][2], sets, reps)}
            {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], axlar_exercise[1][2], sets, reps)}
            
            <h2>Fjärde TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}

            <h2>Femte TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}
            {create_exercise(mage_exercise[1][0], mage_exercise[1][1], mage_exercise[1][2], sets, reps)}

            <h2>Sjätte TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}
            {create_exercise(legs_exercise[1][0], legs_exercise[1][1], legs_exercise[1][2], sets, reps)}
            '''
    else:
        schedual = f'''
            <h2>Chest - TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)}
            {create_exercise(chest_exercise[0][0], chest_exercise[0][1], chest_exercise[0][2], sets, reps)}
            {create_exercise(chest_exercise[2][0], chest_exercise[2][1], chest_exercise[2][2], sets, reps)}
            
            <h2>Triceps - TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')} 

            {create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], triceps_exercise[0][2], sets, reps)}
            {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], triceps_exercise[1][2], sets, reps)}                        

            <h2>Axlar - TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(axlar_exercise[0][0], axlar_exercise[0][1], axlar_exercise[0][2], sets, reps)}                        
            {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], axlar_exercise[1][2], sets, reps)}                        
            
            <h2>Rygg - TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], rygg_exercise[0][2], sets, reps)}                        
            {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)}                        

            <h2>Mage - TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}

            {create_exercise(mage_exercise[0][0], mage_exercise[0][1], mage_exercise[0][2], sets, reps)}                        
            {create_exercise(mage_exercise[1][0], mage_exercise[1][1], mage_exercise[1][2], sets, reps)}                        

            <h2>Ben - TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')}                       

            {create_exercise(legs_exercise[0][0], legs_exercise[0][1], legs_exercise[0][2], sets, reps)}                        
            {create_exercise(legs_exercise[1][0], legs_exercise[1][1], legs_exercise[1][2], sets, reps)}                        

            <h2>Extra - TräningsPass:</h2>
            {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], cardio, '')}                        
            {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], cardio, '')}                        
            {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], cardio, '')} 

            {added_exercise}                        
            {added_exercise_two}                        
            {added_exercise_three}
            '''
        
    return render_template('profile-schema.html', product_info=show_products_in_cart(), quiz_info=quiz_info, schedual=schedual, namn=namn)
    
    

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