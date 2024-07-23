from flask import Blueprint, request, session, jsonify

# Insert Into Database
from db import make_db_connection

trainingplan_quiz = Blueprint('trainingplan_quiz', __name__)

@trainingplan_quiz.route('/api/trainingplan/get/info', methods=['post', 'get'])
def get_sleepplan_info():
    try:

        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        # Are They Logged in
        if 'user_id' in session:
            # Do they already have a sleepplan
            cursor.execute('select * from trainingplan where uid = %s', (session['user_id'],))
            result = cursor.fetchone()

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
                    "trainingLocation": result[10],
                    "equipment": result[11]
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
    trainingLocation = data.get('trainingLocation')
    equipment = data.get('equipment')
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
    elif not trainingLocation:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Träningsplats', 'index': 8})
    elif not equipment:
        return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Utrustning', 'index': 9})
    
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


    #Make Database Connection
    db = make_db_connection()
    cursor = db.cursor()

    if name and email and password:

        cursor.execute('select * from user where email = %s', (email))
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

            # Inserting User Values Into User Table
            cursor.execute('insert into user (namn, email, password) values (%s, %s, %s)', (name, email, password))
            db.commit()

            # Getting the latest autogenerated Id
            uid = cursor.lastrowid

            # Logging Them In 
            session['user_id'] = uid

            # Did They enter a phone Number Or did they Leave It empty
            if phonenumber:
                cursor.execute('insert into phonenumber (uid, phonenumber) values (%s, %s)', (uid, phonenumber))
                db.commit()
        
            # Insert Values Into Trainingplan
            cursor.execute('insert into trainingplan (uid, age, goal, body_type, problem_area, height, vikt, malvikt, gng_per_vecka, sjukdom, home_or_gym, utrustning) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (uid, age, goal, bodyType, problemArea, height, currentWeight, targetWeight, trainingFrequency, healthCondition, trainingLocation, equipment))
            db.commit()

            return jsonify(
                {
                    'success': True,
                }
            )
        
    else:

        # They Already Have An account and we are getting their id
        uid = session['user_id']

        # We Need To Check If They Already have a Trainingplan
        cursor.execute('select * from trainingplan where uid = %s', (uid,))
        plan = cursor.fetchall()

        if plan:
            #insert New Values Into trainingplan table
            cursor.execute('UPDATE trainingplan SET age = %s, goal = %s, body_type = %s, problem_area = %s, height = %s, vikt = %s, malvikt = %s, gng_per_vecka = %s, sjukdom = %s, home_or_gym = %s, utrustning = %s WHERE uid = %s', (age, goal, bodyType, problemArea, height, currentWeight, targetWeight, trainingFrequency, healthCondition, trainingLocation, equipment, uid))
            db.commit()
        else:
            # Insert Values Into Trainingplan
            cursor.execute('insert into trainingplan (uid, age, goal, body_type, problem_area, height, vikt, malvikt, gng_per_vecka, sjukdom, home_or_gym, utrustning) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (uid, age, goal, bodyType, problemArea, height, currentWeight, targetWeight, trainingFrequency, healthCondition, trainingLocation, equipment))
            db.commit()
        
        return jsonify(
            {
                'success': True,
            }
        )