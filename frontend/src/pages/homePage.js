import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Importing CSS
import '../styles/homePage.css';

// Import Loading Screen
import Loading from '../components/loadingScreenFullScreen.js';

// Importing Images
import Lock from '../images/icons/safety.png'
import LaptopTrainingplan from '../images/laptopTrainingplan.png'
import LaptopSleepplan from '../images/laptopSleepplan.png'
import LaptopKostplan from '../images/laptopKostplan.png'
import HoldingPhone from '../images/holdingPhonePlan.png'
import pictureFromTheQuiz from '../images/pictureFromTheQuiz.png'
import analyze from '../images/icons/analyze.png'
import runningOnTreadmilIcon from '../images/icons/runningOnTreadmilIcon.png'
import GreenStar from '../images/icons/star-green.png'

import LoadingScreenFullScreen from '../components/loadingScreenFullScreen.js';
import SleepPlan from './plans/sleepPlan.js';

function HeroSection() {
    return (
        <section className='HeroSection'>
            <article>
                <h2>Helt Gratis!</h2>
                <h1>Förvandla Din Hälsa</h1>
                <p>Var en av de första 5000 att få vårt exklusiva hälsopaket utan kostnad.</p>
            </article>
            <div>
                <Link to='/signup' className='btn'>Börja Nu!</Link>
                <div>
                    {/* <img src={Lock} alt='Lock' /> */}
                    <p className='reassurance'>🔒 100% Privat, Inga kreditkort behövs</p>
                </div>
            </div>
            <aside>
                <img src={HoldingPhone} alt='HoldingPhone' />
            </aside>
        </section>
    )
}

function HealthPackageContains() {
    return (
        <section className='HealthPackageContains'>
            <div className='line'></div>
            <h2>Hälsopaket Innehåll</h2>
            <article>
                <aside>
                    <img src={LaptopSleepplan} alt='HealthPackage On Laptop' />
                    <h3>Sömnplan</h3>
                    <p>Optimera din sömn för att vakna upp utvilad och återställd varje morgon.</p>
                    <h4>Ord: 249 Kr</h4>
                </aside>
                <div className='line'></div>
                <aside>
                    <img src={LaptopTrainingplan} alt='HealthPackage On Laptop' />
                    <h3>Träningsplan</h3>
                    <p>Anpassade träningsrutiner som förbättrar både styrka och välmående.</p>
                    <h4>Ord: 499 Kr</h4>
                </aside>
                <div className='line'></div>
                <aside>
                    <img src={LaptopKostplan} alt='HealthPackage On Laptop' />
                    <h3>Kostplan</h3>
                    <p>Personliga kostplaner som boostar din energi och hälsa.</p>
                    <h4>Ord: 249 Kr</h4>
                </aside>
            </article>
            <div className='line'></div>
        </section>
    )
}

function StepByStepVisualization() {
    return (
        <section className='StepByStepVisualization'>
            <h2>Din väg till bättre hälsa</h2>
            <p>Steg För Steg</p>
            <article>
                <aside>
                    <div>
                        <img src={pictureFromTheQuiz} alt='Picture From Quiz' />
                        <aside>
                            <h3>Ta Vårt 60-sekunders Quiz</h3>
                            <p>Börja med vårt 60-sekunders quiz där vi frågar om din träningsnivå, dina mål och din livsstil för att förstå dina behov bättre.</p>
                        </aside>
                    </div>
                    <div className='remove'></div>
                    <div className='line'></div>
                    <div className='analyzeDiv' >
                        <img src={analyze} alt='analyze' />
                        <aside>
                            <h3>Analyserar Dina Svar</h3>
                            <p>När du har slutfört en quiz analyserar vårt system dina svar noggrant för att skapa en plan som passar just dina behov.</p>
                        </aside>
                    </div>
                    <div className='line'></div>
                    <div>
                        <img src={runningOnTreadmilIcon} alt='Running on treadmil icon' />
                        <aside>
                            <h3>Börja Följa planen</h3>
                            <p>Börja följa din vårt hälsopaket och upplev hur effektiv och motiverande en anpassad plan kan vara. Vi finns här för att stödja dig varje steg på vägen.</p>
                        </aside>
                    </div>
                </aside>
                <div className='line'></div>
                <aside>
                    <div className='remove'></div>
                    <div className='remove'>
                        <img src={analyze} alt='analyze' />
                        <aside>
                            <h3>Analyserar Dina Svar</h3>
                            <p>När du har slutfört en quiz analyserar vårt system dina svar noggrant för att skapa en plan som passar just dina behov.</p>
                        </aside>
                    </div>
                    <div className='remove'></div>
                </aside>
            </article>
        </section>
    )
}

function HomePageTestemonial() {
    return (
        <section className='HomePageTestemonial'>
            <div className='line'></div>
            <article>
                <h2>Vad våra användare säger</h2>
                <aside>

                    <div>
                        <aside>
                            <h3>Reyan Doski</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Detta är ett riktigt bra program som har hjälpt mig att gå ner 2 kg på en vecka</p>
                    </div>

                    <div>
                        <aside>
                            <h3>Reyan Doski</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Detta är ett riktigt bra program som har hjälpt mig att gå ner 2 kg på en vecka</p>
                    </div>

                    <div>
                        <aside>
                            <h3>Reyan Doski</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Detta är ett riktigt bra program som har hjälpt mig att gå ner 2 kg på en vecka</p>
                    </div>

                </aside>

                <div>
                    <div>⇦</div>
                    <article>
                        <div></div>
                        <div></div>
                    </article>
                    <div>⇨</div>
                </div>

            </article>
            <div className='line'></div>
        </section>
    )
}

function Urgency() {
    return (
        <section className='urgency'>
            <h2>Specialerbjudande</h2>
            <p>Häslopaket Ordinarie Pris: 997 Kr</p>
            <h3>Gratis för de första 5000 användarna!</h3>
            <h4>Nuvarande: 2489 Användare</h4>
            <Link to='/signup' className='btn'>Börja Nu!</Link>
            <p className='reassurance'>🔒 100% Privat, Inga kreditkort behövs</p>
        </section>
    )
}

function HomePage() {

    return (
        <>
            <HeroSection />
            <HealthPackageContains />
            <StepByStepVisualization />
            <HomePageTestemonial />
            <Urgency />
        </>
    );
}

export default HomePage;