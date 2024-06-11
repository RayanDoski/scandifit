
// Images
import logo from '../images/logo.png';
import LeftArrow from '../images/icons/left-arrow.png';
import RightArrow from '../images/icons/right-arrow.png';

// Pictures for quiz one
import AgeOne from '../images/quiz/18-29.webp';
import AgeTwo from '../images/quiz/30-39.webp';
import AgeThree from '../images/quiz/40-49.webp';
import AgeFour from '../images/quiz/50+.webp';

// Pictures for quiz two
import SlimBody from '../images/quiz/slim_body.webp';
import GainMuscle from '../images/quiz/gain_muscle.png';
import GetShredded from '../images/quiz/get_shredded.png';

// Pictures for quiz three
import BodyTypeEC from '../images/quiz/body_type_ec.png';
import BodyTypeME from '../images/quiz/body_type_me.png';
import BodyTypeEN from '../images/quiz/body_type_en.png';
import DetermineBodyType from '../images/quiz/determine-body-type.png';

// Pictures for quiz Four
import Chest from '../images/quiz/chest.webp';
import Arms from '../images/quiz/arms.webp';
import Stomach from '../images/quiz/tummy.webp';
import Legs from '../images/quiz/legs.webp';

// Pictures for quiz Eight
import HealthStatus from '../images/quiz/health-status.png';

// Pictures for quiz Nine
import AtHome from '../images/quiz/home.png';
import AtGym from '../images/quiz/gym.png';

// Importing CSS
import '../styles/trainingplan_quiz.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';

function QuizPartOne({ nextPart, setResponses, responses }) {

    const handleAgeChange = (e) => {
        setResponses({ ...responses, age: e.target.value });
    };

    return (
        <div className="one">
            <h2>Prioritera din hälsa och kondition</h2>
            <p>Hur Gammal Är Du?</p>
            <main>
                <input type="radio" name="age" value="18-29" className="age" id="age-18-29" onChange={handleAgeChange} checked={responses.age === "18-29"} />
                <label htmlFor="age-18-29" id="ages">
                    <img src={AgeOne} alt="age 18-29" />
                    <p>Ålder: 18-29</p>
                </label>

                <input type="radio" name="age" value="30-39" className="age" id="age-30-39" onChange={handleAgeChange} checked={responses.age === "30-39"} />
                <label htmlFor="age-30-39" id="ages">
                    <img src={AgeTwo} alt="age 30-39" />
                    <p>Ålder: 30-39</p>
                </label>

                <input type="radio" name="age" value="40-49" className="age" id="age-40-49" onChange={handleAgeChange} checked={responses.age === "40-49"} />
                <label htmlFor="age-40-49" id="ages">
                    <img src={AgeThree} alt="age 40-49" />
                    <p>Ålder: 40-49</p>
                </label>

                <input type="radio" name="age" value="50+" className="age" id="age-50+" onChange={handleAgeChange} checked={responses.age === "50+"} />
                <label htmlFor="age-50+" id="ages">
                    <img src={AgeFour} alt="age 50+" />
                    <p>Ålder: 50+</p>
                </label>
            </main>
        </div>
    );
}

function QuizPartTwo({ nextPart, setResponses, responses }) {

    const handleAgeChange = (e) => {
        setResponses({ ...responses, goal: e.target.value });
    };

    return (
        <div class="two">
            <h2>Vad Är Ditt Mål?</h2>
            <main>
                <label htmlFor="goal-one" id="goal">
                    <img src={SlimBody} alt="goal" />
                    <p>Gå ner i vikt</p>
                </label>

                <input type="radio" name="goal" value="ned i vikt" class="radio-goals" id="goal-one" onChange={handleAgeChange} checked={responses.goal === "ned i vikt"}/>

                <label htmlFor="goal-two" id="goal" onClick={nextPart}>
                    <img src={GainMuscle} alt="goal" />
                    <p>Få muskelmassa</p>
                </label>

                <input type="radio" name="goal" value="muskelmassa" class="radio-goals" id="goal-two" onChange={handleAgeChange} checked={responses.goal === "muskelmassa"}/>

                <label htmlFor="goal-three" id="goal" onClick={nextPart}>
                    <img src={GetShredded} alt="goal" />
                    <p>Förbättra din fysik</p>
                </label>

                <input type="radio" name="goal" value="förbättra din fysik" class="radio-goals" id="goal-three" onChange={handleAgeChange} checked={responses.goal === "förbättra din fysik"}/>

            </main>
        </div>
    );
}

function QuizPartThree({ nextPart }) {
    return (
        <div class="three">
            <h2>Välj din kroppstyp</h2>
            <main>
                <label for="kroppstyp-one" id="din-kroppstyp" onClick={nextPart}>
                    <aside>
                        <h3>Ectomorph</h3>
                        <p>Lite kroppsfett och muskler. Jag har svårt att gå upp i vikt.</p>
                    </aside>
                    <img src={BodyTypeEC} alt="Din Kroppstyp" />
                </label>

                <input type="radio" name="body-type" value="ectomorph" class="radio-din-kroppstyp" id="kroppstyp-one" />

                <label for="kroppstyp-two" id="din-kroppstyp" onClick={nextPart}>
                    <aside>
                        <h3>Mesomorph</h3>
                        <p>Tappar lätt kroppsfett och får snabbt muskler.</p>
                    </aside>
                    <img src={BodyTypeME} alt="Din Kroppstyp" />
                </label>

                <input type="radio" name="body-type" value="mesomorph" class="radio-din-kroppstyp" id="kroppstyp-two" />

                <label for="kroppstyp-three" id="din-kroppstyp" onClick={nextPart}>
                    <aside>
                        <h3>Endomorph</h3>
                        <p>Går lätt upp i vikt jämfört med andra kroppstyper.</p>
                    </aside>
                    <img src={BodyTypeEN} alt="Din Kroppstyp" />
                </label>

                <input type="radio" name="body-type" value="endomorph" class="radio-din-kroppstyp" id="kroppstyp-three" />

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

function QuizPartFour({ nextPart }) {
    return (
        <div class="four">
            <h2>Välj Ett Problemområde</h2>
            <main>
                <div>
                    <label htmlFor="problem-area-chest" id="problem-area" onClick={nextPart}>
                        <p>Svag bröstkorg</p>
                        <img src={Chest} alt="Problem area chest" />
                    </label>

                    <input type="radio" name="problem-area" value="chest" class="radio-problem-area" id="problem-area-chest" />

                    <label htmlFor="problem-area-arms" id="problem-area" onClick={nextPart}>
                        <p>Smala armar</p>
                        <img src={Arms} alt="Problem area arms" />
                    </label>

                    <input type="radio" name="problem-area" value="arms" class="radio-problem-area" id="problem-area-arms" />
                </div>
                <div>
                    <label htmlFor="problem-area-tummy" id="problem-area" onClick={nextPart}>
                        <p>tjock mage</p>
                        <img src={Stomach} alt="Problem area tummy" />
                    </label>

                    <input type="radio" name="problem-area" value="stomach" class="radio-problem-area" id="problem-area-tummy" />

                    <label htmlFor="problem-area-legs" id="problem-area" onClick={nextPart}>
                        <p>Smala ben</p>
                        <img src={Legs} alt="Problem area legs" />
                    </label>

                    <input type="radio" name="problem-area" value="legs" class="radio-problem-area" id="problem-area-legs" />
                </div>
            </main>
        </div>
    );
}

function QuizPartFive({ nextPart }) {
    return (
        <div class="five">
            <main>
                <h2>Hur lång är du?</h2>
                <label htmlFor="height">längd (cm)</label>
                <input type="text" name="height" id="height" onkeydown="preventEnterSubmit(event)" />
                <h3 id="height-vidare" onClick={nextPart}>Vidare</h3>
            </main>
        </div>
    );
}

function QuizPartSix({ nextPart }) {
    return (
        <div class="six">
            <main>
                <h2>Vad är din nuvarande vikt och målvikt?</h2>
                <label htmlFor="vikt">Nuvarande (Kg)</label>
                <input type="text" name="vikt" id="vikt" onkeydown="preventEnterSubmit(event)" />
                <label htmlFor="målvikt">Målvikt (Kg)</label>
                <input type="text" name="malvikt" id="malvikt" onkeydown="preventEnterSubmit(event)" />
                <h3 id="weight-vidare" onClick={nextPart}>Vidare</h3>
            </main>
        </div>
    );
}

function QuizPartSeven({ nextPart }) {
    return (
        <div class="seven">
            <main>
                <h2>Hur ofta vill du träna per vecka?</h2>
                <p>allt under 3 kommer att påverka ditt förväntade resultat</p>
                <aside>

                    <label for="one" id="antal-gng-per-vecka" onClick={nextPart}>1</label>
                    <input type="radio" name="gng-per-vecka" value="1" class="antal-gng-per-vecka" id="one" />

                    <label for="two" id="antal-gng-per-vecka" onClick={nextPart}>2</label>
                    <input type="radio" name="gng-per-vecka" value="2" class="antal-gng-per-vecka" id="two" />

                    <label for="three" id="antal-gng-per-vecka" onClick={nextPart}>3</label>
                    <input type="radio" name="gng-per-vecka" value="3" class="antal-gng-per-vecka" id="three" />

                    <label for="four" id="antal-gng-per-vecka" onClick={nextPart}>4</label>
                    <input type="radio" name="gng-per-vecka" value="4" class="antal-gng-per-vecka" id="four" />

                    <label for="five" id="antal-gng-per-vecka" onClick={nextPart}>5</label>
                    <input type="radio" name="gng-per-vecka" value="5" class="antal-gng-per-vecka" id="five" />

                    <label for="six" id="antal-gng-per-vecka" onClick={nextPart}>6</label>
                    <input type="radio" name="gng-per-vecka" value="6" class="antal-gng-per-vecka" id="six" />

                    <label for="seven" id="antal-gng-per-vecka" onClick={nextPart}>7</label>
                    <input type="radio" name="gng-per-vecka" value="7" class="antal-gng-per-vecka" id="seven" />

                </aside>
            </main>
        </div>
    );
}

function QuizPartEight({ nextPart }) {
    return (
        <div class="eight">
            <main>
                <h2>har du något av följande tillstånd?</h2>
                <div>
                    <aside>

                        <label for="sjukdom-heart" id="foljande-tillstand" onClick={nextPart}>Hjärtsjukdom</label>
                        <input type="radio" name="sjukdom" value="heart" class="foljande-tillstand" id="sjukdom-heart" />

                        <label for="sjukdom-skolosis" id="foljande-tillstand" onClick={nextPart}>Svår skolios</label>
                        <input type="radio" name="sjukdom" value="skolosis" class="foljande-tillstand" id="sjukdom-skolosis" />

                        <label for="sjukdom-Spinal" id="foljande-tillstand" onClick={nextPart}>Spinal skada</label>
                        <input type="radio" name="sjukdom" value="spinal" class="foljande-tillstand" id="sjukdom-Spinal" />

                        <label for="sjukdom-malign" id="foljande-tillstand" onClick={nextPart}>Godartad eller malign tumör</label>
                        <input type="radio" name="sjukdom" value="malign" class="foljande-tillstand" id="sjukdom-malign" />

                        <label for="sjukdom-Hypertoni" id="foljande-tillstand" onClick={nextPart}>Hypertoni</label>
                        <input type="radio" name="sjukdom" value="hypertoni" class="foljande-tillstand" id="sjukdom-Hypertoni" />

                        <label for="sjukdom-Inget" id="foljande-tillstand" class="inget" onClick={nextPart}>Inget</label>
                        <input type="radio" name="sjukdom" value="inget" class="foljande-tillstand" id="sjukdom-Inget" />

                    </aside>
                    <img src={HealthStatus} alt="Health Status" />
                </div>
            </main>
        </div>
    );
}

function QuizPartNine({ nextPart }) {
    return (
        <div class="nine">
            <main>
                <h2>Välj platsen för dina träningspass</h2>
                <label htmlFor="hem" id="training-place" onClick={nextPart}>Hemma <img src={AtHome} alt="home" /></label>
                <input type="radio" name="home-or-gym" class="home-or-gym" value="hemma" id="hem" />
                <label htmlFor="gym" id="training-place" onClick={nextPart}>gym <img src={AtGym} alt="gym" /></label>
                <input type="radio" name="home-or-gym" class="home-or-gym" value="gym" id="gym" />
            </main>
        </div>
    );
}

function QuizPartTen({ nextPart }) {
    return (
        <div class="ten">
            <main>
                <h2>Vilken typ av utrustning har du tillgång till?</h2>

                <label htmlFor="utrustning-one" id="utrustning" onClick={nextPart}>
                    <h3>ingen utrustning</h3>
                </label>
                <input type="radio" name="utrustning" class="utrustning" value="ingen utrustning" id="utrustning-one" />

                <label htmlFor="utrustning-two" id="utrustning" onClick={nextPart}>
                    <h3>grundläggande utrustning</h3>
                    <p>Hantlar, hopprep etc...</p>
                </label>
                <input type="radio" name="utrustning" class="utrustning" value="grundläggande utrustning" id="utrustning-two" />

                <label htmlFor="utrustning-three" id="utrustning" onClick={nextPart}>
                    <h3>full utrustning</h3>
                    <p>utrustning som finns i de flesta gym i sverige.</p>
                </label>
                <input type="radio" name="utrustning" class="utrustning" value="full utrustning" id="utrustning-three" />

            </main>
        </div>
    );
}

function TrainingPlanQuiz() {

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
        trainingLocation: '',
        equipment: ''
    });

    const [currentPart, setCurrentPart] = useState(1);

    const nextPart = () => {
        if (currentPart < 10) {
            setCurrentPart(currentPart + 1);
        }
    };

    const previousPart = () => {
        if (currentPart > 1) {
            setCurrentPart(currentPart - 1);
        }
    };

    const renderCurrentPart = () => {
        switch (currentPart) {
            case 1:
                return <QuizPartOne nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 2:
                return <QuizPartTwo nextPart={nextPart} setResponses={setResponses} responses={responses} />;
            case 3:
                return <QuizPartThree nextPart={nextPart} />;
            case 4:
                return <QuizPartFour nextPart={nextPart} />;
            case 5:
                return <QuizPartFive nextPart={nextPart} />;
            case 6:
                return <QuizPartSix nextPart={nextPart} />;
            case 7:
                return <QuizPartSeven nextPart={nextPart} />;
            case 8:
                return <QuizPartEight nextPart={nextPart} />;
            case 9:
                return <QuizPartNine nextPart={nextPart} />;
            case 10:
                return <QuizPartTen nextPart={nextPart} />;
            default:
                return null;
        }
    };

    return (
        <section className="quiz">
            <form action="/trainingplan/quiz/completed" method="post" id="form-quiz">
                {/* bar */}
                <h2 id="progress-count">{currentPart}/10/{responses.age}</h2>
                <nav>
                    <img src={LeftArrow} alt="LeftArrow" id="go-backwards" onClick={previousPart} />
                    <div>
                        <div id="progress-bar"></div>
                    </div>
                    <img src={RightArrow} alt="RightArrow" id="go-forward" onClick={nextPart} />
                </nav>
                {renderCurrentPart()}
            </form>
        </section>
    );
}

export default TrainingPlanQuiz;