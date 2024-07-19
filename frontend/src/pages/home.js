import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Importing CSS
import '../styles/home.css';

// Importing Images
import Logo from '../images/logo.png'
import Lock from '../images/icons/safety.png'
import HeroImg from '../images/holdingPhonePlan.png'
import TimeIcon from '../images/icons/timeIcon.png'
import CheckMark from '../images/icons/checkmark.png'
import MuscleMan from '../images/icons/muscleman.png'
import CheckmarkGreen from '../images/icons/checkde-checkmark.png'
import GreenStar from '../images/icons/star-green.png'
import LaptopTrainingplan from '../images/laptopTrainingplan.png'
import LaptopSleepplan from '../images/laptopSleepplan.png'
import LaptopKostplan from '../images/laptopKostplan.png'
import pictureFromTheQuiz from '../images/pictureFromTheQuiz.png'
import analyze from '../images/icons/analyze.png'
import runningOnTreadmilIcon from '../images/icons/runningOnTreadmilIcon.png'
import HealthyAndStrongIcon from '../images/icons/healthyAndStrongIcon.png'
import GoalIcon from '../images/icons/GoalIcon.png'
import RolemodelIcon from '../images/icons/rolemodelIcon.png'
import sad from '../images/icons/sad.png'

function Hero() {
    return (
        <section className='HomepageHeroSection'>
            <article>
                <img src={Logo} alt='Logo' />
                <h3>Vill du forma din drömkropp och imponera på dig själv i spegeln?</h3>
                <h1>Få ditt personliga “scandi hälsopaket” på 60 sekunder och uppnå dina mål upp till 90% snabbare utan att slösa tid på planering!</h1>
                <p>Få en specialgjord plan för att nå dina mål snabbt – oavsett om du vill gå ner i vikt, bygga muskler eller förbättra din hälsa. <span>Allt på bara 60 sekunder och helt gratis!</span></p>
                <div>
                    <Link to='/signup' className='btn'>Ja, ge mig mitt hälso paket <br/> <span>Helt Gratis!!</span></Link>
                    <p className='reassurance' > <img src={Lock} alt='Lock' /> 100% Privat, Inga kreditkort behövs</p>
                </div>
            </article>
            <aside>
                <img src={HeroImg} alt='Holding Phone'/>
            </aside>
        </section>
    )
}

function Line() {
    return (
        <div className='HomeLineDesign'></div>
    )
}

function ThreeBenifits() {
    return (
        <>
            <Line />
            <section className='ThreeBenifitsSection'>
                <article>
                    <img src={TimeIcon} alt='icon' />
                    <h3>Få ditt personliga hälsopaket på 60s</h3>
                </article>
                <article>
                    <img src={CheckMark} alt='icon' />
                    <h3>Steg-för-steg planer för att nå dina träningmål</h3>
                </article>
                <article>
                    <img src={MuscleMan} alt='icon' />
                    <h3>Anpassat efter dina mål</h3>
                </article>
            </section>
            <Line />
        </>
    )
}

function DoYouTrainHardWithoutSeeingResults() {
    return (
        <section className='DoYouTrainHardWithoutSeeingResults'>
            <img src={sad} alt='Sad Icon' />
            <aside>
                <h2>Tränar du hårt utan att se resultat?</h2>
                <p>Du är inte ensam. <span>Tänk på alla gånger du har slitit på gymmet, följt strikta dieter och ändå inte nått dina träningsmål.</span></p>
                <p><span>Frustrationen när du ser dig i spegeln och inget förändras, trots regelbunden träning.</span></p>
                <p>Besvikelsen över att <span>vågen visar samma siffra varje vecka, trots ändrad kost.</span></p>
                <p>Tröttheten när du <span>vaknar utan tillräcklig sömn,</span> som påverkar din träning och energi.</p>
                <p><span>Känslan av hopplöshet när du inser att all din ansträngning kanske aldrig kommer att ge dig de resultat du drömmer om.</span></p>
            </aside>
        </section>
    )
}

function WhatIfYouHadAPlanThatActuallyWorks() {
    return (
        <section className='WhatIfYouHadAPlanThatActuallyWorks'>
            <h2>Tänk om du hade en plan som verkligen fungerar?</h2>
            <p>Tänk dig en vardag utan att undra om ditt träningspass var meningslöst, om din diet är rätt, eller om du får tillräckligt med vila</p>
        </section>
    )
}

function ScandifitHealthPackage() {
    return (
        <section className='ScandifitHealthPackage'>
            
            <div>
                <h3>introducerar steg för steg lösningen</h3>
                <h2>Scandi Hälsopaketet</h2>
                <p>Vi har utvecklat en helhetslösning som är personligt anpassad för dig och garanterar att du når dina träningsmål snabbare och enklare.</p>
            </div>

            <article>
                <h2>"Få Ditt 60-sekunders 'Scandi schema' och nå träningsmål 80-90% snabbare!"</h2>
                <h3>Total värde: 499kr</h3>
                <img src={LaptopTrainingplan} alt='Trainingplan On Laptop' />
                <ul>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Få en träningsplan som är anpassat till dina mål</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Träna direkt med din träningsplan och spara tid och energi</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Nå dina träningsmål snabbare och enklare</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Anpassat för din kropp, varje övning och träningspass är utformade för just dig</li>
                </ul>
            </article>

            <div className='PlusDiv' ><h2>+</h2></div>

            <article>
                <h2>"Få en personlig 'Scandi kostplan' som maximerar din energi och muskelutveckling! - under 60 sekunder"</h2>
                <h3>Total värde: 249kr</h3>
                <img src={LaptopKostplan} alt='Kostplan On Laptop' />
                <ul>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> kostplan som visar hur mycket mat och vatten du behöver för att nå dina träningsmål</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Följ din plan och slipp oroa dig för vad du ska äta. Spara tid på måltidsplanering</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Ät rätt så du får mer energi och blir starkare, vilket hjälper dig att nå dina hälsomål snabbare</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Planen är anpassad för att passa just dig och din livsstil, vilket gör det lättare att äta rätt och må bra</li>
                </ul>
            </article>

            <div className='PlusDiv' ><h2>+</h2></div>

            <article>
                <h2>"Sov bättre och nå dina träningsmål snabbare med 'Scandi Sömnplan'! - under 60 sekunder"</h2>
                <h3>Total värde: 249kr</h3>
                <img src={LaptopSleepplan} alt='Sleepplan On Laptop' />
                <ul>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Få de bästa tiderna att sova och vakna för maximal prestation och energi</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Hjälper dig nå dina träningsmål med rätt sömn</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Få mer energi och minska risken för skador med bättre sömn</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Enkel plan som passar din livsstil och förbättrar din hälsa</li>
                </ul>
            </article>

            <div className='LineDiv'><div className='Line' ></div></div>

            <h3>Total värde: 997kr</h3>
            <h4>Få ditt scandi hälso paket idag</h4>
            <h2><span>Gratis</span> För De Första 5000 Användarna</h2>
            <p>Nuvarande Användare: 2457</p>
            <Link to='' className='getHealthPackageBtn' >Ja, ge mig mitt hälso paket <br/> <span>Helt Gratis!!</span></Link>


        </section>
    )
}

function HowDoesTheScandifitHealthPackageWork() {
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

function BenifitsThatYouMightExpect() {
    return (
        <section className='ThreeBenifitsSection'>
            <article>
                <img src={HealthyAndStrongIcon} alt='icon' />
                <h2>Frisk & Stark</h2>
                <h3>Känn styrkan i kroppen och orka med allt du vill göra</h3>
            </article>
            <article>
                <img src={RolemodelIcon} alt='icon' />
                <h2>Förebild För Hälsa</h2>
                <h3>Du insperar och blir en förebild för din familj och vänner</h3>
            </article>
            <article>
                <img src={GoalIcon} alt='icon' />
                <h2>Nå Dina Träningsmål</h2>
                <h3>Äntligen kan du se dina drömresultat i spegeln</h3>
            </article>
        </section>
    )
}

function HomeTestemonial() {

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

function HomeUrgency() {
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

function HomeSammanfattning() {
    return (
        <section className='HomeSammanfattning'>
            <p>Sammanfattning</p>
            <h2>Här Är Vad Du Får Gratis</h2>
            <article>
                <img src={Logo} />
                <ul>
                    <li>Anpassad Träningsplan <span>Värde 499 kr</span></li>
                    <li>Anpassad Kostplan <span>Värde 249 kr</span></li>
                    <li>Anpassad Sömnplan <span>Värde 249 kr</span></li>
                </ul>
                <h2>Total Värde: 997kr</h2>
                <h3>Idag: Helt Gratis</h3>
                <div>
                    <Link to='/signup' className='btn'>Ja, ge mig mitt hälso paket <br/> <span>Helt Gratis!!</span></Link>
                    <p>Denna produkt är digital, vilket innebär att du får tillgång omedelbart!</p>
                </div>
            </article>
        </section>
    )
}

function HomeEachFAQ({ question, answer }) {

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

function HomeFAQ() {

    const [openFaqBtn, setOpenFaqBtn] = useState(false)

    return (
        <section className='HomePageFAQ'>
            <h2>Vanliga Frågor</h2>
            <article>
                <HomeEachFAQ question='Vad ingår i Scandi Hälsopaketet?' answer='Scandi Hälsopaketet erbjuder en integrerad lösning för din hälsa med en anpassad kostplan för att optimera din energi och uppnå dina specifika mål, oavsett om det är viktnedgång, muskeluppbyggnad eller allmän hälsaförbättring. Det inkluderar även en anpassad träningsplan för hemma- eller gymträning som effektiviserar dina träningsinsatser. Dessutom får du en individuell sömnplan med praktiska tips för att förbättra din sömnkvalitet, vilket är avgörande för energinivåer och återhämtning.' />
                <HomeEachFAQ question='Hur snabbt kan jag förvänta mig resultat?' answer='Många användare ser förbättringar inom några veckor. Om du följer planen noggrant och regelbundet kan du förvänta dig tydliga resultat inom 4-8 veckor.' />
                <HomeEachFAQ question='Är Scandi Hälsopaketet verkligen gratis? Finns det några dolda kostnader?' answer='Ja, Scandi Hälsopaketet är helt gratis. Det finns inga dolda kostnader eller extra avgifter. Du får tillgång till hela paketet utan att behöva betala något.' />
                <HomeEachFAQ question='Hur skiljer sig Scandi Hälsopaketet från andra hälsopaket eller träningsprogram?' answer='Scandi Hälsopaketet täcker alla aspekter som behövs för att nå dina träningsmål: träning, kost och sömn. Många andra program fokuserar bara på en av dessa delar, men vårt paket ger dig en komplett plan som är anpassad efter dina personliga behov och mål.' />
                <HomeEachFAQ question='Hur kan Scandi Hälsopaketet hjälpa mig att nå mina hälsomål?' answer='Scandi Hälsopaketet hjälper dig att nå dina hälsomål genom att erbjuda en personlig plan för träning, kost och sömn. Vi ger dig alla tre delar som behövs för att nå dina träningsmål, och de är personligt anpassade efter dina behov och mål. Detta gör det lättare för dig att följa planen och uppnå bästa möjliga resultat på ett effektivt och hållbart sätt.' />
                <HomeEachFAQ question='Kan jag kombinera Scandi Hälsopaketet med andra träningsprogram eller kosttillskott?' answer='Ja, du kan kombinera Scandi Hälsopaketet med andra träningsprogram eller kosttillskott. Våra planer är flexibla och kan komplettera andra metoder du använder.' />
            </article>
        </section>
    )
}

function Home() {

    const navigate = useNavigate();

    // 50 / 50 Chance
    useEffect(() => {
        if (Math.random() < 0.5) {
            navigate('/'); // 50% chance to go to root
        } 
    }, [navigate]);

    return (
        <>
            <Hero />
            <ThreeBenifits />
            <DoYouTrainHardWithoutSeeingResults />
            <Line />
            <WhatIfYouHadAPlanThatActuallyWorks />
            <Line />
            <ScandifitHealthPackage /> 
            <Line />

            <HowDoesTheScandifitHealthPackageWork />
            <Line />
            <BenifitsThatYouMightExpect />
            <HomeTestemonial />
            <HomeUrgency />
            <Line />

            <HomeSammanfattning />
            <Line />
            <HomeFAQ />
        </>
    );
}

export default Home;