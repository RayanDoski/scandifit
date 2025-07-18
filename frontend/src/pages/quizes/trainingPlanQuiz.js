import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';

// Importing CSS
import '../../styles/trainingplan_quiz.css';

// Importing Loading Screen
import LoadingScreen from '../../components/loadingScreenFullScreen.js';

// Images
import logo from '../../images/logo.png';
import LeftArrow from '../../images/icons/left-arrow.png';
import RightArrow from '../../images/icons/right-arrow.png';

// Pictures for quiz one
import AgeOne from '../../images/quiz/18-29.webp';
import AgeTwo from '../../images/quiz/30-39.webp';
import AgeThree from '../../images/quiz/40-49.webp';
import AgeFour from '../../images/quiz/50+.webp';

// Pictures for quiz two
import SlimBody from '../../images/quiz/slim_body.webp';
import GainMuscle from '../../images/quiz/gain_muscle.png';
import GetShredded from '../../images/quiz/get_shredded.png';

// Pictures for quiz three
import BodyTypeEC from '../../images/quiz/body_type_ec.png';
import BodyTypeME from '../../images/quiz/body_type_me.png';
import BodyTypeEN from '../../images/quiz/body_type_en.png';
import DetermineBodyType from '../../images/quiz/determine-body-type.png';

// Pictures for quiz Four
import Chest from '../../images/quiz/chest.webp';
import Arms from '../../images/quiz/arms.webp';
import Stomach from '../../images/quiz/tummy.webp';
import Legs from '../../images/quiz/legs.webp';

// Pictures for quiz Eight
import HealthStatus from '../../images/quiz/health-status.png';

// Pictures for quiz Nine
import AtHome from '../../images/quiz/home.png';
import AtGym from '../../images/quiz/gym.png';

const API_BASE_URL = process.env.REACT_APP_API_URL

function QuizPartOne({ nextPart, setResponses, responses, preventEnterSubmit }) {

    const handleAgeChange = (e) => {
        setResponses({ ...responses, age: e.target.value });
    };

    return (
        <div className="one">
            <h2>Hur gammal är du?</h2>
            <main>
                <label htmlFor="height">ålder (år)</label>
                <input 
                    type="number" 
                    name="age" 
                    id="height" 
                    value={responses.age} 
                    onChange={handleAgeChange}
                    onKeyDown={preventEnterSubmit} 
                />
                <button id="height-vidare" onClick={nextPart}>Vidare</button>
            </main>
        </div>
    );
}

function QuizPartTwo({ nextPart, setResponses, responses }) {

    const handleAgeChange = (e) => {
        setResponses({ ...responses, goal: e.target.value });
    };

    return (
        <div className="two">
            <h2>Vad Är Ditt Mål?</h2>
            <main>
                <input type="radio" name="goal" value="ned i vikt" className="radio-goals" id="goal-one" onClick={nextPart} onChange={handleAgeChange} checked={responses.goal === "ned i vikt"}/>
                <label htmlFor="goal-one" id="goal">
                    <p>Viktnedgång</p>
                </label>

                <input type="radio" name="goal" value="muskelmassa" className="radio-goals" id="goal-two" onClick={nextPart} onChange={handleAgeChange} checked={responses.goal === "muskelmassa"}/>
                <label htmlFor="goal-two" id="goal">
                    <p>Muskeluppbyggnad</p>
                </label>

                <input type="radio" name="goal" value="förbättra din fysik" className="radio-goals" id="goal-three" onClick={nextPart} onChange={handleAgeChange} checked={responses.goal === "förbättra din fysik"}/>
                <label htmlFor="goal-three" id="goal">
                    <p>Fysisk underhåll</p>
                </label>

            </main>
        </div>
    );
}

function QuizPartThree({ nextPart, setResponses, responses }) {

    const handleAgeChange = (e) => {
        setResponses({ ...responses, bodyType: e.target.value });
    };

    return (
        <div className="three">
            <h2>Välj din kroppstyp</h2>
            <main>

                <input type="radio" name="body-type" value="ectomorph" className="radio-din-kroppstyp" id="kroppstyp-one" onClick={nextPart} onChange={handleAgeChange} checked={responses.bodyType === "ectomorph"} />
                <label htmlFor="kroppstyp-one" id="din-kroppstyp">
                    <h3>Ectomorph</h3>
                    <p>Lite kroppsfett och muskler. Jag har svårt att gå upp i vikt.</p>
                </label>

                <input type="radio" name="body-type" value="mesomorph" className="radio-din-kroppstyp" id="kroppstyp-two" onClick={nextPart} onChange={handleAgeChange} checked={responses.bodyType === "mesomorph"} />
                <label htmlFor="kroppstyp-two" id="din-kroppstyp">
                    <h3>Mesomorph</h3>
                    <p>Tappar lätt kroppsfett och får snabbt muskler.</p>
                </label>

                <input type="radio" name="body-type" value="endomorph" className="radio-din-kroppstyp" id="kroppstyp-three" onClick={nextPart} onChange={handleAgeChange} checked={responses.bodyType === "endomorph"} />
                <label htmlFor="kroppstyp-three" id="din-kroppstyp">
                    <h3>Endomorph</h3>
                    <p>Går lätt upp i vikt jämfört med andra kroppstyper.</p>
                </label>

                <div>
                    <h2>Testa för att bestämma din kroppstyp</h2>
                    <p>Ta tag i din motsatta handled med tummen och pekfingret. Om du är högerhänt, använd din högra hand för att ta tag i din vänstra handled.</p>
                    <h6><span>Ectomorph —</span> vira runt med lätthet.</h6>
                    <h6><span>Mesomorph —</span> röra vid varandra.</h6>
                    <h6><span>Endomorph —</span> kommer inte i kontakt.</h6>
                    <img src={DetermineBodyType} alt="holding werist" />
                </div>

            </main>
        </div>
    );
}

function QuizPartFour({ nextPart, setResponses, responses }) {

    const handleAgeChange = (e) => {
        setResponses({ ...responses, problemArea: e.target.value });
    };

    return (
        <div className="four">
            <h2>Välj Ett Problemområde</h2>
            <p>Välj ett område som du hade viljat focusera extra på</p>
            <main>

                <input type="radio" name="problem-area" value="chest" className="radio-problem-area" id="problem-area-chest" onClick={nextPart} onChange={handleAgeChange} checked={responses.problemArea === "chest"} />
                <label htmlFor="problem-area-chest" id="problem-area">
                    <p>Bröstkorg</p>
                </label>

                <input type="radio" name="problem-area" value="arms" className="radio-problem-area" id="problem-area-arms" onClick={nextPart} onChange={handleAgeChange} checked={responses.problemArea === "arms"} />
                <label htmlFor="problem-area-arms" id="problem-area">
                    <p>Armar</p>
                </label>

                <input type="radio" name="problem-area" value="stomach" className="radio-problem-area" id="problem-area-tummy" onClick={nextPart} onChange={handleAgeChange} checked={responses.problemArea === "stomach"} />
                <label htmlFor="problem-area-tummy" id="problem-area">
                    <p>Mage</p>
                </label>

                <input type="radio" name="problem-area" value="legs" className="radio-problem-area" id="problem-area-legs" onClick={nextPart} onChange={handleAgeChange} checked={responses.problemArea === "legs"} />
                <label htmlFor="problem-area-legs" id="problem-area">
                    <p>Ben</p>
                </label>

            </main>
        </div>
    );
}

function QuizPartFive({ nextPart, setResponses, responses, preventEnterSubmit }) {

    const handleHeightChange = (e) => {
        setResponses({ ...responses, height: e.target.value });
    };

    return (
        <div className="one">
            <h2>Hur lång är du?</h2>
            <main>
                <label htmlFor="height">längd (cm)</label>
                <input 
                    type="number" 
                    name="age" 
                    id="height" 
                    value={responses.height} 
                    onChange={handleHeightChange}
                    onKeyDown={preventEnterSubmit} 
                />
                <button id="height-vidare" onClick={nextPart}>Vidare</button>
            </main>
        </div>
    );
}

function QuizPartSix({ nextPart, setResponses, responses, preventEnterSubmit }) {

    const handleCurrentWeightChange = (e) => {
        setResponses({ ...responses, currentWeight: e.target.value });
    };

    const handleTargetWeightChange = (e) => {
        setResponses({ ...responses, targetWeight: e.target.value });
    };

    return (
        <div className="one">
            <h2>Vad är din nuvarande vikt och målvikt?</h2>
            <main>
                <label htmlFor="vikt">Nuvarande (Kg)</label>
                <input 
                    type="text" 
                    name="vikt" 
                    id="vikt" 
                    value={responses.currentWeight} 
                    onChange={handleCurrentWeightChange}
                    onKeyDown={preventEnterSubmit} 
                />
                <br/>
                <label htmlFor="målvikt">Målvikt (Kg)</label>
                <input 
                    type="text" 
                    name="malvikt" 
                    id="malvikt" 
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

function QuizPartSeven({ nextPart, setResponses, responses }) {

    const handleTrainingFrequencyChange = (e) => {
        setResponses({ ...responses, trainingFrequency: e.target.value });
    };

    return (
        <div className="seven">
            <h2>Hur ofta vill du träna per vecka?</h2>
            <p>allt under 3 kommer att påverka ditt förväntade resultat</p>
            <aside>

                <input type="radio" name="gng-per-vecka" value="1" className="antal-gng-per-vecka" id="one" onClick={nextPart} onChange={handleTrainingFrequencyChange} checked={responses.trainingFrequency === "1"} />
                <label htmlFor="one" id="antal-gng-per-vecka">1</label>

                <input type="radio" name="gng-per-vecka" value="2" className="antal-gng-per-vecka" id="two" onClick={nextPart} onChange={handleTrainingFrequencyChange} checked={responses.trainingFrequency === "2"} />
                <label htmlFor="two" id="antal-gng-per-vecka">2</label>

                <input type="radio" name="gng-per-vecka" value="3" className="antal-gng-per-vecka" id="three" onClick={nextPart} onChange={handleTrainingFrequencyChange} checked={responses.trainingFrequency === "3"} />
                <label htmlFor="three" id="antal-gng-per-vecka">3</label>

                <input type="radio" name="gng-per-vecka" value="4" className="antal-gng-per-vecka" id="four" onClick={nextPart} onChange={handleTrainingFrequencyChange} checked={responses.trainingFrequency === "4"} />
                <label htmlFor="four" id="antal-gng-per-vecka">4</label>

                <input type="radio" name="gng-per-vecka" value="5" className="antal-gng-per-vecka" id="five" onClick={nextPart} onChange={handleTrainingFrequencyChange} checked={responses.trainingFrequency === "5"} />
                <label htmlFor="five" id="antal-gng-per-vecka">5</label>

                <input type="radio" name="gng-per-vecka" value="6" className="antal-gng-per-vecka" id="six" onClick={nextPart} onChange={handleTrainingFrequencyChange} checked={responses.trainingFrequency === "6"} />
                <label htmlFor="six" id="antal-gng-per-vecka">6</label>

                <input type="radio" name="gng-per-vecka" value="7" className="antal-gng-per-vecka" id="seven" onClick={nextPart} onChange={handleTrainingFrequencyChange} checked={responses.trainingFrequency === "7"} />
                <label htmlFor="seven" id="antal-gng-per-vecka">7</label>

            </aside>
        </div>
    );
}

function QuizPartEight({ nextPart, setResponses, responses }) {

    const handleHealthConditionChange = (e) => {
        setResponses({ ...responses, healthCondition: e.target.value });
    };

    return (
        <div className="eight">
            <h2>Har du något av följande tillstånd?</h2>
            <aside>

                <input type="radio" name="sjukdom" value="heart" className="foljande-tillstand" id="sjukdom-heart" onClick={nextPart} onChange={handleHealthConditionChange} checked={responses.healthCondition === "heart"} />
                <label htmlFor="sjukdom-heart" id="foljande-tillstand">Hjärtsjukdom</label>
                
                <input type="radio" name="sjukdom" value="skolosis" className="foljande-tillstand" id="sjukdom-skolosis" onClick={nextPart} onChange={handleHealthConditionChange} checked={responses.healthCondition === "skolosis"} />
                <label htmlFor="sjukdom-skolosis" id="foljande-tillstand">Svår skolios</label>

                <input type="radio" name="sjukdom" value="spinal" className="foljande-tillstand" id="sjukdom-Spinal" onClick={nextPart} onChange={handleHealthConditionChange} checked={responses.healthCondition === "spinal"} />
                <label htmlFor="sjukdom-Spinal" id="foljande-tillstand">Spinal skada</label>

                <input type="radio" name="sjukdom" value="malign" className="foljande-tillstand" id="sjukdom-malign" onClick={nextPart} onChange={handleHealthConditionChange} checked={responses.healthCondition === "malign"} />
                <label htmlFor="sjukdom-malign" id="foljande-tillstand">Godartad eller malign tumör</label>

                <input type="radio" name="sjukdom" value="hypertoni" className="foljande-tillstand" id="sjukdom-Hypertoni" onClick={nextPart} onChange={handleHealthConditionChange} checked={responses.healthCondition === "hypertoni"} />
                <label htmlFor="sjukdom-Hypertoni" id="foljande-tillstand">Hypertoni</label>

                <input type="radio" name="sjukdom" value="inget" className="foljande-tillstand" id="sjukdom-Inget" onClick={nextPart} onChange={handleHealthConditionChange} checked={responses.healthCondition === "inget"} />
                <label htmlFor="sjukdom-Inget" id="foljande-tillstand" className="inget">Inget av följande</label>

            </aside>
        </div>
    );
}

function QuizPartNine({ nextPart, setResponses, responses }) {

    const handleEqiptmentChange = (e) => {
        setResponses({ ...responses, equipment: e.target.value });
    };

    return (
        <div className="ten">
            <h2>Vilken typ av utrustning har du tillgång till?</h2>
            <main>
                <input type="radio" name="utrustning" className="utrustning" value="ingen utrustning" id="utrustning-one" onClick={nextPart} onChange={handleEqiptmentChange} checked={responses.equipment === "ingen utrustning"} />
                <label htmlFor="utrustning-one" id="utrustning">
                    <h3>ingen utrustning</h3>
                </label>
                
                <input type="radio" name="utrustning" className="utrustning" value="grundläggande utrustning" id="utrustning-two" onClick={nextPart} onChange={handleEqiptmentChange} checked={responses.equipment === "grundläggande utrustning"} />
                <label htmlFor="utrustning-two" id="utrustning">
                    <h3>grundläggande utrustning</h3>
                    <p>Hantlar, hopprep etc...</p>
                </label>

                <input type="radio" name="utrustning" className="utrustning" value="full utrustning" id="utrustning-three" onClick={nextPart} onChange={handleEqiptmentChange} checked={responses.equipment === "full utrustning"} />
                <label htmlFor="utrustning-three" id="utrustning">
                    <h3>full utrustning</h3>
                    <p>utrustning som finns i de flesta gym i sverige.</p>
                </label>
            </main>
        </div>
    );
}

function QuizPartExtraQuestion({ nextPart, setResponses, responses }) {
    
    const handleSupplementsChange = (e) => {
        setResponses({ ...responses, supplement: e.target.value });
    };

    return (
        <div className="ElevenExtraQuestion">
            <h3>Extra Fråga</h3>
            <h2>Vilken av följande kosttillskott föredrar du?</h2>
            <main>
                <input type="radio" name="supplement" value="multivitamin" id="multivitamin" onClick={nextPart} onChange={handleSupplementsChange} checked={responses.supplement === "multivitamin"} />
                <label htmlFor="multivitamin">
                    <h3>Multivitamin</h3>
                </label>
                
                <input type="radio" name="supplement" value="omega" id="omega" onClick={nextPart} onChange={handleSupplementsChange} checked={responses.supplement === "omega"} />
                <label htmlFor="omega">
                    <h3>Omega-3</h3>
                </label>

                <input type="radio" name="supplement" value="VitaminD" id="VitaminD" onClick={nextPart} onChange={handleSupplementsChange} checked={responses.supplement === "VitaminD"} />
                <label htmlFor="VitaminD">
                    <h3>Vitamin D</h3>
                </label>

                <input type="radio" name="supplement" value="ProteinPulver" id="ProteinPulver" onClick={nextPart} onChange={handleSupplementsChange} checked={responses.supplement === "ProteinPulver"} />
                <label htmlFor="ProteinPulver">
                    <h3>Protein Pulver</h3>
                </label>

                <input type="radio" name="supplement" value="Creatine" id="Creatine" onClick={nextPart} onChange={handleSupplementsChange} checked={responses.supplement === "Creatine"} />
                <label htmlFor="Creatine">
                    <h3>Creatine</h3>
                </label>

                <input type="radio" name="supplement" value="Magnesium" id="Magnesium" onClick={nextPart} onChange={handleSupplementsChange} checked={responses.supplement === "Magnesium"} />
                <label htmlFor="Magnesium">
                    <h3>Magnesium</h3>
                </label>

                <input type="radio" name="supplement" value="Collagen" id="Collagen" onClick={nextPart} onChange={handleSupplementsChange} checked={responses.supplement === "Collagen"} />
                <label htmlFor="Collagen">
                    <h3>Collagen</h3>
                </label>

                <input type="radio" name="supplement" value="none" id="none" onClick={nextPart} onChange={handleSupplementsChange} checked={responses.supplement === "none"} />
                <label htmlFor="none">
                    <h3>Inget av ovanstående</h3>
                </label>
            </main>
        </div>
    );
}

function RegisterToGetTrainingPlan({ setResponses, responses, preventEnterSubmit }) {

    const handleName = (e) => {
        setResponses({ ...responses, name: e.target.value });
    };

    const handleEmail = (e) => {
        setResponses({ ...responses, email: e.target.value });
    };

    const handlePhonenumber = (e) => {
        setResponses({ ...responses, phonenumber: e.target.value });
    };

    const handlePassword = (e) => {
        setResponses({ ...responses, password: e.target.value });
    };

    return (
        <div className="one">
            <h2>Skapa ett Gratis Konto för att få tillgång till din Träningsplan!</h2>
            <main>
                <label htmlFor="name">Namn</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={responses.name} 
                    onChange={handleName}
                    onKeyDown={preventEnterSubmit} 
                />
                <br/>
                <label htmlFor="email">E-mail</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={responses.email}
                    onChange={handleEmail}
                    onKeyDown={preventEnterSubmit}   
                />
                <br/>
                <label htmlFor="telefonnummer">Telefonnummer</label>
                <input 
                    type="text" 
                    name="telefonnummer" 
                    id="telefonnummer"
                    placeholder="SV +46" 
                    value={responses.phonenumber}
                    onChange={handlePhonenumber}
                    onKeyDown={preventEnterSubmit}   
                />
                <br/>
                <label htmlFor="pass">Lösenord</label>
                <input 
                    type="password" 
                    name="pass" 
                    id="pass"
                    value={responses.password}
                    onChange={handlePassword}
                    onKeyDown={preventEnterSubmit}   
                />
                <br/>
                <button type='submit'>Tillverka Konto</button>
            </main>
        </div>
    );
}

function GetTrainingPlan() {
    return (
        <div className="eleven">
            <aside>
                <button type="submit" id="sumbit_btn">Skapa träningsplan</button>
            </aside>
        </div>
    );
}

function TrainingPlanQuiz() {

    const [currentPart, setCurrentPart] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const [responses, setResponses] = useState({
        age: '',
        goal: '',
        bodyType: '',
        problemArea: '',
        height: '',
        currentWeight: '',
        targetWeight: '',
        trainingFrequency: '',
        healthCondition: '',
        equipment: '',
        supplement: '',
        name: '',
        email: '',
        phonenumber: '',
        password: '',
    });

    // Are They Logged In? 
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/protected`, {
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

    // If they have a Trainingplan get the info 
    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch(`${API_BASE_URL}/api/trainingplan/get/info`, {
                method: 'POST',
                credentials: 'include'  // Include credentials (cookies)
            });
            const data = await response.json();
            if(data.success) {
                setResponses(prevResponses => ({
                    ...prevResponses,
                    age: data.age,
                    goal: data.goal,
                    bodyType: data.bodyType,
                    problemArea: data.problemArea,
                    height: data.height,
                    currentWeight: data.currentWeight,
                    targetWeight: data.targetWeight,
                    trainingFrequency: data.trainingFrequency,
                    healthCondition: data.healthCondition,
                    equipment: data.equipment,
                    supplement: data.supplement,
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
                return <QuizPartOne nextPart={nextPart} setResponses={setResponses} responses={responses} preventEnterSubmit={preventEnterSubmit}  />;
            case 1:
                return <QuizPartTwo nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 2:
                return <QuizPartThree nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 3:
                return <QuizPartFour nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 4:
                return <QuizPartFive nextPart={nextPart} setResponses={setResponses} responses={responses} preventEnterSubmit={preventEnterSubmit} />;
            case 5:
                return <QuizPartSix nextPart={nextPart} setResponses={setResponses} responses={responses} preventEnterSubmit={preventEnterSubmit} />;
            case 6:
                return <QuizPartSeven nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 7:
                return <QuizPartEight nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 8:
                return <QuizPartNine nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 9:
                return <QuizPartExtraQuestion nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 10:
                return isAuthenticated ? <GetTrainingPlan /> : <RegisterToGetTrainingPlan setResponses={setResponses} responses={responses} preventEnterSubmit={preventEnterSubmit} />;
            default:
                return null;
        }
    };

    // Handle Form Submit With Input Info
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/trainingplan/quiz/completed`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(responses),
        });
        const data = await response.json();
        setLoading(false)
        if (data.success) {
            navigate('/profile/trainingplan')
        } else {
            setCurrentPart(data.index)
            setErrorMessage(data.message)
        }
    };

    return (
        <>
            { loading ? <LoadingScreen /> : '' }
            <section className="quiz">
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

export default TrainingPlanQuiz;