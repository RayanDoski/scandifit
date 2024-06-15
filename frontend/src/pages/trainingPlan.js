
// Images
import logo from '../images/logo.png';

// Importing CSS
import '../styles/profile_trainingplan.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';

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

    // Getting Their TrainingPlan
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/profile/trainingplan', {
                    method: 'GET',
                    credentials: 'include'  // Include credentials (cookies)
                });
                const data = await response.json();
                if (data.TrainingPlanExists) {
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
        <section className="schedual-information">
            <main>
                <article>
                    <h1>Ditt Tränings Schema</h1>
                    <a id="din-information-btn">Visa Min Information</a>
                </article>

                {/* <aside>
                    <h3><a href="/workout/{ link }">{ exercise }</a>{ sets }{ reps }</h3>
                    <a href="/workouts/{ muscle_group }">Visa Alternativ Övningar</a>
                </aside> */}

                {Plan}

            </main>
        </section>
    );
}



function TrainingPlan() {


    return (
        <TheTrainingPlan />
    );
}

export default TrainingPlan;