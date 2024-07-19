import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Importing CSS
import '../styles/homePage.css';

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

function HeroSection() {
    return (
        <section className='HeroSection'>
            <article>
                <h2>Helt Gratis!</h2>
                <h1>Vill du uppnå dina träningsmål snabbare?</h1>
                <p>Upptäck hemligheten bakom “Scandi Hälsopaketet” som ger dig resultat du inte trodde var möjligt!</p>
            </article>
            <div>
                <Link to='/trainingplan/quiz' className='btn'>Börja Nu!</Link>
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
                    <p>Få bättre sömn, Vakna pigg varje morgon för att <span>maximera din träning och nå dina mål snabbare.</span></p>
                    <h4>Ord: 249 Kr</h4>
                </aside>
                <div className='line'></div>
                <aside>
                    <img src={LaptopTrainingplan} alt='HealthPackage On Laptop' />
                    <h3>Träningsplan</h3>
                    <p>Anpassad träningsplan som kommer hjälpa dig <span>nå dina träningsmål snabbare och enklare.</span></p>
                    <h4>Ord: 499 Kr</h4>
                </aside>
                <div className='line'></div>
                <aside>
                    <img src={LaptopKostplan} alt='HealthPackage On Laptop' />
                    <h3>Kostplan</h3>
                    <p>En anpassad kostplan som accelererar resan mot din <span>drömkropp</span></p>
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

    const [showOtherTestimonials, setShowOtherTestimonials] = useState(false)

    const styles = {
        roundBtn: {
            backgroundColor: '#50C878'
        },
        noStyle: {}
    };

    return (
        <section className='HomePageTestemonial'>
            <div className='line'></div>
            <article>
                <h2>Vad våra användare säger</h2>
                <aside>

                    <div className={ showOtherTestimonials ? 'threeFirstTestemonials' : 'threeFirstTestemonials show'}>
                        <aside>
                            <h3>Robert</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Det är ett bra schema! borde ha gjort ett för länge sedan 😃</p>
                    </div>

                    <div className={ showOtherTestimonials ? 'threeFirstTestemonials' : 'threeFirstTestemonials show'}>
                        <aside>
                            <h3>Rayan</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Älskar träningsprogrammet, men det skulle vara bra om ni lade till en offlineversion</p>
                    </div>

                    <div className={ showOtherTestimonials ? 'threeFirstTestemonials' : 'threeFirstTestemonials show'}>
                        <aside>
                            <h3>Chee</h3>
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

                    <div className={ showOtherTestimonials ? 'threeSecondTestemonials show' : 'threeSecondTestemonials'}>
                        <aside>
                            <h3>Hyrum</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Det första programmet som fick mig att komma igång eftersom det gav mig allt jag behövde för att komma igång</p>
                    </div>

                    <div className={ showOtherTestimonials ? 'threeSecondTestemonials show' : 'threeSecondTestemonials'}>
                        <aside>
                            <h3>Robin</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Trevligt program, fungerar bra, och innehåller en bra, genomtänkt uppsättning av övningar</p>
                    </div>

                    <div className={ showOtherTestimonials ? 'threeSecondTestemonials show' : 'threeSecondTestemonials'}>
                        <aside>
                            <h3>Ahmad</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Jag provade programmet i en vecka, Rekommenderar starkt för alla att prova</p>
                    </div>

                </aside>

                <div>
                    <div onClick={() => setShowOtherTestimonials(!showOtherTestimonials)}>⇦</div>
                    <article>
                        <div style={showOtherTestimonials ? styles.noStyle : styles.roundBtn}></div>
                        <div style={showOtherTestimonials ? styles.roundBtn : styles.noStyle}></div>
                    </article>
                    <div onClick={() => setShowOtherTestimonials(!showOtherTestimonials)}>⇨</div>
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
            <Link to='/trainingplan/quiz' className='btn'>Börja Nu!</Link>
            <p className='reassurance'>🔒 100% Privat, Inga kreditkort behövs</p>
        </section>
    )
}

function EachFAQ({ question, answer }) {

    const [openFaqBtn, setOpenFaqBtn] = useState(false)

    return (
        <>
            <div className='EachFaqQuestion' onClick={() => setOpenFaqBtn(!openFaqBtn)}>
                <aside>
                    <h3>{question}</h3>
                    <h3>{ openFaqBtn ? '-' : '+' }</h3>
                </aside>
                <div className={ openFaqBtn ? 'EachFaqAnswer open' : 'EachFaqAnswer' }>
                    <p>{answer}</p>
                </div>
            </div>
        </>
    )
}

function HomePageLine() {
    return (
        <div className='HomePageline'></div>
    )
}

function HomePageFAQ() {

    const [openFaqBtn, setOpenFaqBtn] = useState(false)

    return (
        <section className='HomePageFAQ'>
            <h2>Vanliga Frågor</h2>
            <article>
                <EachFAQ question='Vad ingår i Scandi Hälsopaketet?' answer='Scandi Hälsopaketet erbjuder en integrerad lösning för din hälsa med en anpassad kostplan för att optimera din energi och uppnå dina specifika mål, oavsett om det är viktnedgång, muskeluppbyggnad eller allmän hälsaförbättring. Det inkluderar även en anpassad träningsplan för hemma- eller gymträning som effektiviserar dina träningsinsatser. Dessutom får du en individuell sömnplan med praktiska tips för att förbättra din sömnkvalitet, vilket är avgörande för energinivåer och återhämtning.' />
                <EachFAQ question='Hur snabbt kan jag förvänta mig resultat?' answer='Många användare ser förbättringar inom några veckor. Om du följer planen noggrant och regelbundet kan du förvänta dig tydliga resultat inom 4-8 veckor.' />
                <EachFAQ question='Är Scandi Hälsopaketet verkligen gratis? Finns det några dolda kostnader?' answer='Ja, Scandi Hälsopaketet är helt gratis. Det finns inga dolda kostnader eller extra avgifter. Du får tillgång till hela paketet utan att behöva betala något.' />
                <EachFAQ question='Hur skiljer sig Scandi Hälsopaketet från andra hälsopaket eller träningsprogram?' answer='Scandi Hälsopaketet täcker alla aspekter som behövs för att nå dina träningsmål: träning, kost och sömn. Många andra program fokuserar bara på en av dessa delar, men vårt paket ger dig en komplett plan som är anpassad efter dina personliga behov och mål.' />
                <EachFAQ question='Hur kan Scandi Hälsopaketet hjälpa mig att nå mina hälsomål?' answer='Scandi Hälsopaketet hjälper dig att nå dina hälsomål genom att erbjuda en personlig plan för träning, kost och sömn. Vi ger dig alla tre delar som behövs för att nå dina träningsmål, och de är personligt anpassade efter dina behov och mål. Detta gör det lättare för dig att följa planen och uppnå bästa möjliga resultat på ett effektivt och hållbart sätt.' />
                <EachFAQ question='Kan jag kombinera Scandi Hälsopaketet med andra träningsprogram eller kosttillskott?' answer='Ja, du kan kombinera Scandi Hälsopaketet med andra träningsprogram eller kosttillskott. Våra planer är flexibla och kan komplettera andra metoder du använder.' />
            </article>
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
            <HomePageLine />
            <HomePageFAQ />
        </>
    );
}

export default HomePage;