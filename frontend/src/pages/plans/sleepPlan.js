// Importing CSS
import '../../styles/profile_sleepplan.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';
import SecondaryHeader from '../../components/secondaryHeader.js'

// Importing Loading Screen
import LoadingScreen from '../../components/loadingScreen.js';

// For Login
import NotLiAuthCheck from '../loginSystem/notLiAuthCheck.js';

// images
import Night from '../../images/icons/night.png';
import Sun from '../../images/icons/sun.png';
import Coffe from '../../images/icons/coffee.png';
import Coffe75 from '../../images/icons/coffee_75.png';
import Coffe50 from '../../images/icons/coffee_50.png';
import Coffe25 from '../../images/icons/coffee_25.png';
import LookingAtScreenAtNight from '../../images/icons/looking_at_screen_at_night.png';
import GoodSleep from '../../images/icons/good_sleep.png';
import Insomnia from '../../images/icons/insomnia.png'; 

function PopupCaffein({ caffeineInMg, setShowPopupCaffeinInMg, ShowPopupCaffeinInMg }) {
    return (
        <section className="sleeplan_section_popup_message" onClick={() => setShowPopupCaffeinInMg(!ShowPopupCaffeinInMg)}>

            <article id="show_to_think_about" className='show'>
                <h2>Att Tänka På</h2>
                <ul>
                    <li>Observera att { caffeineInMg } MG kan <span>variera beroende på din koffeinkänslighet</span></li>
                    <li>Kom ihåg att undvika kaffe <span>sex timmar</span> före sömn</li>
                    <li>Kom också ihåg att <span>dricka tillräckligt med vatten</span></li>
                </ul>
            </article>

        </section>
    )
}

function OneHourBeforeBedtimePopup({ ShowPopupOneHourBeforeBedtime, setShowPopupOneHourBeforeBedtime }) {
    return (
        <section class="sleeplan_section_popup_message" onClick={() => setShowPopupOneHourBeforeBedtime(!ShowPopupOneHourBeforeBedtime)}>

            <article id="why_questionmark">
                <h2>Varför...</h2>
                <ul>
                    <li><span>Undvik blått ljus en timme före sömn: </span> Hjälper dig att somna snabbare genom att reglera melatoninproduktionen.</li>
                    <li><span>Sov djupare: </span>Minskar ögonbelastning och ger en mer återhämtande sömn.</li>
                    <li><span>Vakna upp utvilad: </span>Med djupare sömn vaknar du känna dig mer utvilad och redo för dagen.</li>
                </ul>
            </article>

        </section>
    )
}

function BenifitsOfGoodSleepPopup({ ShowPopupBenifitsOfGoodSleep, setShowPopupBenifitsOfGoodSleep }) {
    return (
        <section class="sleeplan_section_popup_message" onClick={() => setShowPopupBenifitsOfGoodSleep(!ShowPopupBenifitsOfGoodSleep)}>

             <article id="benifits_of_sleep">
                <h2>Fördelarna Med Bra Sömn</h2>
                <ul>
                    <li><span>Ökade energinivåer:</span> Vakna upp och känna dig utvilad och redo att ta itu med dagen.</li>
                    <li><span>Förbättrat humör:</span> Njut av en mer positiv syn och minskad irritabilitet.</li>
                    <li><span>Förbättrad kognitiv funktion:</span> Skarpare fokus, bättre minne och förbättrat beslutsfattande.</li>
                    <li><span>Stärkt immunsystem:</span> Bättre rustad att bekämpa sjukdomar och infektioner.</li>
                    <li><span>Hälsosam viktreglering:</span> Minskat sug efter ohälsosam mat och bättre reglering av metabolismen.</li>
                    <li><span>Lägre risk för kroniska sjukdomar:</span> Minskad risk för tillstånd som hjärtsjukdom, diabetes och stroke.</li>
                    <li><span>Snabbare återhämtning:</span> Förbättrad muskelreparation och övergripande fysisk återställning under sömn.</li>
                </ul>
            </article>

        </section>
    )
}

function DisadvantagesOfBadSleepPopup({ ShowPopupDisadvantagesOfBadSleep, setShowPopupDisadvantagesOfBadSleep }) {
    return (
        <section class="sleeplan_section_popup_message" onClick={() => setShowPopupDisadvantagesOfBadSleep(!ShowPopupDisadvantagesOfBadSleep)}>

            <article id="disadvantages_of_bad_sleep">
                <h2>Nackdelarna Med Dålig Sömn</h2>
                <ul>
                    <li><span>Trötthet:</span> Konstant trötthet och brist på energi under hela dagen.</li>
                    <li><span>Humörsvängningar:</span> Ökad irritabilitet, ångest och depression.</li>
                    <li><span>Kognitiv försämring:</span> Dålig koncentration, problem med minnet och svårighet att fatta beslut.</li>
                    <li><span>Försvagat immunsystem:</span> Större mottaglighet för sjukdomar och längre återhämtningstider.</li>
                    <li><span>Viktuppgång:</span> Ökat sug efter socker- och högkalorimat, vilket leder till viktuppgång.</li>
                    <li><span>Ökad risk för kroniska sjukdomar:</span> Högre sannolikhet att utveckla tillstånd som fetma, diabetes och högt blodtryck.</li>
                    <li><span>Nedsatt fysisk prestation:</span> Minskad koordination, långsammare reaktionstider och försämrad idrottsprestation.</li>
                </ul>
            </article>

        </section>
    )
}

function SleepPlan() {

    const [CaffeineInMg, setCaffeineInMg] = useState(0)
    const [sleepCalculations, setsleepCalculations] = useState('')
    const [UserSleepplan, setUserSleepplan] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // popupValues
    const [ShowPopupCaffeinInMg, setShowPopupCaffeinInMg] = useState(false)
    const [ShowPopupOneHourBeforeBedtime, setShowPopupOneHourBeforeBedtime] = useState(false)
    const [ShowPopupBenifitsOfGoodSleep, setShowPopupBenifitsOfGoodSleep] = useState(false)
    const [ShowPopupDisadvantagesOfBadSleep, setShowPopupDisadvantagesOfBadSleep] = useState(false)
    
    function OnOffPopup(value, set) {
        set(!value)
    }

    const renderCaffeineImages = (CaffeineInMg) => {
        switch (true) {
            case CaffeineInMg > 400:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe25} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 375:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 350:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe75} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 325:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe50} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 300:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe25} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 275:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 250:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe75} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 225:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe50} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 200:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe25} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 175:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 150:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe75} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 125:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe50} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 100:
                return (
                    <>
                        <img src={Coffe} alt="CoffeCupMg" />
                        <img src={Coffe25} alt="CoffeCupMg" />
                    </>
                );
            case CaffeineInMg > 75:
                return <img src={Coffe} alt="CoffeCupMg" />;
            case CaffeineInMg > 50:
                return <img src={Coffe75} alt="CoffeCupMg" />;
            case CaffeineInMg > 25:
                return <img src={Coffe50} alt="CoffeCupMg" />;
            case CaffeineInMg > 0:
                return <img src={Coffe25} alt="CoffeCupMg" />;
            default:
                return null;
        }
    };

    // Are They Logged In? 
    NotLiAuthCheck()

    // Getting Their TrainingPlan
    useEffect(() => {
        setLoading(true)
        const checkAuth = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/profile/sleepplan', {
                    method: 'POST',
                    credentials: 'include'  // Include credentials (cookies)
                });
                const data = await response.json();
                setLoading(false)
                setCaffeineInMg(data.caffeine_in_mg)
                setsleepCalculations(data.sleep_calculations)
                setUserSleepplan(data.user_sleepplan)
            } catch (error) {
                console.error('Failed to fetch plan:', error);
            }
        };
        checkAuth();
    }, []);  // Include navigate in dependency array

    return (
        <>
            <SecondaryHeader />
            {loading ? <LoadingScreen /> : (
                <section class="sleeplan_section">

                    {/* <!-- 6th Cykle Sleep desctiption --> */}
                    <article>
                        <aside>

                            <aside>
                                <h2>{ sleepCalculations[3] }</h2>
                                <p>Timmar i sängen <br/> (6 sömncykler)</p>
                            </aside>

                            <div class="line"></div>

                            <div>

                                <aside>
                                    <img src={Night} alt="Moon" />
                                    <div>
                                        <h3>{ sleepCalculations[0] }</h3>
                                        <p>Föreslagen <br/> läggdags</p>
                                    </div>
                                </aside>

                                <div class="line"></div>

                                <aside>
                                    <img src={Sun} alt="sun" />
                                    <div>
                                        <h3>{ sleepCalculations[6] }</h3>
                                        <p>Din <br/> Väckningstid</p>
                                    </div>
                                </aside>

                            </div>

                        </aside>
                    </article>

                    {/* <!-- line --> */}
                    <aside>
                        <div></div>
                        <h4>Alternativ</h4>
                        <div></div>
                    </aside>

                    {/* <!-- 5th Cykle Sleep desctiption --> */}
                    <article>
                        <aside>

                            <aside>
                                <h2>{ sleepCalculations[4] }</h2>
                                <p>Timmar i sängen <br/> (5 sömncykler)</p>
                            </aside>

                            <div class="line"></div>

                            <div>

                                <aside>
                                    <img src={Night} alt="Moon" />
                                    <div>
                                        <h3>{ sleepCalculations[1] }</h3>
                                        <p>Föreslagen <br/> läggdags</p>
                                    </div>
                                </aside>

                                <div class="line"></div>

                                <aside>
                                    <img src={Sun} alt="sun" />
                                    <div>
                                        <h3>{ sleepCalculations[6] }</h3>
                                        <p>Din <br/> Väckningstid</p>
                                    </div>
                                </aside>

                            </div>

                        </aside>
                    </article>

                    {/* <!-- line --> */}
                    <aside>
                        <div></div>
                        <h4>Alternativ</h4>
                        <div></div>
                    </aside>

                    {/* <!-- 4th Cykle Sleep desctiption --> */}
                    <article>
                        <aside>

                            <aside>
                                <h2>{ sleepCalculations[5] }</h2>
                                <p>Timmar i sängen <br/> (4 sömncykler)</p>
                            </aside>

                            <div class="line"></div>

                            <div>

                                <aside>
                                    <img src={Night} alt="Moon" />
                                    <div>
                                        <h3>{ sleepCalculations[2] }</h3>
                                        <p>Föreslagen <br/> läggdags</p>
                                    </div>
                                </aside>

                                <div class="line"></div>

                                <aside>
                                    <img src={Sun} alt="sun" />
                                    <div>
                                        <h3>{ sleepCalculations[6] }</h3>
                                        <p>Din <br/> Väckningstid</p>
                                    </div>
                                </aside>

                            </div>

                        </aside>
                    </article>

                    {/* <!-- line --> */}
                    <aside>
                        <div></div>
                    </aside>

                    {/* <!-- Caffein Limitation --> */}
                    <article>
                        <p>Försök Hålla Dig Till Ca</p>
                        <h2>{ CaffeineInMg } Mg Koffein Per Dag</h2>
                        <div>
                            <aside>
                            {renderCaffeineImages(CaffeineInMg)}
                            </aside>
                            <div class="line"></div>
                            <h3>{ CaffeineInMg / 100 } Koppar Kaffe</h3>
                        </div>
                        <h4 onClick={() => OnOffPopup(ShowPopupCaffeinInMg, setShowPopupCaffeinInMg)}>Att Tänka På</h4>
                    </article>

                    {/* <!-- line --> */}
                    <aside>
                        <div></div>
                    </aside>

                    {/* <!-- Phone in Night Mode Before Sleep --> */}
                    <article>
                        <p>Sätt På Ögonskydd samt låg ljusstyrka</p>
                        <h2>En timme innan läggdags</h2>
                        <img src={LookingAtScreenAtNight} alt="Phone_before_sleep" />
                        <h4 onClick={() => OnOffPopup(ShowPopupOneHourBeforeBedtime, setShowPopupOneHourBeforeBedtime)} >Varför?</h4>
                    </article>

                    {/* <!-- line --> */}
                    <aside>
                        <div></div>
                    </aside>

                    {/* <!-- Fördelar Och Nackdelar --> */}
                    <article>
                        <article>
                            <aside>
                                <img src={GoodSleep} alt="Good_sleep" />
                                <h2>Fördelarna Med Bra Sömn</h2>
                                <h4 onClick={() => OnOffPopup(ShowPopupBenifitsOfGoodSleep, setShowPopupBenifitsOfGoodSleep)} >Visa Alla</h4>
                            </aside>
                            <div class="line"></div>
                            <aside>
                                <img src={Insomnia} alt="Bad_sleep" />
                                <h2>Nackdelarna Med Dålig Sömn</h2>
                                <h4 onClick={() => OnOffPopup(ShowPopupDisadvantagesOfBadSleep, setShowPopupDisadvantagesOfBadSleep)} >Visa Alla</h4>
                            </aside>
                        </article>
                    </article>

                    <Link to='/sleepplan/quiz'>Visa Min Information</Link>

                </section>
            )}
            {/* for popups */}
            { ShowPopupCaffeinInMg ? <PopupCaffein caffeineInMg={CaffeineInMg} setShowPopupCaffeinInMg={setShowPopupCaffeinInMg} ShowPopupCaffeinInMg={ShowPopupCaffeinInMg} /> : ''}
            { ShowPopupOneHourBeforeBedtime ? <OneHourBeforeBedtimePopup setShowPopupOneHourBeforeBedtime={setShowPopupOneHourBeforeBedtime} ShowPopupOneHourBeforeBedtime={ShowPopupOneHourBeforeBedtime} /> : ''}
            { ShowPopupBenifitsOfGoodSleep ? <BenifitsOfGoodSleepPopup setShowPopupBenifitsOfGoodSleep={setShowPopupBenifitsOfGoodSleep} ShowPopupBenifitsOfGoodSleep={ShowPopupBenifitsOfGoodSleep} /> : ''}
            { ShowPopupDisadvantagesOfBadSleep ? <DisadvantagesOfBadSleepPopup setShowPopupDisadvantagesOfBadSleep={setShowPopupDisadvantagesOfBadSleep} ShowPopupDisadvantagesOfBadSleep={ShowPopupDisadvantagesOfBadSleep} /> : ''}
        </>
    );
}

export default SleepPlan;