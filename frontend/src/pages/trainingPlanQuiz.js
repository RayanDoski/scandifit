
// Images
import logo from '../images/logo.png';
import LeftArrow from '../images/icons/left-arrow.png';
import RightArrow from '../images/icons/right-arrow.png';
import AgeOne from '../images/quiz/18-29.webp';
import AgeTwo from '../images/quiz/30-39.webp';
import AgeThree from '../images/quiz/40-49.webp';
import AgeFour from '../images/quiz/50+.webp';

// Importing CSS
import '../styles/trainingplan_quiz.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';

function QuizPartOne() {
    return (
        <>
        <div className="one">
            <h2>Prioritera din hälsa och kondition</h2>
            <p>Hur Gammal Är Du?</p>
            <main>
                <label htmlFor="age-18-29" id="ages">
                    <img src={AgeOne} alt="age 18-29" />
                    <p>Ålder: 18-29</p>
                </label>

                <input type="radio" name="age" value="18-29" className="age" id="age-18-29" />

                <label htmlFor="age-30-39" id="ages">
                    <img src={AgeTwo} alt="age-30-39" />
                    <p>Ålder: 30-39</p>
                </label>

                <input type="radio" name="age" value="30-39" className="age" id="age-30-39" />

                <label htmlFor="age-40-49" id="ages">
                    <img src={AgeThree} alt="age-40-49" />
                    <p>Ålder: 40-49</p>
                </label>

                <input type="radio" name="age" value="40-49" className="age" id="age-40-49" />

                <label htmlFor="age-50+" id="ages">
                    <img src={AgeFour} alt="age-50+" />
                    <p>Ålder: 50+</p>
                </label>

                <input type="radio" name="age" value="50+" className="age" id="age-50+" />

            </main>
        </div>
        </>
    );
}

function QuizPartTwo() {
    return (
        <>
        </>
    );
}

function QuizPartThree() {
    return (
        <>
        </>
    );
}

function TrainingPlanQuiz() {

    return (
        <section className="quiz">
            <form action="/trainingplan/quiz/completed" method="post" id="form-quiz">
                {/* bar */}
                <h2 id="progress-count">0/10</h2>
                <nav>
                    <img src={LeftArrow} alt="LeftArrow" id="go-backwards" />
                    <div>
                        <div id="progress-bar"></div>
                    </div>
                    <img src={RightArrow} alt="RightArrow" id="go-forward" />
                </nav>
                <QuizPartOne /> 

            </form>
        </section>
    );
}

export default TrainingPlanQuiz;