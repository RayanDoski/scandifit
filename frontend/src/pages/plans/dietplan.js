// Importing CSS
import '../../styles/profile_dietplan.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';
import SecondaryHeader from '../../components/secondaryHeader.js'

// For Login
import NotLiAuthCheck from '../loginSystem/notLiAuthCheck.js';

function DietPlan() {

    const [CalorieIntake, setCalorieIntake] = useState('')
    const [WaterIntake, setWaterIntake] = useState('')
    const navigate = useNavigate();

    // Are They Logged In? 
    NotLiAuthCheck()

    // Getting Their TrainingPlan
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/profile/dietplan', {
                    method: 'POST',
                    credentials: 'include'  // Include credentials (cookies)
                });
                const data = await response.json();
                setCalorieIntake(data.CalorieIntake)
                setWaterIntake(data.WaterIntake)
            } catch (error) {
                console.error('Failed to fetch plan:', error);
            }
        };
        checkAuth();
    }, []);  // Include navigate in dependency array

    return (
        <>
            <SecondaryHeader />
            <section className="dietplan_section">
                
                <article>
                    <p>Försök Hålla Dig Till Ca</p>
                    <h2>{ CalorieIntake } Kalorier Per Dag</h2>
                </article>

                <article>
                    <p>Försök Hålla Dig Till Ca</p>
                    <h2>{ WaterIntake[0] } Liter Vatten Per Dag - <span>Vilodag</span></h2>
                    <h2>{ WaterIntake[1] } Liter Vatten Per Dag - <span>Träningsdag</span></h2>
                </article>


                <Link to='/dietplan/quiz'>Visa Min Information</Link>

            </section>
        </>
    );
}

export default DietPlan;