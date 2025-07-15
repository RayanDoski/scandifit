from flask import Blueprint, request, session, jsonify

# Insert Into Database
from db import make_db_connection

trainingplan_quiz = Blueprint('trainingplan_quiz', __name__)

@trainingplan_quiz.route('/api/trainingplan/get/info', methods=['post', 'get'])
def get_sleepplan_info():
    db = None
    cursor = None
    try:
        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        # Are They Logged in
        if 'user_id' in session:
            
            cursor.execute('select * from "trainingplan" where uid = %s', (session['user_id'],))
            result = cursor.fetchone()

            cursor.execute('select * from "dietarySupplementPreferences" where uid = %s', (session['user_id'],))
            SupplementPreferences = cursor.fetchone()
            if SupplementPreferences:
                SupplementPreferences = SupplementPreferences[1]
            else:
                SupplementPreferences = "none"
            
            if result:
                return jsonify({
                    'success': True,
                    "age": result[1],
                    "goal": result[2],
                    "bodyType": result[3],
                    "problemArea": result[4],
                    "height": result[5],
                    "currentWeight": result[6],
                    "targetWeight": result[7],
                    "trainingFrequency": result[8],
                    "healthCondition": result[9],
                    "equipment": result[11],
                    "supplement": SupplementPreferences
                })
            else:
                return jsonify({
                    'success': False,
                })
        else:
            return jsonify({
                'success': False,
            })
    except Exception as e:
        # Hantera eventuella fel innan `finally`
        print(f"Ett fel inträffade: {e}")
        return jsonify({
            'success': False,
            'message': str(e)
        })
    finally:
        # Closing Database Connection
        if cursor:
            cursor.close()
        if db:
            db.close()
    
@trainingplan_quiz.route("/api/trainingplan/quiz/completed", methods=['GET', 'POST'])
def tq_completed():
    '''
    When They Finish The Quiz We Handle The Informaiton In Here
    '''

    # Fetching info sent from frontend react
    data = request.get_json()

    # For The TrainingPlan
    age = data.get('age')
    goal = data.get('goal')
    bodyType = data.get('bodyType')
    problemArea = data.get('problemArea')
    height = data.get('height')
    currentWeight = data.get('currentWeight')
    targetWeight = data.get('targetWeight')
    trainingFrequency = data.get('trainingFrequency')
    healthCondition = data.get('healthCondition')
    equipment = data.get('equipment')
    supplement = data.get('supplement')
    # For Login 
    name = data.get('name')
    email = data.get('email')
    phonenumber = data.get('phonenumber')
    password = data.get('password')

    # Validate that all required fields are present
    if not age:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Ålder', 'index': 0})
    elif not goal:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Mål', 'index': 1})
    elif not bodyType:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Kroppstyp', 'index': 2})
    elif not problemArea:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Problemområde', 'index': 3})
    elif not height:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Längd', 'index': 4})
    elif not currentWeight:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Nuvarande Vikt', 'index': 5})
    elif not targetWeight:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Målvikt', 'index': 5})
    elif not trainingFrequency:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Träningsfrekvens', 'index': 6})
    elif not healthCondition:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Hälsotillstånd', 'index': 7})
    elif not equipment:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Utrustning', 'index': 8})
    elif not supplement:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Kosttillskott', 'index': 9})
    
    # if they are not logged in
    if 'user_id' not in session:
        if not name:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Namn', 'index': 10})
        elif not email:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Email', 'index': 10})
        elif not phonenumber:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Telefonnummer', 'index': 10})
        elif not password:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Lösenord', 'index': 10})
        

    # return jsonify({
    #     "age": age,
    #     "goal": goal,
    #     "bodyType": bodyType,
    #     "problemArea": problemArea,
    #     "height": height,
    #     "currentWeight": currentWeight,
    #     "targetWeight": targetWeight,
    #     "trainingFrequency": trainingFrequency,
    #     "healthCondition": healthCondition,
    #     "equipment": equipment,
    #     "supplement": supplement
    # })


    #Make Database Connection
    db = make_db_connection()
    cursor = db.cursor()

    if name and email and password:

        cursor.execute('select * from "user" where email = %s', (email))
        DoesEmailExist = cursor.fetchone()

        # Mail Check
        if DoesEmailExist:
            return jsonify(
                {
                    'success': False,
                    'message': f'Konot Med [{email}] Existerar Redan',
                    'index': 10
                }
            )
        else:

            try:
                # Inserting User Values Into User Table
                cursor.execute('INSERT INTO "user" (namn, email, "Password") VALUES (%s, %s, %s)', (name, email, password))
                db.commit()
                uid = cursor.lastrowid 

                # Logging Them In 
                session['user_id'] = uid

                # Insert their dietary Supplement Preferences
                cursor.execute('INSERT INTO "dietarySupplementPreferences" (uid, "SupplementPreferences") VALUES (%s, %s)', (uid, supplement))
                db.commit()

                # Insert Values Into Trainingplan
                cursor.execute('INSERT INTO "trainingplan" (uid, age, goal, body_type, problem_area, height, vikt, malvikt, gng_per_vecka, sjukdom, utrustning) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (uid, age, goal, bodyType, problemArea, height, currentWeight, targetWeight, trainingFrequency, healthCondition, equipment))
                db.commit()

                # Did They Enter a Phone Number Or Did They Leave It Empty
                if phonenumber:
                    cursor.execute('INSERT INTO "phonenumber" (uid, phonenumber) VALUES (%s, %s)', (uid, phonenumber))
                    db.commit()

                return jsonify({'success': True})
            except Exception as e:
                db.rollback()
                return jsonify({'success': False})
        
    else:

        # They Already Have An account and we are getting their id
        uid = session['user_id']

        # We Need To Check If They Already have a Trainingplan
        cursor.execute('select * from "trainingplan" where uid = %s', (uid,))
        plan = cursor.fetchall()

        if plan:
            #insert New Values Into trainingplan table
            cursor.execute('UPDATE "trainingplan" SET age = %s, goal = %s, body_type = %s, problem_area = %s, height = %s, vikt = %s, malvikt = %s, gng_per_vecka = %s, sjukdom = %s, utrustning = %s WHERE uid = %s', (age, goal, bodyType, problemArea, height, currentWeight, targetWeight, trainingFrequency, healthCondition, equipment, uid))
            db.commit()

            # Check if the user's dietary supplement preferences already exist
            cursor.execute('SELECT * FROM "dietarySupplementPreferences" WHERE uid = %s', (uid,))
            dietarySupplementPreferences = cursor.fetchone()

            if dietarySupplementPreferences:
                # If the record exists, update it
                cursor.execute('UPDATE "dietarySupplementPreferences" SET "SupplementPreferences" = %s WHERE uid = %s', (supplement, uid))
                db.commit()
            else:
                # If the record does not exist, insert a new one
                cursor.execute('INSERT INTO "dietarySupplementPreferences" (uid, "SupplementPreferences") VALUES (%s, %s)', (uid, supplement))
                db.commit()

        else:
            # Insert Values Into Trainingplan
            cursor.execute('insert into "trainingplan" (uid, age, goal, body_type, problem_area, height, vikt, malvikt, gng_per_vecka, sjukdom, utrustning) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (uid, age, goal, bodyType, problemArea, height, currentWeight, targetWeight, trainingFrequency, healthCondition, equipment))
            db.commit()
        
        return jsonify(
            {
                'success': True,
            }
        )