import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';

// Importing CSS
import '../../styles/sleepplan_quiz.css';

// Images
import LeftArrow from '../../images/icons/left-arrow.png';
import RightArrow from '../../images/icons/right-arrow.png';

// Pictures for quiz
import Sleep from '../../images/icons/sleep.png';
import Mood from '../../images/icons/mood.png';
import Koffein from '../../images/icons/koffein.png';
import GoodSleep from '../../images/icons/good_sleep.png';
import Insomnia from '../../images/icons/insomnia.png';

function QuizPartOne({ nextPart, setResponses, responses }) {

    const handleWakeUpTimeChange = (e) => {
        setResponses({ ...responses, wakeUpTime: e.target.value });
    };

    return (
        <article className="question_one">
            <h2>När vill Du Vakna?</h2>
            <p>Att vakna vid samma tid varje dag stabiliserar kroppens interna klocka och främjar regelbundna sömncykler, vilket förbättrar sömnkvaliteten och ökar energinivån under dagen.</p>
            <label htmlFor="wakeuptime">Tid (00:00)</label>
            <input type="time" name="wakeuptime" id="wakeuptime" onChange={handleWakeUpTimeChange} value={responses.wakeUpTime} />
            <button type="button" onClick={nextPart}>Vidare</button>
        </article>
    );
}

function QuizPartTwo({ nextPart, setResponses, responses }) {

    const handleAgeChange = (e) => {
        setResponses({ ...responses, age: e.target.value });
    };

    return (
        <article className="question_two">
            <h2>Hur gammal är du?</h2>
            <label htmlFor="age">Ålder (År)</label>
            <input type="number" name="age" id="age" onChange={handleAgeChange} value={responses.age} />
            <button type="button" onClick={nextPart}>Vidare</button>
        </article>
    );
}

function QuizPartThree({ nextPart, setResponses, responses }) {

    const handleWeightChange = (e) => {
        setResponses({ ...responses, weight: e.target.value });
    };

    return (
        <article className="question_three">
            <h2>Hur Mycket Väger Du?</h2>
            <label htmlFor="weight">Vikt (Kg)</label>
            <input type="number" name="weight" id="weight" onChange={handleWeightChange} value={responses.weight} />
            <button type="button" onClick={nextPart}>Vidare</button>
        </article>
    );
}

function QuizPartFour({ nextPart, setResponses, responses }) {

    const handleTimeToSleepChange = (e) => {
        setResponses({ ...responses, timeToSleep: e.target.value });
    };

    return (
        <article className="question_four">
            <h2>Hur lång tid brukar det ta för dig att somna?</h2>
            <p>svaret behöver inte vara exakt, ta en gissning</p>
            <aside>
                
                <input type="radio" name="time_to_sleep" id="time_to_sleep_1" value="5" onClick={nextPart} onChange={handleTimeToSleepChange} checked={responses.timeToSleep === "5"} />
                <label htmlFor="time_to_sleep_1" id="next_question_four_one">
                    <p>5 Min</p>
                    <img src={Sleep} alt="Sleep_icon" />
                </label>

                <input type="radio" name="time_to_sleep" id="time_to_sleep_2" value="10" onClick={nextPart} onChange={handleTimeToSleepChange} checked={responses.timeToSleep === "10"} />
                <label htmlFor="time_to_sleep_2" id="next_question_four_two">
                    <p>10 Min</p>
                    <img src={Sleep} alt="Sleep_icon" />
                </label>

                <input type="radio" name="time_to_sleep" id="time_to_sleep_3" value="15" onClick={nextPart} onChange={handleTimeToSleepChange} checked={responses.timeToSleep === "15"} />
                <label htmlFor="time_to_sleep_3" id="next_question_four_three">
                    <p>15 Min</p>
                    <img src={Sleep} alt="Sleep_icon" />
                </label>

                <input type="radio" name="time_to_sleep" id="time_to_sleep_4" value="20" onClick={nextPart} onChange={handleTimeToSleepChange} checked={responses.timeToSleep === "20"} />
                <label htmlFor="time_to_sleep_4" id="next_question_four_four">
                    <p>20 Min</p>
                    <img src={Sleep} alt="Sleep_icon" />
                </label>

                <input type="radio" name="time_to_sleep" id="time_to_sleep_5" value="25" onClick={nextPart} onChange={handleTimeToSleepChange} checked={responses.timeToSleep === "25"} />
                <label htmlFor="time_to_sleep_5" id="next_question_four_five">
                    <p>25 Min</p>
                    <img src={Sleep} alt="Sleep_icon" />
                </label>

                <input type="radio" name="time_to_sleep" id="time_to_sleep_6" value="30" onClick={nextPart} onChange={handleTimeToSleepChange} checked={responses.timeToSleep === "30"} />
                <label htmlFor="time_to_sleep_6" id="next_question_four_six">
                    <p>30 Min</p>
                    <img src={Sleep} alt="Sleep_icon" />
                </label>

                <input type="radio" name="time_to_sleep" id="time_to_sleep_7" value="35" onClick={nextPart} onChange={handleTimeToSleepChange} checked={responses.timeToSleep === "35"} />
                <label htmlFor="time_to_sleep_7" id="next_question_four_seven">
                    <p>35 Min</p>
                    <img src={Sleep} alt="Sleep_icon" />
                </label>

                <input type="radio" name="time_to_sleep" id="time_to_sleep_8" value="40" onClick={nextPart} onChange={handleTimeToSleepChange} checked={responses.timeToSleep === "40"} />
                <label htmlFor="time_to_sleep_8" id="next_question_four_eight">
                    <p>40 Min</p>
                    <img src={Sleep} alt="Sleep_icon" />
                </label>

            </aside>
        </article>
    );
}

function QuizPartFive({ nextPart, setResponses, responses }) {

    const handleDailyMoodAndEnergyChange = (e) => {
        setResponses({ ...responses, dailyMoodAndEnergy: e.target.value });
    };

    return (
        <article className="question_five">
            <h2>Hur skulle du beskriva ditt humör och energinivå under en normal dag? <img src={Mood} alt="mood_scale" /></h2>
            <aside>
                
                <input type="radio" name="daily_mood_and_energy" id="daily_mood_and_energy_1" value="Energisk och positiv" onClick={nextPart} onChange={handleDailyMoodAndEnergyChange} checked={responses.dailyMoodAndEnergy === "Energisk och positiv"} />
                <label htmlFor="daily_mood_and_energy_1" id="next_question_five_one"><p>Energisk och positiv</p></label>

                <input type="radio" name="daily_mood_and_energy" id="daily_mood_and_energy_2" value="Jämnt humör och energi" onClick={nextPart} onChange={handleDailyMoodAndEnergyChange} checked={responses.dailyMoodAndEnergy === "Jämnt humör och energi"} />
                <label htmlFor="daily_mood_and_energy_2" id="next_question_five_two"><p>Jämnt humör och energi</p></label>

                <input type="radio" name="daily_mood_and_energy" id="daily_mood_and_energy_3" value="Ostadig energi, men positivt humör" onClick={nextPart} onChange={handleDailyMoodAndEnergyChange} checked={responses.dailyMoodAndEnergy === "Ostadig energi, men positivt humör"} />
                <label htmlFor="daily_mood_and_energy_3" id="next_question_five_three"><p>Ostadig energi, men positivt humör</p></label>

                <input type="radio" name="daily_mood_and_energy" id="daily_mood_and_energy_4" value="Låg energi, men positivt humör" onClick={nextPart} onChange={handleDailyMoodAndEnergyChange} checked={responses.dailyMoodAndEnergy === "Låg energi, men positivt humör"} />
                <label htmlFor="daily_mood_and_energy_4" id="next_question_five_four"><p>Låg energi, men positivt humör</p></label>

                <input type="radio" name="daily_mood_and_energy" id="daily_mood_and_energy_5" value="Låg energi och nedstämd" onClick={nextPart} onChange={handleDailyMoodAndEnergyChange} checked={responses.dailyMoodAndEnergy === "Låg energi och nedstämd"} />
                <label htmlFor="daily_mood_and_energy_5" id="next_question_five_five"><p>Låg energi och nedstämd</p></label>

            </aside>
        </article>
    );
}

function QuizPartSix({ nextPart, setResponses, responses }) {

    const handleCaffeineInTheAfternoonChange = (e) => {
        setResponses({ ...responses, caffeineInTheAfternoon: e.target.value });
    };

    return (
        <article className="question_six">
            <h2>Hur många gånger brukar du dricka kaffe, te eller andra drycker med koffein på eftermiddagen? <img src={Koffein} alt="mood_scale" /></h2>
            <aside>

                <input type="radio" name="caffeine_in_the_afternoon" id="caffeine_in_the_afternoon_1" value="Aldrig" onClick={nextPart} onChange={handleCaffeineInTheAfternoonChange} checked={responses.caffeineInTheAfternoon === "Aldrig"} />
                <label htmlFor="caffeine_in_the_afternoon_1" id="next_question_six_one"><p>Aldrig</p></label>

                <input type="radio" name="caffeine_in_the_afternoon" id="caffeine_in_the_afternoon_2" value="Ibland" onClick={nextPart} onChange={handleCaffeineInTheAfternoonChange} checked={responses.caffeineInTheAfternoon === "Ibland"} />
                <label htmlFor="caffeine_in_the_afternoon_2" id="next_question_six_two"><p>Ibland</p></label>

                <input type="radio" name="caffeine_in_the_afternoon" id="caffeine_in_the_afternoon_3" value="Ofta" onClick={nextPart} onChange={handleCaffeineInTheAfternoonChange} checked={responses.caffeineInTheAfternoon === "Ofta"} />
                <label htmlFor="caffeine_in_the_afternoon_3" id="next_question_six_three"><p>Ofta</p></label>

                <input type="radio" name="caffeine_in_the_afternoon" id="caffeine_in_the_afternoon_4" value="Alltid" onClick={nextPart} onChange={handleCaffeineInTheAfternoonChange} checked={responses.caffeineInTheAfternoon === "Alltid"} />
                <label htmlFor="caffeine_in_the_afternoon_4" id="next_question_six_four"><p>Alltid</p></label>

            </aside>
        </article>
    );
}

function QuizPartSeven({ nextPart, setResponses, responses }) {

    const handleHowMuchSleepDoYouGetOnAvgChange = (e) => {
        setResponses({ ...responses, howMuchSleepDoYouGetOnAvg: e.target.value });
    };

    return (
        <article className="question_seven">
            <h2>Hur många timmars sömn får du i genomsnitt per natt? <img src={GoodSleep} alt="mood_scale" /></h2>
            <aside>

                <input type="radio" name="how_much_sleep_do_you_get_on_avg" id="how_much_sleep_do_you_get_on_avg_1" value="Mindre än 3h" onClick={nextPart} onChange={handleHowMuchSleepDoYouGetOnAvgChange} checked={responses.howMuchSleepDoYouGetOnAvg === "Mindre än 3h"} />
                <label htmlFor="how_much_sleep_do_you_get_on_avg_1" id="next_question_seven_one"><p>Mindre än 3h</p></label>

                <input type="radio" name="how_much_sleep_do_you_get_on_avg" id="how_much_sleep_do_you_get_on_avg_2" value="3-4h" onClick={nextPart} onChange={handleHowMuchSleepDoYouGetOnAvgChange} checked={responses.howMuchSleepDoYouGetOnAvg === "3-4h"} />
                <label htmlFor="how_much_sleep_do_you_get_on_avg_2" id="next_question_seven_two"><p>3-4h</p></label>

                <input type="radio" name="how_much_sleep_do_you_get_on_avg" id="how_much_sleep_do_you_get_on_avg_3" value="5-6h" onClick={nextPart} onChange={handleHowMuchSleepDoYouGetOnAvgChange} checked={responses.howMuchSleepDoYouGetOnAvg === "5-6h"} />
                <label htmlFor="how_much_sleep_do_you_get_on_avg_3" id="next_question_seven_three"><p>5-6h</p></label>

                <input type="radio" name="how_much_sleep_do_you_get_on_avg" id="how_much_sleep_do_you_get_on_avg_4" value="7-8h" onClick={nextPart} onChange={handleHowMuchSleepDoYouGetOnAvgChange} checked={responses.howMuchSleepDoYouGetOnAvg === "7-8h"} />
                <label htmlFor="how_much_sleep_do_you_get_on_avg_4" id="next_question_seven_four"><p>7-8h</p></label>

                <input type="radio" name="how_much_sleep_do_you_get_on_avg" id="how_much_sleep_do_you_get_on_avg_5" value="Mer än 8" onClick={nextPart} onChange={handleHowMuchSleepDoYouGetOnAvgChange} checked={responses.howMuchSleepDoYouGetOnAvg === "Mer än 8"} />
                <label htmlFor="how_much_sleep_do_you_get_on_avg_5" id="next_question_seven_five"><p>Mer än 8</p></label>

            </aside>
        </article>
    );
}

function QuizPartEight({ nextPart, setResponses, responses }) {

    const handleSleepDisturbancesOrSymptomsChange = (e) => {
        setResponses({ ...responses, sleepDisturbancesOrSymptoms: e.target.value });
    };

    return (
        <article className="question_eight">
            <h2>Upplever du några sömnstörningar eller symtom? <img src={Insomnia} alt="mood_scale" /></h2>
            <aside>

                <input type="radio" name="sleep_disturbances_or_symptoms" id="sleep_disturbances_or_symptoms_1" value="Svårigheter att somna" onClick={nextPart} onChange={handleSleepDisturbancesOrSymptomsChange} checked={responses.sleepDisturbancesOrSymptoms === "Svårigheter att somna"} />
                <label htmlFor="sleep_disturbances_or_symptoms_1" id="next_question_eight_one"><p>Svårigheter att somna</p></label>

                <input type="radio" name="sleep_disturbances_or_symptoms" id="sleep_disturbances_or_symptoms_2" value="Vaknar ofta under natten" onClick={nextPart} onChange={handleSleepDisturbancesOrSymptomsChange} checked={responses.sleepDisturbancesOrSymptoms === "Vaknar ofta under natten"} />
                <label htmlFor="sleep_disturbances_or_symptoms_2" id="next_question_eight_two"><p>Vaknar ofta under natten</p></label>

                <input type="radio" name="sleep_disturbances_or_symptoms" id="sleep_disturbances_or_symptoms_3" value="Vaknar för tidigt på morgonen" onClick={nextPart} onChange={handleSleepDisturbancesOrSymptomsChange} checked={responses.sleepDisturbancesOrSymptoms === "Vaknar för tidigt på morgonen"} />
                <label htmlFor="sleep_disturbances_or_symptoms_3" id="next_question_eight_three"><p>Vaknar för tidigt på morgonen</p></label>

                <input type="radio" name="sleep_disturbances_or_symptoms" id="sleep_disturbances_or_symptoms_4" value="Dags trötthet" onClick={nextPart} onChange={handleSleepDisturbancesOrSymptomsChange} checked={responses.sleepDisturbancesOrSymptoms === "Dags trötthet"} />
                <label htmlFor="sleep_disturbances_or_symptoms_4" id="next_question_eight_four"><p>Dags trötthet</p></label>

                <input type="radio" name="sleep_disturbances_or_symptoms" id="sleep_disturbances_or_symptoms_5" value="Snarkning" onClick={nextPart} onChange={handleSleepDisturbancesOrSymptomsChange} checked={responses.sleepDisturbancesOrSymptoms === "Snarkning"} />
                <label htmlFor="sleep_disturbances_or_symptoms_5" id="next_question_eight_five"><p>Snarkning</p></label>

                <input type="radio" name="sleep_disturbances_or_symptoms" id="sleep_disturbances_or_symptoms_6" value="Inget" onClick={nextPart} onChange={handleSleepDisturbancesOrSymptomsChange} checked={responses.sleepDisturbancesOrSymptoms === "Inget"} />
                <label htmlFor="sleep_disturbances_or_symptoms_6" id="next_question_eight_six"><p>Inget</p></label>

            </aside>
        </article>
    );
}

function GetSleepPlan() {
    return (
        <article className="create_sleepplan">
            <p>Visste du att...</p>
            <h2>Din sömn påverkar hela 87% av din dagliga energi och produktivitet!</h2>
            <button type="submit" id="submit_form">Skapa Sömnplan</button>
        </article>
    );
}

function TrainingPlanQuiz() {

    const [currentPart, setCurrentPart] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();

    const [responses, setResponses] = useState({
        wakeUpTime: '',
        age: '',
        weight: '',
        timeToSleep: '',
        dailyMoodAndEnergy: '',
        caffeineInTheAfternoon: '',
        howMuchSleepDoYouGetOnAvg: '',
        sleepDisturbancesOrSymptoms: ''
    });

    // Are They Logged In? 
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/protected', {
                    method: 'GET',
                    credentials: 'include'  // Include credentials (cookies)
                });
                const data = await response.json();
                setIsAuthenticated(data.success)
            } catch (error) {
                
            }
        };
        checkAuth();
    }, []);  // Include navigate in dependency array

    // If they have a sleepplan get the info 
    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch('http://127.0.0.1:8000/sleepplan/get/info', {
                method: 'POST',
                credentials: 'include'  // Include credentials (cookies)
            });
            const data = await response.json();
            if(data.success) {
                setResponses(prevResponses => ({
                    ...prevResponses,
                    wakeUpTime: data.wakeUpTime,
                    age: data.age,
                    weight: data.weight,
                    timeToSleep: data.timeToSleep,
                    dailyMoodAndEnergy: data.dailyMoodAndEnergy,
                    caffeineInTheAfternoon: data.caffeineInTheAfternoon,
                    howMuchSleepDoYouGetOnAvg: data.howMuchSleepDoYouGetOnAvg,
                    sleepDisturbancesOrSymptoms: data.sleepDisturbancesOrSymptoms,
                }));
            }
        };
        checkAuth();
    }, []);  // Include navigate in dependency array

    const nextPart = () => {
        if (currentPart < 8) {
            setCurrentPart(currentPart + 1);
        }
    };

    const previousPart = () => {
        if (currentPart > 0) {
            setCurrentPart(currentPart - 1);
        }
    };

    const renderCurrentPart = () => {
        switch (currentPart) {
            case 0:
                return <QuizPartOne nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 1:
                return <QuizPartTwo nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 2:
                return <QuizPartThree nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 3:
                return <QuizPartFour nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 4:
                return <QuizPartFive nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 5:
                return <QuizPartSix nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 6:
                return <QuizPartSeven nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 7:
                return <QuizPartEight nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 8:
                return <GetSleepPlan/>;
            default:
                return null;
        }
    };

    // Handle Form Submit With Input Info
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/sleepplan/quiz/completed', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(responses),
        });
        const data = await response.json();
        if (data.success) {
            navigate('/profile/sleepplan')
        } else {
            setCurrentPart(data.index)
            setErrorMessage(data.message)
        }
    };
    
    return (
        <section className="sleepplan_quiz">
            <form onSubmit={handleSubmit} id="form-quiz">
                {/* bar */}
                <h2 id="progress-count">{currentPart}/8</h2>
                <nav>
                    <img src={LeftArrow} alt="LeftArrow" id="go-backwards" onClick={previousPart} />
                    <div>
                        <div id="progress-bar" style={{ width: `${currentPart * 12.5}%`}}></div>
                    </div>
                    <img src={RightArrow} alt="RightArrow" id="go-forward" onClick={nextPart} />
                </nav>
                {renderCurrentPart()}

                <div onClick={() => setErrorMessage('')} className={errorMessage ? 'errorMessageBackground show' : 'errorMessageBackground' }>
                    <div className={ errorMessage ? 'errorMessageContainer show' : 'errorMessageContainer' } >
                        <p>{errorMessage}</p>
                    </div>
                </div>

            </form>
        </section>
    );
}

export default TrainingPlanQuiz;