from flask import Blueprint, request, session, jsonify

# To Caluclate sleep
from datetime import datetime, timedelta

from db import make_db_connection

sleepplan = Blueprint('sleepplan', __name__)

@sleepplan.route("/api/profile/sleepplan", methods=['GET', 'POST'])
def sleepplan_def():
    '''
    This function returns the default page of the sleep plan section.
    '''
    try:

        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()
        
        cursor.execute('select * from sleepplan where uid = %s', (session['user_id'],))
        user_sleepplan = cursor.fetchone()

        if user_sleepplan:
            SleepPlanExist = True
            # Making Caffine Intake Calculations
            caffeine_in_mg = caffeine_intake_calculator(user_sleepplan)
            sleep_calculations = sleeptime_calculator(user_sleepplan)
        else:
            SleepPlanExist = False
            caffeine_in_mg = None
            sleep_calculations = None

        return jsonify({
            "SleepPlanExist": SleepPlanExist,
            "caffeine_in_mg": caffeine_in_mg,
            "sleep_calculations": sleep_calculations,
            "user_sleepplan": user_sleepplan
        })
    
    finally:
        # Closing Database Connection
        cursor.close()
        db.close()

def caffeine_intake_calculator(sleepplan_info):
    '''
    This function The Caffeine limitations for each user (Weight * 3)

    args:
    - weight(int) in Kg
    - caffeine_in_mg(int) = weight * 3

    returns:
    - caffeine_in_mg
    '''
    weight = sleepplan_info[2]
    caffeine_in_mg = weight * 3
    return caffeine_in_mg

def sleeptime_calculator(sleepplan_info):
    '''
    This Function Calculates amount of sleep needed based on sleep time, time to fall asleep and three sleep cyckles.
    '''
    wake_up_at = sleepplan_info[3]
    time_to_fall_asleep = sleepplan_info[4]

    # Convert wake_up_at to datetime object
    wake_up_time = datetime.strptime(wake_up_at, '%H:%M')

    # Calculate bedtimes
    bedtime_six_cycles = (wake_up_time - timedelta(minutes=time_to_fall_asleep) - timedelta(minutes=(90 * 6))).strftime('%H:%M')
    bedtime_five_cycles = (wake_up_time - timedelta(minutes=time_to_fall_asleep) - timedelta(minutes=(90 * 5))).strftime('%H:%M')
    bedtime_four_cycles = (wake_up_time - timedelta(minutes=time_to_fall_asleep) - timedelta(minutes=(90 * 4))).strftime('%H:%M')

    # Hours In Bed
    def hours_in_bed(cycle, wake_up_time):
        '''
        Returns the number of hours a person is in bed per day based on their infomraiton.
        '''
        hours_in_bed = str(wake_up_time - datetime.strptime(cycle, '%H:%M'))

        if ',' in hours_in_bed:
            hours_in_bed = hours_in_bed.split(",")[1]
        
        hours_in_bed = hours_in_bed.split(':')
        hours_in_bed = f"{hours_in_bed[0]}:{hours_in_bed[1]}"

        return hours_in_bed

    hours_in_bed_for_six_cycles = hours_in_bed(bedtime_six_cycles, wake_up_time)
    hours_in_bed_for_five_cycles = hours_in_bed(bedtime_five_cycles, wake_up_time)
    hours_in_bed_for_four_cycles = hours_in_bed(bedtime_four_cycles, wake_up_time)


    # Output the bedtime
    return bedtime_six_cycles, bedtime_five_cycles, bedtime_four_cycles, hours_in_bed_for_six_cycles, hours_in_bed_for_five_cycles, hours_in_bed_for_four_cycles, wake_up_at

@sleepplan.route('/api/sleepplan/get/info', methods=['post', 'get'])
def get_sleepplan_info():
    try:

        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        # Are They Logged in
        if 'user_id' in session:
            # Do they already have a sleepplan
            cursor.execute('select * from sleepplan where uid = %s', (session['user_id'],))
            result = cursor.fetchone()

            if result:
                return jsonify({
                    'success': True,
                    'id': result[0],
                    'age': result[1],
                    'weight': result[2],
                    'wakeUpTime': result[3],
                    'timeToSleep': str(result[4]),
                    'howMuchSleepDoYouGetOnAvg': result[5],
                    'dailyMoodAndEnergy': result[6],
                    'caffeineInTheAfternoon': result[7],
                    'sleepDisturbancesOrSymptoms': result[8]
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

@sleepplan.route("/api/sleepplan/quiz/completed", methods=['post', 'get'])
def sleepplan_quiz_completed():
    try:
        
        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        # Fetching info sent from frontend react
        data = request.get_json()

        wakeUpTime = data.get('wakeUpTime')
        age = data.get('age')
        weight = data.get('weight')
        timeToSleep = data.get('timeToSleep')
        dailyMoodAndEnergy = data.get('dailyMoodAndEnergy')
        caffeineInTheAfternoon = data.get('caffeineInTheAfternoon')
        howMuchSleepDoYouGetOnAvg = data.get('howMuchSleepDoYouGetOnAvg')
        sleepDisturbancesOrSymptoms = data.get('sleepDisturbancesOrSymptoms')

        # Validate that all required fields are present
        if not wakeUpTime:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Väckningstid', 'index': 0})
        elif not age:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Ålder', 'index': 1})
        elif not weight:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Vikt', 'index': 2})
        elif not timeToSleep:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Tid Att Somna', 'index': 3})
        elif not dailyMoodAndEnergy:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Dagligt Humör Och Energi', 'index': 4})
        elif not caffeineInTheAfternoon:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Koffein På Eftermiddagen', 'index': 5})
        elif not howMuchSleepDoYouGetOnAvg:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Hur Mycket Sömn Får Du i Genomsnitt', 'index': 6})
        elif not sleepDisturbancesOrSymptoms:
            return jsonify({'success': False, 'message': f'Ett nödvändigt fält saknas: Sömnstörningar Eller Symtom', 'index': 7})

        # Do they already have a sleepplan
        cursor.execute('select * from sleepplan where uid = %s', (session['user_id'],))
        result = cursor.fetchone()

        if result:
            # Update Values
            cursor.execute('update sleepplan set age = %s, weight = %s, wake_up_time = %s, time_to_sleep = %s, how_much_sleep_do_you_get_on_avg = %s, daily_mood_and_energy = %s, caffeine_in_the_afternoon = %s, sleep_disturbances_or_symptoms = %s where uid = %s', (age, weight, wakeUpTime, timeToSleep, howMuchSleepDoYouGetOnAvg, dailyMoodAndEnergy, caffeineInTheAfternoon, sleepDisturbancesOrSymptoms, session['user_id'],))
            db.commit()
        else:
            # insert new values
            cursor.execute('insert into sleepplan (uid, age, weight, wake_up_time, time_to_sleep, how_much_sleep_do_you_get_on_avg, daily_mood_and_energy, caffeine_in_the_afternoon, sleep_disturbances_or_symptoms) values (%s, %s, %s, %s, %s, %s, %s, %s, %s)', (session['user_id'], age, weight, wakeUpTime, timeToSleep, howMuchSleepDoYouGetOnAvg, dailyMoodAndEnergy, caffeineInTheAfternoon, sleepDisturbancesOrSymptoms,))
            db.commit()

        return jsonify(
            {
                'success': True,
            }
        )
    
    except:
        return jsonify(
            {
                'success': False, 
                'message': f'Något Gick Fel, Testa igen senare', 
                'index': 0
            }
        )

    finally:
        # Closing Database Connection
        cursor.close()
        db.close()


