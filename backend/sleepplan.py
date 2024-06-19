from flask import Blueprint, render_template, request, session, redirect, jsonify

# To Caluclate sleep
from datetime import datetime, timedelta

from db import make_db_connection

#checking if user is logged in
from login_register import is_logged_in, is_exklusiv

sleepplan = Blueprint('sleepplan', __name__)

@sleepplan.route("/profile/sleepplan", methods=['GET', 'POST'])
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
            # Making Caffine Intake Calculations
            caffeine_in_mg = caffeine_intake_calculator(user_sleepplan)
            sleep_calculations = sleeptime_calculator(user_sleepplan)
        else:
            caffeine_in_mg = None
            sleep_calculations = None

        return jsonify({
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

@sleepplan.route("/quiz/sleepplan", methods=['post', 'get'])
def sleepplan_quiz():

    # Are they logged in?
    user_data = is_logged_in()
    if user_data is None:
        return redirect('/login')
    
    uid = user_data[0]

    # Default values
    sleepplan_info = {
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

        cursor.execute('select * from sleepplan where uid = %s', (uid))
        sleepplan = cursor.fetchone()

        if sleepplan:
            sleepplan_info = {
                'age': sleepplan[1],
                'weight': sleepplan[2],
                'wake_up_time': sleepplan[3],
                'time_to_sleep': sleepplan[4],
                'how_much_sleep_do_you_get_on_avg': sleepplan[5],
                'daily_mood_and_energy': sleepplan[6],
                'caffeine_in_the_afternoon': sleepplan[7],
                'sleep_disturbances_or_symptoms': sleepplan[8]
            }
        else:
            # Check if there's dietplan info
            cursor.execute('SELECT * FROM dietplan WHERE uid = %s', (uid,))
            extract_dietplan_info = cursor.fetchone()

            if extract_dietplan_info:
                sleepplan_info['age'] = extract_dietplan_info[2]
                sleepplan_info['weight'] = extract_dietplan_info[5]
                
    finally:
        # Closing Database Connection
        cursor.close()
        db.close()

    return render_template('sleepplan_quiz.html', sleepplan_info=sleepplan_info)

@sleepplan.route("/sleepplan/quiz/completed", methods=['post', 'get'])
def sleepplan_quiz_completed():
    try: 
        wakeuptime = request.form.get('wakeuptime')
        age = request.form.get('age')
        weight = request.form.get('weight')
        time_to_sleep = request.form.get('time_to_sleep')
        daily_mood_and_energy = request.form.get('daily_mood_and_energy')
        caffeine_in_the_afternoon = request.form.get('caffeine_in_the_afternoon')
        how_much_sleep_do_you_get_on_avg = request.form.get('how_much_sleep_do_you_get_on_avg')
        sleep_disturbances_or_symptoms = request.form.get('sleep_disturbances_or_symptoms')

        # Are they logged in?
        user_data = is_logged_in()
        if user_data is None:
            return redirect('/login')
        
        uid = user_data[0]
        
        # Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        # Do they already have a sleepplan
        cursor.execute('select * from sleepplan where uid = %s', (uid,))
        result = cursor.fetchone()

        if result:
            # Update Values
            cursor.execute('update sleepplan set age = %s, weight = %s, wake_up_time = %s, time_to_sleep = %s, how_much_sleep_do_you_get_on_avg = %s, daily_mood_and_energy = %s, caffeine_in_the_afternoon = %s, sleep_disturbances_or_symptoms = %s where uid = %s', (age, weight, wakeuptime, time_to_sleep, how_much_sleep_do_you_get_on_avg, daily_mood_and_energy, caffeine_in_the_afternoon, sleep_disturbances_or_symptoms, uid,))
            db.commit()
        else:
            # insert new values
            cursor.execute('insert into sleepplan (uid, age, weight, wake_up_time, time_to_sleep, how_much_sleep_do_you_get_on_avg, daily_mood_and_energy, caffeine_in_the_afternoon, sleep_disturbances_or_symptoms) values (%s, %s, %s, %s, %s, %s, %s, %s, %s)', (uid, age, weight, wakeuptime, time_to_sleep, how_much_sleep_do_you_get_on_avg, daily_mood_and_energy, caffeine_in_the_afternoon, sleep_disturbances_or_symptoms,))
            db.commit()

        return redirect('/profile/sleepplan')
    
    except:
        redirect('/quiz/sleepplan')
    finally:
        # Closing Database Connection
        cursor.close()
        db.close()



