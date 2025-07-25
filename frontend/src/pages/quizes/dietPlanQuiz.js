import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';

// Importing CSS
import '../../styles/dietplan_quiz.css';

// Importing Loading Screen
import LoadingScreen from '../../components/loadingScreenFullScreen.js';

// For Login
import NotLiAuthCheck from '../loginSystem/notLiAuthCheck.js';

// Images
import LeftArrow from '../../images/icons/left-arrow.png';
import RightArrow from '../../images/icons/right-arrow.png';

// Pictures for quiz

// Quiz Part One
import SlimBody from '../../images/quiz/slim_body.webp';
import Hero from '../../images/quiz/hero.webp';
import getShredded from '../../images/quiz/get_shredded.png';

// Quiz Part Eight
import WaterBottle from '../../images/icons/water_bottle.png';

// Quiz Part Nine
import Vegitarian from '../../images/icons/vegitarian.png';
import Vegan from '../../images/icons/vegan.png';
import NoneMark from '../../images/icons/none-mark.png';

// Quiz Part Ten
import Cake from '../../images/icons/cake.png';
import Coke from '../../images/icons/coke.png';

const API_BASE_URL = process.env.REACT_APP_API_URL

function QuizPartOne({ nextPart, setResponses, responses }) {

    const handleGoalChange = (e) => {
        setResponses({ ...responses, goal: e.target.value });
    };

    return (
        <div className="DietplanQuestionOne">
            <h2>Vad Är Ditt Mål?</h2>
            <main>
                <input type="radio" name="goal" value="ned i vikt" className="radio-goals" id="goal-one" onClick={nextPart} onChange={handleGoalChange} checked={responses.goal === "viktminskning"}/>
                <label htmlFor="goal-one" id="goal">
                    <p>Viktnedgång</p>
                </label>

                <input type="radio" name="goal" value="muskelmassa" className="radio-goals" id="goal-two" onClick={nextPart} onChange={handleGoalChange} checked={responses.goal === "musclemassincrease"}/>
                <label htmlFor="goal-two" id="goal">
                    <p>Muskeluppbyggnad</p>
                </label>

                <input type="radio" name="goal" value="förbättra din fysik" className="radio-goals" id="goal-three" onClick={nextPart} onChange={handleGoalChange} checked={responses.goal === "maintenance"}/>
                <label htmlFor="goal-three" id="goal">
                    <p>Fysisk underhåll</p>
                </label>

            </main>
        </div>
    );
}

function QuizPartTwo({ nextPart, setResponses, responses }) {

    const handleGenderChange = (e) => {
        setResponses({ ...responses, gender: e.target.value });
    };

    return (
        <article className="question_two">
            <h2>jag är en...</h2>
            <aside>

                <input type="radio" name="gender" id="man" value="man" onClick={nextPart} onChange={handleGenderChange} checked={responses.gender === "man"} />
                <label htmlFor="man" id="man">Man</label>

                <input type="radio" name="gender" id="woman" value="woman" onClick={nextPart} onChange={handleGenderChange} checked={responses.gender === "woman"} />
                <label htmlFor="woman" id="woman">Woman</label>

            </aside>
        </article>
    );
}

function QuizPartThree({ nextPart, setResponses, responses, preventEnterSubmit }) {

    const handleAgeChange = (e) => {
        setResponses({ ...responses, age: e.target.value });
    };

    return (
        <div className="DietplanQuestionThree">
            <h2>Hur gammal är du?</h2>
            <main>
                <label htmlFor="age">Ålder (År)</label>
                <input 
                    type="number" 
                    name="age" 
                    id="age" 
                    value={responses.age} 
                    onChange={handleAgeChange}
                    onKeyDown={preventEnterSubmit} 
                />
                <button onClick={nextPart}>Vidare</button>
            </main>
        </div>
    );
}

function QuizPartFour({ nextPart, setResponses, responses, preventEnterSubmit }) {

    const handleHeightChange = (e) => {
        setResponses({ ...responses, height: e.target.value });
    };

    return (
        <div className="DietplanQuestionThree">
            <h2>Hur lång är du?</h2>
            <main>
                <label htmlFor="height">Längd (cm)</label>
                <input 
                    type="number" 
                    name="height" 
                    id="height" 
                    value={responses.height} 
                    onChange={handleHeightChange}
                    onKeyDown={preventEnterSubmit} 
                />
                <button onClick={nextPart}>Vidare</button>
            </main>
        </div>
    );
}

function QuizPartFive({ nextPart, setResponses, responses, preventEnterSubmit }) {

    const handleWeightChange = (e) => {
        setResponses({ ...responses, weight: e.target.value });
    };

    const handleTargetWeightChange = (e) => {
        setResponses({ ...responses, targetWeight: e.target.value });
    };

    return (
        <div className="DietplanQuestionThree">
            <h2>Vad är din nuvarande vikt och målvikt?</h2>
            <main>
                <label htmlFor="currentweight">Nuvarande (Kg)</label>
                <input 
                    type="number" 
                    name="currentweight" 
                    id="currentweight" 
                    value={responses.weight} 
                    onChange={handleWeightChange}
                    onKeyDown={preventEnterSubmit} 
                />
                <br/>
                <label htmlFor="targetweight">Målvikt (Kg)</label>
                <input 
                    type="number" 
                    name="targetweight" 
                    id="targetweight" 
                    value={responses.targetWeight} 
                    onChange={handleTargetWeightChange}
                    onKeyDown={preventEnterSubmit} 
                />
                <br/>
                <button onClick={nextPart}>Vidare</button>
            </main>
        </div>
    );
}

function QuizPartSix({ nextPart, setResponses, responses }) {

    const handleActivityLevelChange = (e) => {
        setResponses({ ...responses, activityLevel: e.target.value });
    };

    return (
        <article className="question_six">
            <h2>Hur fysiskt krävande är din vardag?</h2>
            <p>(Uteslut Träningspass)</p>
            <aside>

                <input type="radio" name="physically_demanding_everyday_life" id="physically_demanding_everyday_life_one" value="1" onClick={nextPart} onChange={handleActivityLevelChange} checked={responses.activityLevel === "1"} />
                <label htmlFor="physically_demanding_everyday_life_one" id="next_question_six_one">Inte krävande alls, jag rör mig knappt</label>

                <input type="radio" name="physically_demanding_everyday_life" id="physically_demanding_everyday_life_two" value="2" onClick={nextPart} onChange={handleActivityLevelChange} checked={responses.activityLevel === "2"} />
                <label htmlFor="physically_demanding_everyday_life_two" id="next_question_six_two">Det är inte så krävande, jag går runt ibland</label>

                <input type="radio" name="physically_demanding_everyday_life" id="physically_demanding_everyday_life_three" value="3" onClick={nextPart} onChange={handleActivityLevelChange} checked={responses.activityLevel === "3"} />
                <label htmlFor="physically_demanding_everyday_life_three" id="next_question_six_three">Krävande, jag behöver röra mig regelbundet.</label>
                
                <input type="radio" name="physically_demanding_everyday_life" id="physically_demanding_everyday_life_four" value="4" onClick={nextPart} onChange={handleActivityLevelChange} checked={responses.activityLevel === "4"} />
                <label htmlFor="physically_demanding_everyday_life_four" id="next_question_six_four">Det är väldigt krävande och tar mycket av min energi</label>

            </aside>
        </article>
    );
}

function QuizPartSeven({ nextPart, setResponses, responses }) {

    const handleTrainingSessionsPerWeekChange = (e) => {
        setResponses({ ...responses, trainingSessionPerWeek: e.target.value });
    };

    return (
        <article className="question_seven">
            <h2>Hur ofta tränar du per vecka?</h2>
            <aside>

                <input type="radio" name="training_sessions_per_week" id="training_sessions_per_week_one" value="1" onClick={nextPart} onChange={handleTrainingSessionsPerWeekChange} checked={responses.trainingSessionPerWeek === "1"} />
                <label htmlFor="training_sessions_per_week_one" id="next_question_seven_one">1</label>

                <input type="radio" name="training_sessions_per_week" id="training_sessions_per_week_two" value="2" onClick={nextPart} onChange={handleTrainingSessionsPerWeekChange} checked={responses.trainingSessionPerWeek === "2"} />
                <label htmlFor="training_sessions_per_week_two" id="next_question_seven_two">2</label>

                <input type="radio" name="training_sessions_per_week" id="training_sessions_per_week_three" value="3" onClick={nextPart} onChange={handleTrainingSessionsPerWeekChange} checked={responses.trainingSessionPerWeek === "3"} />
                <label htmlFor="training_sessions_per_week_three" id="next_question_seven_three">3</label>

                <input type="radio" name="training_sessions_per_week" id="training_sessions_per_week_four" value="4" onClick={nextPart} onChange={handleTrainingSessionsPerWeekChange} checked={responses.trainingSessionPerWeek === "4"} />
                <label htmlFor="training_sessions_per_week_four" id="next_question_seven_four">4</label>

                <input type="radio" name="training_sessions_per_week" id="training_sessions_per_week_five" value="5" onClick={nextPart} onChange={handleTrainingSessionsPerWeekChange} checked={responses.trainingSessionPerWeek === "5"} />
                <label htmlFor="training_sessions_per_week_five" id="next_question_seven_five">5</label>

                <input type="radio" name="training_sessions_per_week" id="training_sessions_per_week_six" value="6" onClick={nextPart} onChange={handleTrainingSessionsPerWeekChange} checked={responses.trainingSessionPerWeek === "6"} />
                <label htmlFor="training_sessions_per_week_six" id="next_question_seven_six">6</label>

                <input type="radio" name="training_sessions_per_week" id="training_sessions_per_week_seven" value="7" onClick={nextPart} onChange={handleTrainingSessionsPerWeekChange} checked={responses.trainingSessionPerWeek === "7"} />
                <label htmlFor="training_sessions_per_week_seven" id="next_question_seven_seven">7</label>

            </aside>

            <input type="radio" name="training_sessions_per_week" id="training_sessions_per_week_eight" />
            <label htmlFor="training_sessions_per_week_seven" id="next_question_seven_eight">basera denna statistik på min personliga Träningsplan</label>
            <p>Detta kommer att göra din kostplan mycket bättre eftersom vi har detaljerade beskrivningar på din träningsplan</p>
        </article>
    );
}

function QuizPartEight({ nextPart, setResponses, responses }) {

    const handleCurrentDailyWaterIntakeChange = (e) => {
        setResponses({ ...responses, currentDailyWaterIntake: e.target.value });
    };

    return (
        <article className="question_eight">
            <h2>Vad är ditt dagliga vattenintag?</h2>
            <p>svaret behöver inte vara exakt, ta en gissning</p>
            <aside>

                <input type="radio" name="current_daily_water_intake" id="current_daily_water_intake_one" value="1" onClick={nextPart} onChange={handleCurrentDailyWaterIntakeChange} checked={responses.currentDailyWaterIntake === "1"} />
                <label htmlFor="current_daily_water_intake_one" id="next_question_eight_one">
                    <p>1 Liter</p>
                    <img src={WaterBottle} alt="Water_bottles" />
                </label>

                <input type="radio" name="current_daily_water_intake" id="current_daily_water_intake_two" value="2" onClick={nextPart} onChange={handleCurrentDailyWaterIntakeChange} checked={responses.currentDailyWaterIntake === "2"}/>
                <label htmlFor="current_daily_water_intake_two" id="next_question_eight_two">
                    <p>2 Liter</p>
                    <img src={WaterBottle} alt="Water_bottles" />
                </label>

                <input type="radio" name="current_daily_water_intake" id="current_daily_water_intake_three" value="3" onClick={nextPart} onChange={handleCurrentDailyWaterIntakeChange} checked={responses.currentDailyWaterIntake === "3"} />
                <label htmlFor="current_daily_water_intake_three" id="next_question_eight_three">
                    <p>3 Liter</p>
                    <img src={WaterBottle} alt="Water_bottles" />
                </label>

                <input type="radio" name="current_daily_water_intake" id="current_daily_water_intake_four" value="4" onClick={nextPart} onChange={handleCurrentDailyWaterIntakeChange} checked={responses.currentDailyWaterIntake === "4"} />
                <label htmlFor="current_daily_water_intake_four" id="next_question_eight_four">
                    <p>4 Liter</p>
                    <img src={WaterBottle} alt="Water_bottles" />
                </label>

                <input type="radio" name="current_daily_water_intake" id="current_daily_water_intake_five" value="5" onClick={nextPart} onChange={handleCurrentDailyWaterIntakeChange} checked={responses.currentDailyWaterIntake === "5"} />
                <label htmlFor="current_daily_water_intake_five" id="next_question_eight_five">
                    <p>5 Liter</p>
                    <img src={WaterBottle} alt="Water_bottles" />
                </label>

                <input type="radio" name="current_daily_water_intake" id="current_daily_water_intake_six" value="6" onClick={nextPart} onChange={handleCurrentDailyWaterIntakeChange} checked={responses.currentDailyWaterIntake === "6"} />
                <label htmlFor="current_daily_water_intake_six" id="next_question_eight_six">
                    <p>6 Liter</p>
                    <img src={WaterBottle} alt="Water_bottles" />
                </label>
                
            </aside>
        </article>
    );
}

function QuizPartNine({ nextPart, setResponses, responses }) {

    const handleDietaryPrefrencesChange = (e) => {
        setResponses({ ...responses, dietaryPrefrences: e.target.value });
    };

    return (
        <article className="question_nine">
            <h2>jag är...</h2>
            <aside>

                <input type="radio" name="dietary_preferences" id="dietary_preferences_one" value="vegetarian" onClick={nextPart} onChange={handleDietaryPrefrencesChange} checked={responses.dietaryPrefrences === "vegetarian"} />
                <label htmlFor="dietary_preferences_one" id="next_question_nine_one">
                    <img src={Vegitarian} alt="vegetarisk ikon" />
                    <p>Vegetarian</p>
                </label>

                <input type="radio" name="dietary_preferences" id="dietary_preferences_two" value="vegan" onClick={nextPart} onChange={handleDietaryPrefrencesChange} checked={responses.dietaryPrefrences === "vegan"} />
                <label htmlFor="dietary_preferences_two" id="next_question_nine_two">
                    <img src={Vegan} alt="vegetarisk ikon" />
                    <p>Vegan</p>
                </label>

                <input type="radio" name="dietary_preferences" id="dietary_preferences_three" value="none" onClick={nextPart} onChange={handleDietaryPrefrencesChange} checked={responses.dietaryPrefrences === "none"} />
                <label htmlFor="dietary_preferences_three" id="next_question_nine_three">
                    <img src={NoneMark} alt="vegetarisk ikon" />
                    <p>Inget Av Ovanstående</p>
                </label>

            </aside>
        </article>
    );
}

function QuizPartTen({ nextPart, setResponses, responses }) {

    const handleSugarIntakeChange = (e) => {
        setResponses({ ...responses, sugarIntake: e.target.value });
    };

    return (
        <article className="question_ten">
            <h2>Hur ofta äter du sötsaker eller dricker läsk?</h2>
            <aside>

                <input type="radio" name="sugar_intake" id="sugar_intake_one" value="flera gånger om dagen" onClick={nextPart} onChange={handleSugarIntakeChange} checked={responses.sugarIntake === "flera gånger om dagen"} />
                <label htmlFor="sugar_intake_one" id="next_question_ten_one">Flera gånger om dagen</label>

                <input type="radio" name="sugar_intake" id="sugar_intake_two" value="en gång om dagen" onClick={nextPart} onChange={handleSugarIntakeChange} checked={responses.sugarIntake === "en gång om dagen"} />
                <label htmlFor="sugar_intake_two" id="next_question_ten_two">En gång om dagen</label>

                <input type="radio" name="sugar_intake" id="sugar_intake_three" value="ett par gånger i veckan" onClick={nextPart} onChange={handleSugarIntakeChange} checked={responses.sugarIntake === "ett par gånger i veckan"} />
                <label htmlFor="sugar_intake_three" id="next_question_ten_three">Ett par gånger i veckan</label>

                <input type="radio" name="sugar_intake" id="sugar_intake_four" value="sällan" onClick={nextPart} onChange={handleSugarIntakeChange} checked={responses.sugarIntake === "sällan"} />
                <label htmlFor="sugar_intake_four" id="next_question_ten_four">Sällan</label>

                <input type="radio" name="sugar_intake" id="sugar_intake_five" value="aldrig" onClick={nextPart} onChange={handleSugarIntakeChange} checked={responses.sugarIntake === "aldrig"} />
                <label htmlFor="sugar_intake_five" id="next_question_ten_five">Aldrig</label>

            </aside>
        </article>
    );
}

function GetDietPlan() {
    return (
        <article className="create_dietplan">
            <p>Visste Du att.....</p>
            <h2>Maten du äter påverkar hela 81% av dina resultat!</h2>
            <button type="submit">Skapa Kostplan</button>
        </article>
    );
}

function DietPlanQuiz() {

    const [currentPart, setCurrentPart] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const [responses, setResponses] = useState({
        goal: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        targetWeight: '',
        activityLevel: '',
        trainingSessionPerWeek: '',
        dietaryPrefrences: '',
        currentDailyWaterIntake: '',
        sugarIntake: ''
    });

    // Are They Logged In? 
    NotLiAuthCheck()

    // If they have a sleepplan get the info 
    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch(`${API_BASE_URL}/api/dietplan/get/info`, {
                method: 'POST',
                credentials: 'include'  // Include credentials (cookies)
            });
            const data = await response.json();
            if(data.success) {
                setResponses(prevResponses => ({
                    ...prevResponses,
                    goal: data.goal,
                    age: data.age,
                    gender: data.gender,
                    height: data.height,
                    weight: data.weight,
                    targetWeight: data.targetWeight,
                    activityLevel: data.activityLevel,
                    trainingSessionPerWeek: data.trainingSessionPerWeek,
                    dietaryPrefrences: data.dietaryPrefrences,
                    currentDailyWaterIntake: data.currentDailyWaterIntake,
                    sugarIntake: data.sugarIntake
                }));
            }
        };
        checkAuth();
    }, []);  // Include navigate in dependency array

    const preventEnterSubmit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }; 

    const nextPart = () => {
        if (currentPart < 10) {
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
                return <QuizPartThree nextPart={nextPart} setResponses={setResponses} responses={responses} preventEnterSubmit={preventEnterSubmit} />;
            case 3:
                return <QuizPartFour nextPart={nextPart} setResponses={setResponses} responses={responses} preventEnterSubmit={preventEnterSubmit} />;
            case 4:
                return <QuizPartFive nextPart={nextPart} setResponses={setResponses} responses={responses} preventEnterSubmit={preventEnterSubmit} />;
            case 5:
                return <QuizPartSix nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 6:
                return <QuizPartSeven nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 7:
                return <QuizPartEight nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 8:
                return <QuizPartNine nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 9:
                return <QuizPartTen nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 10:
                return <GetDietPlan/>;
            default:
                return null;
        }
    };

    // Handle Form Submit With Input Info
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/dietplan/quiz/completed`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(responses),
        });
        const data = await response.json();
        if (data.success) {
            setLoading(false)
            navigate('/profile/dietplan')
        } else {
            setLoading(false)
            setCurrentPart(data.index)
            setErrorMessage(data.message)
        }
    };
    
    return (
        <>
            { loading ? <LoadingScreen /> : '' }
            <section className="dietplan_quiz">
                <form onSubmit={handleSubmit} id="form-quiz">
                    {/* bar */}
                    <h2 id="progress-count">{currentPart}/10</h2>
                    <nav>
                        <img src={LeftArrow} alt="LeftArrow" id="go-backwards" onClick={previousPart} />
                        <div>
                            <div id="progress-bar" style={{ width: `${currentPart * 10}%`}}></div>
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
        </>
    );
}

export default DietPlanQuiz;