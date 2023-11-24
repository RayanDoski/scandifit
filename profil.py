from flask import Blueprint, render_template, request, session, redirect
from db import cursor, db

profil = Blueprint('profil', __name__)
        
@profil.route("/profile-information")
def profile_information():
    #to show add to card info
    product_info = None
    if 'product-id' in session:
        ids = session['product-id']
        cursor.execute('SELECT * FROM products WHERE id IN %s', (ids,))
        product_info = cursor.fetchall()

    if 'user_id' in session:
        namn = session['namn']
        email = session['email']
        telefonnummer = session['telefonnummer']
        password = session['password']

        if telefonnummer == None:
            telefonnummer = 'Information Saknas'

        return render_template('profile-information.html', namn=namn, email=email, telefonnummer=telefonnummer, password=password, product_info=product_info)
    else:
        return redirect('/login')


@profil.route("/profile-adress")
def profile_adress():
    #to show add to card info
    product_info = None
    if 'product-id' in session:
        ids = session['product-id']
        cursor.execute('SELECT * FROM products WHERE id IN %s', (ids,))
        product_info = cursor.fetchall()
    if 'user_id' in session:
        namn = session['namn']
        gatuadres = session['gatuadres']
        postnummer = session['postnummer']
        stad = session['stad']

        if gatuadres == None:
            gatuadres = 'Information Saknas'

        if postnummer == None:
            postnummer = 'Information Saknas'

        if stad == None:
            stad = 'Information Saknas'
        
        return render_template('profile-adress.html', gatuadres=gatuadres, postnummer=postnummer, stad=stad, namn=namn, product_info=product_info)
    else:
        return redirect('/login')
    
@profil.route("/logout")
def logout():
    session.pop('user_id')
    return redirect('/')

#updatera användat information
@profil.route("/update-profile-information", methods=['GET', 'POST'])
def update_profile_information():
    if 'user_id' in session:
        id = session['user_id']
        namn = request.form.get('namn')
        email = request.form.get('email')
        telefonnummer = request.form.get('telefonnummer')
        password = request.form.get('password')

        #update info 
        cursor.execute("UPDATE users SET namn = %s, email = %s, telephonenumber = %s, password = %s WHERE id = %s", (namn, email, telefonnummer, password, id))
        db.commit()
        return redirect('/logout')
    
@profil.route("/update-profile-adress", methods=['GET', 'POST'])
def update_profile_adress():
    if 'user_id' in session:
        id = session['user_id']
        gatuadres = request.form.get('gatuadres')
        postnummer = request.form.get('postnummer')
        stad = request.form.get('stad')

        #update info 
        cursor.execute("UPDATE users SET gatuadres = %s, postnummer = %s, stad = %s WHERE id = %s", (gatuadres, postnummer, stad, id))
        db.commit()
        return redirect('/logout')
    

#workouts
@profil.route("/workouts")
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

@profil.route("/workout")
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
    
    
#for training shcedual
@profil.route("/schedual", methods=["GET","POST"])
def schedual():
    
    #to show add to card info
    product_info = None
    if 'product-id' in session:
        ids = session['product-id']
        cursor.execute('SELECT * FROM products WHERE id IN %s', (ids,))
        product_info = cursor.fetchall()

    #om användare är inloggad
    if 'user_id' in session:
        namn = session['namn']
        user_id = session['user_id']
        
        #getting their quiz values
        cursor.execute('select * from quiz where user_id = %s', (user_id))
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
            added_exercise = create_exercise(chest_exercise[0][0], chest_exercise_list[0][1], sets, reps)
            added_exercise_two = create_exercise(chest_exercise[1][0], chest_exercise_list[1][1], sets, reps)
            added_exercise_three = create_exercise(chest_exercise[2][0], chest_exercise_list[2][1], sets, reps)
        elif more_of_what == 'arms':
            added_exercise = create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], sets, reps)
            added_exercise_two = create_exercise(chest_exercise[1][0], chest_exercise[1][1], sets, reps)
            added_exercise_three = create_exercise(biceps_exercise[2][0], biceps_exercise[2][1], sets, reps)
        elif more_of_what == 'stomach':
            added_exercise = create_exercise(mage_exercise[0][0], mage_exercise[0][1], sets, reps)
            added_exercise_two = create_exercise(mage_exercise[1][0], mage_exercise[1][1], sets, reps)
            added_exercise_three = ''
        else:
            # more_of_what == 'legs'
            added_exercise = create_exercise(legs_exercise[0][0], legs_exercise[0][1], sets, reps)
            added_exercise_two = create_exercise(legs_exercise[1][0], legs_exercise[1][1], sets, reps)
            added_exercise_three = ''

        #How Manny Training sessions per Week
        if training_sessions_per_week == 1:
            schedual = f'''
                <h2>Första TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 
                {create_exercise(chest_exercise[1][0], chest_exercise[1][1], sets, reps)}
                {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], sets, reps)}
                {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], sets, reps)}
                {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], sets, reps)}
                {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], sets, reps)}
                {create_exercise(mage_exercise[0][0], mage_exercise[0][1], sets, reps)}
                {create_exercise(legs_exercise[0][0], legs_exercise[0][1], sets, reps)}
                        '''
        elif training_sessions_per_week == 2:
            schedual = f'''
                <h2>Första TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}

                {create_exercise(chest_exercise[1][0], chest_exercise[1][1], sets, reps)}
                {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], sets, reps)}
                {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], sets, reps)}

                <h2>Andra TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}

                {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], sets, reps)}
                {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], sets, reps)}
                {create_exercise(mage_exercise[0][0], mage_exercise[0][1], sets, reps)}
                {create_exercise(legs_exercise[0][0], legs_exercise[0][1], sets, reps)}
                '''
        elif training_sessions_per_week == 3:
            schedual = f'''
                <h2>Första TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {create_exercise(chest_exercise[1][0], chest_exercise[1][1], sets, reps)}
                {added_exercise}
                {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], sets, reps)}

                <h2>Andra TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], sets, reps)}
                {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], sets, reps)}
                {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], sets, reps)}

                <h2>Tredje TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}

                {create_exercise(mage_exercise[0][0], mage_exercise[0][1], sets, reps)}
                {create_exercise(legs_exercise[0][0], legs_exercise[0][1], sets, reps)}
                {create_exercise(chest_exercise[1][0], chest_exercise[1][1], sets, reps)}
                '''
        elif training_sessions_per_week == 4:
            schedual = f'''
                <h2>Första TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}
                
                {create_exercise(chest_exercise[1][0], chest_exercise[1][1], sets, reps)}
                {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], sets, reps)}
                {create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], sets, reps)}

                <h2>Andra TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], sets, reps)}
                {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], sets, reps)}
                {create_exercise(axlar_exercise[0][0], axlar_exercise[0][1], sets, reps)}

                <h2>Tredje TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {create_exercise(mage_exercise[0][0], mage_exercise[0][1], sets, reps)}
                {create_exercise(legs_exercise[0][0], legs_exercise[0][1], sets, reps)}
                {create_exercise(legs_exercise[1][0], legs_exercise[1][1], sets, reps)}

                <h2>Fjärde TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}
                
                {added_exercise}
                {added_exercise_two}
                {added_exercise_three}
                '''                  
        elif training_sessions_per_week == 5:
            schedual = f'''
                <h2>Första TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}

                {create_exercise(chest_exercise[1][0], chest_exercise[1][1], sets, reps)}
                {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], sets, reps)}
                {create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], sets, reps)}

                <h2>Andra TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], sets, reps)}
                {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], sets, reps)}
                {create_exercise(axlar_exercise[0][0], axlar_exercise[0][1], sets, reps)}

                <h2>Tredje TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}

                {create_exercise(legs_exercise[0][0], legs_exercise[0][1], sets, reps)}
                {create_exercise(legs_exercise[1][0], legs_exercise[1][1], sets, reps)}

                <h2>Fjärde TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {create_exercise(mage_exercise[0][0], mage_exercise[0][1], sets, reps)}
                {create_exercise(mage_exercise[1][0], mage_exercise[1][1], sets, reps)}

                <h2>Femte TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}

                {added_exercise}
                {added_exercise_two}
                {added_exercise_three}
                '''
        elif training_sessions_per_week == 6:
            schedual = f'''
                <h2>Första TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {create_exercise(chest_exercise[0][0], chest_exercise[0][1], sets, reps)}
                {create_exercise(chest_exercise[1][0], chest_exercise[1][1], sets, reps)}
                {create_exercise(chest_exercise[2][0], chest_exercise[2][1], sets, reps)}

                <h2>Andra TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}

                {create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], sets, reps)}
                {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], sets, reps)}

                <h2>Tredje TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}

                {create_exercise(axlar_exercise[0][0], axlar_exercise[0][1], sets, reps)}
                {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], sets, reps)}
                
                <h2>Fjärde TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}

                {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], sets, reps)}
                {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], sets, reps)}

                <h2>Femte TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}

                {create_exercise(mage_exercise[0][0], mage_exercise[0][1], sets, reps)}
                {create_exercise(mage_exercise[1][0], mage_exercise[1][1], sets, reps)}

                <h2>Sjätte TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}

                {create_exercise(legs_exercise[0][0], legs_exercise[0][1], sets, reps)}
                {create_exercise(legs_exercise[1][0], legs_exercise[1][1], sets, reps)}
                '''
        else:
            schedual = f'''
                <h2>Chest - TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {create_exercise(chest_exercise[1][0], chest_exercise[1][1], sets, reps)}
                {create_exercise(chest_exercise[0][0], chest_exercise[0][1], sets, reps)}
                {create_exercise(chest_exercise[2][0], chest_exercise[2][1], sets, reps)}
                
                <h2>Triceps - TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], sets, reps)}
                {create_exercise(triceps_exercise[1][0], triceps_exercise[1][1], sets, reps)}                        

                <h2>Axlar - TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {create_exercise(axlar_exercise[0][0], axlar_exercise[0][1], sets, reps)}                        
                {create_exercise(axlar_exercise[1][0], axlar_exercise[1][1], sets, reps)}                        
                
                <h2>Rygg - TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {create_exercise(rygg_exercise[0][0], rygg_exercise[0][1], sets, reps)}                        
                {create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], sets, reps)}                        

                <h2>Mage - TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {create_exercise(mage_exercise[0][0], mage_exercise[0][1], sets, reps)}                        
                {create_exercise(mage_exercise[1][0], mage_exercise[1][1], sets, reps)}                        

                <h2>Ben - TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')}                        

                {create_exercise(legs_exercise[0][0], legs_exercise[0][1], sets, reps)}                        
                {create_exercise(legs_exercise[1][0], legs_exercise[1][1], sets, reps)}                        

                <h2>Extra - TräningsPass:</h2>
                {create_exercise(cardio_exercise[0][0], cardio_exercise[0][1], cardio, '')}                        
                {create_exercise(cardio_exercise[1][0], cardio_exercise[1][1], cardio, '')}                        
                {create_exercise(cardio_exercise[2][0], cardio_exercise[2][1], cardio, '')} 

                {added_exercise}                        
                {added_exercise_two}                        
                {added_exercise_three}
                '''
            
        return render_template('profile-schema.html', product_info=product_info, quiz_info=quiz_info, schedual=schedual, namn=namn)
    else:
        return redirect('/login')
    

#to get exercises from database
def get_exercise_from_database(exercise):
    cursor.execute('SELECT * FROM workouts WHERE id IN %s', (exercise,))
    exercise_data = cursor.fetchall()
    return exercise_data

#generating html code for exercise
def create_exercise(link, exercise, sets, reps):
    training_exercise = f'''
        <aside>
            <h3><a href="workout?id={ link }">{ exercise }</a>{ sets }{ reps }</h3>
            <a href="">Visa Alternativ Övningar</a>
        </aside>
    '''
    return training_exercise

def selectation(selected_value):
    cursor.execute('select * from workouts where target_muscle = %s', (selected_value))
    specific_workouts = cursor.fetchall()
    return specific_workouts