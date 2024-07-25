import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';

// Importing CSS
import '../../styles/profile_trainingplan.css';

// Importing Loading Screen
import LoadingScreen from '../../components/loadingScreen.js';

// For Login
import NotLiAuthCheck from '../loginSystem/notLiAuthCheck.js';

import SecondaryHeader from '../../components/secondaryHeader.js'

function IfScheduleDoesNotExist() {
    return (
        <section className="no-trainingplan">
            <main>
                <Link to='/trainingplan/quiz'>Skapa En Träningsplan</Link>
            </main>
        </section>
    )
}

function TheTrainingPlan() {

    const [Plan, setPlan] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    // Are They Logged In? 
    NotLiAuthCheck()

    // Getting Their TrainingPlan
    useEffect(() => {
        setLoading(true)
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/profile/trainingplan', {
                    method: 'GET',
                    credentials: 'include'  // Include credentials (cookies)
                });
                const data = await response.json();
                if (data.TrainingPlanExists) {
                    setLoading(false)
                    setPlan(data.Schedual)
                }
            } catch (error) {
                console.error('Failed to fetch plan:', error);
                // setPlan(null);
            }
        };
        checkAuth();
    }, []);  // Include navigate in dependency array

    if (!Plan) {
        return <IfScheduleDoesNotExist />;
    }

    return (
        <>
            { loading ? <LoadingScreen /> : (
                <section className="schedual-information">
                    <main>
                        <article>
                            <h1>Din Träningsplan</h1>
                            <Link className='ViewMyInfoBtn' to='/trainingplan/quiz' >Visa Min Information</Link>
                        </article>

                        {Plan.map((TrainingSession, index) => (
                            <div key={index}>
                                <h1>{TrainingSession.Title}</h1>

                                {/* Render Cardio Exercises */}
                                {TrainingSession.Cardio && TrainingSession.Cardio.map((cardio, index) => (
                                    <aside key={index}>
                                        <h3><Link to={`/profile/exercise/${cardio.id}`}>{ cardio.name }</Link>{ cardio.frequency }</h3>
                                        <Link to={`/profile/exercises/${cardio.muscle_group}`}>Visa Alternativ Övningar</Link>
                                    </aside>
                                ))}

                                {TrainingSession.Exercises && TrainingSession.Exercises.map((exercise, index) => (
                                    <aside key={index}>
                                        <h3><Link to={`/profile/exercise/${exercise.id}`}>{ exercise.name }</Link>{ exercise.frequency }</h3>
                                        <Link to={`/profile/exercises/${exercise.muscle_group}`}>Visa Alternativ Övningar</Link>
                                    </aside>
                                ))}

                                {TrainingSession.ExtraExercises && TrainingSession.ExtraExercises.map((ExtraExercise, index) => (
                                    <aside key={index}>
                                        <h3><Link to={`/profile/exercise/${ExtraExercise.id}`}>{ ExtraExercise.name }</Link>{ ExtraExercise.frequency }</h3>
                                        <Link to={`/profile/exercises/${ExtraExercise.muscle_group}`}>Visa Alternativ Övningar</Link>
                                    </aside>
                                ))}

                            </div>
                        ))}

                        {/* {Plan} */}

                    </main>
                </section>
            )}
        </>
    );
}

function TrainingPlan() {
    return (
        <>
            <SecondaryHeader />
            <TheTrainingPlan />
        </>
    );
}

export default TrainingPlan;