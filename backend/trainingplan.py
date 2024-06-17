from flask import Blueprint, render_template, request, session, redirect, jsonify

# Connecting To The Database
from db import make_db_connection

# Checking If User Is Logged In And If They Are Exklusiv
from login_register import is_logged_in, is_exklusiv

trainingplan = Blueprint('trainingplan', __name__)
        
@trainingplan.route("/profile/trainingplan", methods=["GET","POST"])
def schedual():
    '''
    This Function handles users trainingplan infomraiton and makes a shceudal out of it
    '''
    try:
        #Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        #getting their quiz values
        cursor.execute('select * from trainingplan where uid = %s', (session['user_id'],))
        tp = cursor.fetchone()

        # Checking If They Have A Schedual Or Not
        if tp is None:
            return jsonify({
                'TrainingPlanExists': False
            })

        # Antalet Tränings Pass Per Vecka
        amount_of_exercises_per_week = int(tp[8])

        # Writing Amount Of Sets And Reps Based On Thier Fitness Goals
        FitnessGoal = tp[2]
        their_goal = fitness_goals(FitnessGoal)

        # For Better Readability
        frequency = their_goal

        # Vilka Övningar Ska Implementeras?
        HomeOrGym = tp[10]
        EqiptmentAccess = tp[11]
        exercise_list = added_exercises(HomeOrGym, EqiptmentAccess)

        cardio_exercise_list = exercise_list[0]
        chest_exercise_list = exercise_list[1]
        triceps_exercise_list = exercise_list[2]
        axlar_exercise_list = exercise_list[3]
        rygg_exercise_list = exercise_list[4]
        biceps_exercise_list = exercise_list[5]
        mage_exercise_list = exercise_list[6]
        legs_exercise_list = exercise_list[7]

        #getting all Exercises
        cardio_exercise = get_exercise_from_database(cardio_exercise_list)
        chest_exercise = get_exercise_from_database(chest_exercise_list)
        triceps_exercise = get_exercise_from_database(triceps_exercise_list)
        axlar_exercise = get_exercise_from_database(axlar_exercise_list)
        rygg_exercise = get_exercise_from_database(rygg_exercise_list)
        biceps_exercise = get_exercise_from_database(biceps_exercise_list)
        mage_exercise = get_exercise_from_database(mage_exercise_list)
        legs_exercise = get_exercise_from_database(legs_exercise_list)

        # Adding a List Of Cardio Exercises
        cardio_training_list = cardio_exercises(EqiptmentAccess, FitnessGoal, cardio_exercise)
        frequencyCardio = cardio_training_list

        # Problem Område (Vilken Kroppsdel Vill De Utvekcla Mer?)
        # more_of_these_exercises = problem_area(tp[4], chest_exercise, triceps_exercise, biceps_exercise, mage_exercise, legs_exercise, sets, reps)

        #How Manny Training sessions per Week
        if amount_of_exercises_per_week == 1:
            schedual = [
                {
                    "Title": 'Första TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},                        
                        {"detail": cardio_training_list[1][0]},                        
                        {"detail": cardio_training_list[2][0]} 
                    ],
                    "Exercises": [
                        {
                            "id": chest_exercise[1][0],
                            "name": chest_exercise[1][1],
                            "muscle_group": chest_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": triceps_exercise[1][0],
                            "name": triceps_exercise[1][1],
                            "muscle_group": triceps_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": axlar_exercise[1][0],
                            "name": axlar_exercise[1][1],
                            "muscle_group": axlar_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": rygg_exercise[0][0],
                            "name": rygg_exercise[0][1],
                            "muscle_group": rygg_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": biceps_exercise[0][0],
                            "name": biceps_exercise[0][1],
                            "muscle_group": biceps_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": mage_exercise[0][0],
                            "name": mage_exercise[0][1],
                            "muscle_group": mage_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": legs_exercise[0][0],
                            "name": legs_exercise[0][1],
                            "muscle_group": legs_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ]
                },
            ]
        elif amount_of_exercises_per_week == 2:
            schedual = [
                {
                    "Title": 'Första TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": chest_exercise[1][0],
                            "name": chest_exercise[1][1],
                            "muscle_group": chest_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": triceps_exercise[1][0],
                            "name": triceps_exercise[1][1],
                            "muscle_group": triceps_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": axlar_exercise[1][0],
                            "name": axlar_exercise[1][1],
                            "muscle_group": axlar_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Andra TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": rygg_exercise[0][0],
                            "name": rygg_exercise[0][1],
                            "muscle_group": rygg_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": biceps_exercise[0][0],
                            "name": biceps_exercise[0][1],
                            "muscle_group": biceps_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": mage_exercise[0][0],
                            "name": mage_exercise[0][1],
                            "muscle_group": mage_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": legs_exercise[0][0],
                            "name": legs_exercise[0][1],
                            "muscle_group": legs_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                }
            ]
        elif amount_of_exercises_per_week == 3:
            schedual = [
                {
                    "Title": 'Första TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": chest_exercise[1][0],
                            "name": chest_exercise[1][1],
                            "muscle_group": chest_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        },
                        more_of_these_exercises[0][0],  # Assuming this is already a dictionary
                        {
                            "id": triceps_exercise[1][0],
                            "name": triceps_exercise[1][1],
                            "muscle_group": triceps_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Andra TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": rygg_exercise[0][0],
                            "name": rygg_exercise[0][1],
                            "muscle_group": rygg_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": biceps_exercise[0][0],
                            "name": biceps_exercise[0][1],
                            "muscle_group": biceps_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": axlar_exercise[1][0],
                            "name": axlar_exercise[1][1],
                            "muscle_group": axlar_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Tredje TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": mage_exercise[0][0],
                            "name": mage_exercise[0][1],
                            "muscle_group": mage_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": legs_exercise[0][0],
                            "name": legs_exercise[0][1],
                            "muscle_group": legs_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": chest_exercise[1][0],
                            "name": chest_exercise[1][1],
                            "muscle_group": chest_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
            ]
        elif amount_of_exercises_per_week == 4:
            schedual = [
                {
                    "Title": 'Första TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": chest_exercise[1][0],
                            "name": chest_exercise[1][1],
                            "muscle_group": chest_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": triceps_exercise[1][0],
                            "name": triceps_exercise[1][1],
                            "muscle_group": triceps_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": triceps_exercise[0][0],
                            "name": triceps_exercise[0][1],
                            "muscle_group": triceps_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Andra TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": rygg_exercise[0][0],
                            "name": rygg_exercise[0][1],
                            "muscle_group": rygg_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": biceps_exercise[0][0],
                            "name": biceps_exercise[0][1],
                            "muscle_group": biceps_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": axlar_exercise[0][0],
                            "name": axlar_exercise[0][1],
                            "muscle_group": axlar_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Tredje TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": mage_exercise[0][0],
                            "name": mage_exercise[0][1],
                            "muscle_group": mage_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": legs_exercise[0][0],
                            "name": legs_exercise[0][1],
                            "muscle_group": legs_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": legs_exercise[1][0],
                            "name": legs_exercise[1][1],
                            "muscle_group": legs_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Fjärde TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        more_of_these_exercises[0][0],  # Assuming this is already a properly formatted dictionary
                        more_of_these_exercises[1][0],  # Assuming this is already a properly formatted dictionary
                        more_of_these_exercises[2][0]   # Assuming this is already a properly formatted dictionary
                    ],
                },
            ]
        elif amount_of_exercises_per_week == 5:
            schedual = [
                {
                    "Title": 'Första TräningsPass',
                    "Exercises": [
                        {
                            "id": cardio_exercise[0][0],
                            "name": cardio_exercise[0][1],
                            "muscle_group": cardio_exercise[0][2],
                            "frequency": frequencyCardio,
                        },
                        {
                            "id": chest_exercise[1][0],
                            "name": chest_exercise[1][1],
                            "muscle_group": chest_exercise[1][2],
                            "frequency": frequency,
                        },
                        {
                            "id": triceps_exercise[1][0],
                            "name": triceps_exercise[1][1],
                            "muscle_group": triceps_exercise[1][2],
                            "frequency": frequency,
                        },
                        {
                            "id": triceps_exercise[0][0],
                            "name": triceps_exercise[0][1],
                            "muscle_group": triceps_exercise[0][2],
                            "frequency": frequency
                        }
                    ],
                },
                {
                    "Title": 'Andra TräningsPass',
                    "Exercises": [
                        {
                            "id": rygg_exercise[0][0],
                            "name": rygg_exercise[0][1],
                            "muscle_group": rygg_exercise[0][2],
                            "frequency": frequency
                        },
                        {
                            "id": biceps_exercise[0][0],
                            "name": biceps_exercise[0][1],
                            "muscle_group": biceps_exercise[0][2],
                            "frequency": frequency
                        },
                        {
                            "id": axlar_exercise[0][0],
                            "name": axlar_exercise[0][1],
                            "muscle_group": axlar_exercise[0][2],
                            "frequency": frequency
                        }
                    ],
                },
                {
                    "Title": 'Tredje TräningsPass',
                    "Exercises": [
                        {
                            "id": legs_exercise[0][0],
                            "name": legs_exercise[0][1],
                            "muscle_group": legs_exercise[0][2],
                            "frequency": frequency
                        },
                        {
                            "id": legs_exercise[1][0],
                            "name": legs_exercise[1][1],
                            "muscle_group": legs_exercise[1][2],
                            "frequency": frequency
                        }
                    ],
                },
                {
                    "Title": 'Fjärde TräningsPass',
                    "Exercises": [
                        {
                            "id": mage_exercise[0][0],
                            "name": mage_exercise[0][1],
                            "muscle_group": mage_exercise[0][2],
                            "frequency": frequency
                        },
                        {
                            "id": mage_exercise[1][0],
                            "name": mage_exercise[1][1],
                            "muscle_group": mage_exercise[1][2],
                            "frequency": frequency
                        }
                    ],
                },
                {
                    "Title": 'Femte TräningsPass',
                    "Exercises": [
                        {
                            "id": mage_exercise[0][0],
                            "name": mage_exercise[0][1],
                            "muscle_group": mage_exercise[0][2],
                            "frequency": frequency
                        },
                        {
                            "id": mage_exercise[1][0],
                            "name": mage_exercise[1][1],
                            "muscle_group": mage_exercise[1][2],
                            "frequency": frequency
                        }
                    ],
                },
            ]
        elif amount_of_exercises_per_week == 6:
            schedual = [
                {
                    "Title": 'Första TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": chest_exercise[0][0],
                            "name": chest_exercise[0][1],
                            "muscle_group": chest_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": chest_exercise[1][0],
                            "name": chest_exercise[1][1],
                            "muscle_group": chest_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": chest_exercise[2][0],
                            "name": chest_exercise[2][1],
                            "muscle_group": chest_exercise[2][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Andra TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": triceps_exercise[0][0],
                            "name": triceps_exercise[0][1],
                            "muscle_group": triceps_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": triceps_exercise[1][0],
                            "name": triceps_exercise[1][1],
                            "muscle_group": triceps_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Tredje TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": axlar_exercise[0][0],
                            "name": axlar_exercise[0][1],
                            "muscle_group": axlar_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": axlar_exercise[1][0],
                            "name": axlar_exercise[1][1],
                            "muscle_group": axlar_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Fjärde TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": rygg_exercise[0][0],
                            "name": rygg_exercise[0][1],
                            "muscle_group": rygg_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": biceps_exercise[0][0],
                            "name": biceps_exercise[0][1],
                            "muscle_group": biceps_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Femte TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": mage_exercise[0][0],
                            "name": mage_exercise[0][1],
                            "muscle_group": mage_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": mage_exercise[1][0],
                            "name": mage_exercise[1][1],
                            "muscle_group": mage_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Sjätte TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": legs_exercise[0][0],
                            "name": legs_exercise[0][1],
                            "muscle_group": legs_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": legs_exercise[1][0],
                            "name": legs_exercise[1][1],
                            "muscle_group": legs_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                }
            ]
        else:
            schedual = [
                {
                    "Title": 'Chest TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": chest_exercise[1][0],
                            "name": chest_exercise[1][1],
                            "muscle_group": chest_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": chest_exercise[0][0],
                            "name": chest_exercise[0][1],
                            "muscle_group": chest_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": chest_exercise[2][0],
                            "name": chest_exercise[2][1],
                            "muscle_group": chest_exercise[2][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Triceps TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": triceps_exercise[0][0],
                            "name": triceps_exercise[0][1],
                            "muscle_group": triceps_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": triceps_exercise[1][0],
                            "name": triceps_exercise[1][1],
                            "muscle_group": triceps_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Axlar TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": axlar_exercise[0][0],
                            "name": axlar_exercise[0][1],
                            "muscle_group": axlar_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": axlar_exercise[1][0],
                            "name": axlar_exercise[1][1],
                            "muscle_group": axlar_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Rygg TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": rygg_exercise[0][0],
                            "name": rygg_exercise[0][1],
                            "muscle_group": rygg_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": biceps_exercise[0][0],
                            "name": biceps_exercise[0][1],
                            "muscle_group": biceps_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Mage TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": mage_exercise[0][0],
                            "name": mage_exercise[0][1],
                            "muscle_group": mage_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": mage_exercise[1][0],
                            "name": mage_exercise[1][1],
                            "muscle_group": mage_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                ],
                },
                {
                    "Title": 'Ben TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "id": legs_exercise[0][0],
                            "name": legs_exercise[0][1],
                            "muscle_group": legs_exercise[0][2],
                            "sets": sets,
                            "reps": reps
                        },
                        {
                            "id": legs_exercise[1][0],
                            "name": legs_exercise[1][1],
                            "muscle_group": legs_exercise[1][2],
                            "sets": sets,
                            "reps": reps
                        }
                    ],
                },
                {
                    "Title": 'Extra TräningsPass',
                    "Cardio": [
                        {"detail": cardio_training_list[0][0]},
                        {"detail": cardio_training_list[1][0]},
                        {"detail": cardio_training_list[2][0]}
                    ],
                    "Exercises": [
                        {
                            "detail": more_of_these_exercises[0][0]  # Assuming more_of_these_exercises[n][0] is already a dictionary
                        },
                        {
                            "detail": more_of_these_exercises[1][0]  # Assuming more_of_these_exercises[n][1] is already a dictionary
                        },
                        {
                            "detail": more_of_these_exercises[2][0]  # Assuming more_of_these_exercises[n][2] is already a dictionary
                        }
                    ],
                }
            ]
        
        return jsonify({
            'TrainingPlanExists': True,
            'Schedual': schedual
        })
    finally:
        # Close Database Connection
        db.close()
        cursor.close()

# To Get Exercises From Database
def get_exercise_from_database(exercise):

    try:
        
        #Make Database Connection
        db = make_db_connection()
        cursor = db.cursor()

        cursor.execute('SELECT * FROM workout WHERE id IN (%s)' % ', '.join(map(str, exercise)))
        exercise_data = cursor.fetchall()

        return exercise_data

    finally:
        # Close Database Connection
        db.close()
        cursor.close()

# Vilka Övningar Ska Implementeras?
def added_exercises(HomeOrGym, EqiptmentAccess):
    if HomeOrGym == 'hemma' and EqiptmentAccess == 'ingen utrustning':
        #exercises that fit them (DATABASE ID:S)
        cardio_exercise_list = [42, 44, 45]
        chest_exercise_list = [3, 2, 4]
        triceps_exercise_list = [7, 11]
        axlar_exercise_list = [16, 17]
        rygg_exercise_list = [20]
        biceps_exercise_list = [27]
        mage_exercise_list = [28, 32]
        legs_exercise_list = [40, 41]
    elif HomeOrGym == 'hemma' and EqiptmentAccess == 'grundläggande utrustning':
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
        frequency = ' - 12 Reps - 3 Sets '
    elif their_goal == 'muskelmassa':
        frequency = ' - 8 Reps - 3 Sets '
    else:
        #they want to cut weight
        frequency = ' - 15 Reps - 3 Sets '

    return frequency

# Problem Område (Vilken Kroppsdel Vill De Utvekcla Mer?)
def problem_area(more_of_what, chest_exercise, triceps_exercise, biceps_exercise, mage_exercise, legs_exercise, sets, reps):
    try:
        if more_of_what == 'chest':
            added_exercise = [
                [create_exercise(chest_exercise[0][0], chest_exercise[0][1], chest_exercise[0][2], sets, reps)],
                [create_exercise(chest_exercise[1][0], chest_exercise[1][1], chest_exercise[1][2], sets, reps)],
                [create_exercise(chest_exercise[2][0], chest_exercise[2][1], chest_exercise[2][2], sets, reps)],
            ]
        elif more_of_what == 'arms':
            added_exercise = [
                [create_exercise(triceps_exercise[0][0], triceps_exercise[0][1], triceps_exercise[0][2], sets, reps)],
                [create_exercise(chest_exercise[0][0], chest_exercise[0][1], chest_exercise[0][2], sets, reps)],
                [create_exercise(biceps_exercise[0][0], biceps_exercise[0][1], biceps_exercise[0][2], sets, reps)],
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
    except:
        #For Worst Case Cenerios, If it doens't work
        added_exercise = [
                [''],
                [''],
                [''],
            ]
        return added_exercise
    
# Anpassar Cardio Till Användaren
def cardio_exercises(EqiptmentAccess, their_goal, cardio_exercise):
    # Users Situation (Gym Or Home | Equiptment Access)
    if EqiptmentAccess == 'full utrustning':
        if their_goal == 'Förbättra din fysik':
            frequencyCardio = ' - 15 Min '
        elif their_goal == 'muskelmassa':
            frequencyCardio = ' - 10 Min '
        else:
            frequencyCardio = ' - 20 Min '
        
        cardio_training_list = [
            [cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], frequencyCardio, '']
        ]

    else:

        if their_goal == 'Förbättra din fysik':
            frequencyCardio = ' - 1 Min Kör / 1 Min Vila x 3 '
        elif their_goal == 'muskelmassa':
            frequencyCardio = ' - 1 Min Kör / 1 Min Vila x 2 '
        else:
            frequencyCardio = ' - 1 Min Kör / 1 Min Vila x 4 '
        
        cardio_training_list = [
            [cardio_exercise[0][0], cardio_exercise[0][1], cardio_exercise[0][2], frequencyCardio, ''],
            [cardio_exercise[1][0], cardio_exercise[1][1], cardio_exercise[1][2], frequencyCardio, ''],
            [cardio_exercise[2][0], cardio_exercise[2][1], cardio_exercise[2][2], frequencyCardio, '']
        ]
    
    
    return frequencyCardio
    