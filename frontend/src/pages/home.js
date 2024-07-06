import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Importing CSS
import '../styles/home.css';

// Import Loading Screen
import Loading from '../components/loadingScreenFullScreen.js';

// Importing Images
import Logo from '../images/logo.png'
import Lock from '../images/icons/safety.png'
import HeroImg from '../images/holdingphone.png'
import TimeIcon from '../images/icons/timeIcon.png'
import CheckMark from '../images/icons/checkmark.png'
import MuscleMan from '../images/icons/muscleman.png'
import CheckmarkGreen from '../images/icons/checkde-checkmark.png'
import HealthPackage from '../images/icons/healthPackage.png'
import GreenStar from '../images/icons/star-green.png'
import EmptyProfilePicture from '../images/icons/emptyProfilePicture.png'
import Exhausted from '../images/icons/exhausted.png'
import LaptopTrainingplan from '../images/laptopTrainingplan.png'
import LaptopSleepplan from '../images/laptopSleepplan.png'
import LaptopKostplan from '../images/laptopKostplan.png'
import pictureFromTheQuiz from '../images/pictureFromTheQuiz.png'
import trainingSchedualIcon from '../images/icons/trainingSchedualIcon.png'
import analyze from '../images/icons/analyze.png'
import runningOnTreadmilIcon from '../images/icons/runningOnTreadmilIcon.png'
import HealthyAndStrongIcon from '../images/icons/healthyAndStrongIcon.png'
import GoalIcon from '../images/icons/GoalIcon.png'
import RolemodelIcon from '../images/icons/rolemodelIcon.png'
import HandshakeIcon from '../images/icons/handshakeIcon.png'



import postnord from '../images/postnord.png';
import LoadingScreenFullScreen from '../components/loadingScreenFullScreen.js';

function Hero() {
    return (
        <section className='HomepageHeroSection'>
            <article>
                <img src={Logo} alt='Logo' />
                <h3>Vill du forma din drömkropp och imponera på dig själv i spegeln?</h3>
                <h1>Hur Snabbt Kan Du Förändra Din Hälsa? Testa Scandifits Hälsopaket Helt Gratis!</h1>
                <p>Scandi Hälsopaket:Din Kompletta Plan För Kost, Träning och Sömn Få en specialgjord plan som hjälper dig nå dina mål snabbt – oavsett om du vill gå ner i vikt, bygga muskler eller förbättra din allmänna hälsa. <span>Allt på bara 60 sekunder och helt gratis!</span></p>
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

function ThreeBenifits() {
    return (
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
    )
}

function ProblemWithAchivingGoal() {
    return (
        <section className='ProblemWithAchivingGoalSection'>
            <p className='subheader'>Har Du Problem med Att Nå Dina Hälsomål?</p>
            <h2>Krossa Dina Hinder och Uppnå Dina Träningsmål en Gång för Alla</h2>
            <article className='articleQuestions'>
                <div>
                    <img src={CheckmarkGreen} alt='Checkmark' />
                    <p>Har du försökt passa in träning i din dag, men misslyckats på grund av brist på tid och en tydlig plan?</p>
                </div>
                <div>
                    <img src={CheckmarkGreen} alt='Checkmark' />
                    <p>Har du försökt passa in träning i din dag, men misslyckats på grund av brist på tid och en tydlig plan?</p>
                </div>
                <div>
                    <img src={CheckmarkGreen} alt='Checkmark' />
                    <p>Har du försökt passa in träning i din dag, men misslyckats på grund av brist på tid och en tydlig plan?</p>
                </div>
                <div>
                    <img src={CheckmarkGreen} alt='Checkmark' />
                    <p>Har du försökt passa in träning i din dag, men misslyckats på grund av brist på tid och en tydlig plan?</p>
                </div>
                <div>
                    <img src={CheckmarkGreen} alt='Checkmark' />
                    <p>Har du försökt passa in träning i din dag, men misslyckats på grund av brist på tid och en tydlig plan?</p>
                </div>
                <div>
                    <img src={CheckmarkGreen} alt='Checkmark' />
                    <p>Har du försökt passa in träning i din dag, men misslyckats på grund av brist på tid och en tydlig plan?</p>
                </div>
            </article>
            <h2>Om något av detta låter bekant för dig, då är detta Scandi Hälsopaket perfekt för dig...</h2>
            <article className='getPackageHere'>
                <img src={HealthPackage} alt='healthPackage' />
                <aside>
                    <h3>Få din personliga hälsopaket här!</h3>
                    <p>Om du är trött på att inte nå dina hälsomål? Då kommer denna plan att guida dig steg för steg om hur du kan förbättra din hälsa steg för steg.</p>
                    <Link to='' className='getHealthPackageBtn' >Ja, ge mig mitt hälso paket <br/> <span>Helt Gratis!!</span></Link>
                </aside>
            </article>
            <article className='WhatIsScandifitHealthPackage' > 
                <h3>Vad Är "Scandi Hälsopaket"?</h3>
                <h2>Den Ultimata Guiden Till Dina Träningsmål</h2>
                <p>Scandi Hälsopaketet är en enkel steg-för-steg-plan som hjälper dig att nå dina träningsmål snabbare och enklare. Den här guiden ger dig allt du behöver för att äta rätt, träna och sova bra.</p>
                <p>Scandi Hälsopaketet har hjälpt massor av människor att nå sina träningsmål och bli hälsosammare. Med det här paketet har:</p>
                <ul>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Över 10,000 personer gått ner i vikt och blivit starkare</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Mer än 20,000 personer fått mer energi och mått bättre</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Många nöjda kunder sagt att det funkar jättebra</li>
                </ul>
            </article>
        </section>
    )
}

function AllPartsAreNeededForSuccess() {
    return (
        <section className='allPartsAreNeededForSuccess'>

            <h3>Du Behöver Alla Delar För Att Lyckas Med Dina Träningsmål, Inte Bara En</h3>
            <h2>Implementera Dessa Och Förvandla Din Känsla Från "meh" Till "wow" När Du Ser Dig Själv I Spegeln! </h2>

            <article className='ThreePlansArticle'>

                <div>
                    <h4>Skräddarsydd</h4>
                    <h3>Träningsplan</h3>
                    <p>För att nå dina träningsmål på bästa sätt är det viktigt med ett personligt anpassat träningschema. Det innebär att varje  träning är specifikt utformad för att hjälpa dig att effektivt nå dina mål, vilket sparar tid och undviker ineffektiva övningar.</p>
                </div>

                <div>
                    <h4>Skräddarsydd</h4>
                    <h3>Kostplan</h3>
                    <p>En personlig kostplan är nödvändig för att ge din kropp rätt  näring för återhämtning och energi under träning. Utan den  kan du missa viktiga näringsämnen som behövs för att maximera dina träningsresultat och prestation.</p>
                </div>

                <div>
                    <h4>Skräddarsydd</h4>
                    <h3>Sömnplan</h3>
                    <p>En personlig sömnplan är avgörande för att ge din kropp den vila den behöver för återhämtning och prestation. Utan en sådan plan kan du missa viktiga vilotimmar som är nödvändiga för att maximera dina träningsresultat och energinivåer.</p>
                </div>

            </article>

            <Link to='/thelink' className='getHealthPackageBtn'>Ja, ge mig mitt hälso paket <br/> <span>Helt Gratis!!</span></Link>

            <article className='Testemonial' >
                <img src={EmptyProfilePicture} alt='ProfilePicture' />
                <aside>
                    <h2>"FANTASTISKT RESULTAT!"</h2>
                    <div>
                        <img src={GreenStar} alt='star' />
                        <img src={GreenStar} alt='star' />
                        <img src={GreenStar} alt='star' />
                        <img src={GreenStar} alt='star' />
                        <img src={GreenStar} alt='star' />
                    </div>
                    <p>"Scandi Hälsopaketet har förändrat mitt liv. Den personliga träningsplanen, kostplanen och sömnplanen är de bästa jag någonsin har använt. Tack vare Scandi Hälsopaketet har jag nått mina träningsmål mycket snabbare än jag trodde var möjligt. Jag har gått ner 10 kg, byggt upp muskler och känner mig starkare och friskare än någonsin. Jag rekommenderar det varmt till alla som vill ta sin hälsa till nästa nivå." - Sara Lindström</p>
                </aside>
            </article>

            <article className='TrainingHardWithoutResult' >
                <img src={Exhausted} alt='Exhausted' />
                <div>
                    <h2>Tränar Du Hårt Utan Att Se Resultat?</h2>
                    <p>Du är inte ensam. Tänk på alla gånger du har slitit på gymmet, följt strikta dieter och ändå inte nått dina träningsmål. Det känns som att kasta bort din tid och energi. <span>Frustrerande, eller hur?</span></p>
                    <p><span>Har du någonsin känt så här?</span> Frustrationen när du ser i spegeln och inget förändras, trots regelbunden träning. Besvikelsen över att vågen visar samma siffra varje vecka, trots ändrad kost.</p>
                    <p><span>Tröttheten när du vaknar utan tillräcklig sömn</span>, som påverkar din träning och energi. Känslan av hopplöshet när du inser att all tid och energi kanske aldrig leder till de resultat du drömmer om.</p>
                </div>
            </article>
            
            <div className='WhatIfYouHadaPlanThatWorked'>
                <h2>Vad om du kunde ha en plan som faktiskt fungerar för just dig?</h2>
                <p><span>Tänk dig en vardag utan att undra om ditt träningspass var meningslöst, om din diet är rätt, eller om du får tillräckligt med vila.</span> Vi förstår hur hopplöst det kan kännas att försöka och försöka utan att se de resultat du vill ha.</p>
                <p><span>Men tänk om allt kunde förändras?</span></p>
                <p>Vi har utvecklat en helhetslösning som är personligt anpassad för dig och garanterar att du når dina träningsmål snabbare och enklare.</p>
            </div>
            
        </section>
        
    )
}

function ScandifitHealthPackage() {
    return (
        <section className='ScandifitHealthPackage'>

            <article>
                <h2>"Få Ditt 60-sekunders 'Scandi schema' och nå träningsmål 80-90% snabbare!"</h2>
                <h3>Total värde: 499kr</h3>
                <img src={LaptopTrainingplan} alt='Trainingplan On Laptop' />
                <ul>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Med Scandi Schema bestämmer du hur du vill träna, hemma eller på gymmet.</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Slipper tänka ut träningsplaner varje gång – börja träna direkt och spara tid.</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Tydliga mål och snabba resultat ger motivation att fortsätta träna hårt.</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Anpassat för din kropp, gör varje träningspass effektivt och skräddarsytt.</li>
                </ul>
            </article>

            <div className='PlusDiv' ><h2>+</h2></div>

            <article>
                <h2>"Få en personlig 'Scandi kostplan' som maximerar din energi och muskelutveckling! - under 60 sekunder"</h2>
                <h3>Total värde: 249kr</h3>
                <img src={LaptopKostplan} alt='Kostplan On Laptop' />
                <ul>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Med Scandi Schema bestämmer du hur du vill träna, hemma eller på gymmet.</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Slipper tänka ut träningsplaner varje gång – börja träna direkt och spara tid.</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Tydliga mål och snabba resultat ger motivation att fortsätta träna hårt.</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Anpassat för din kropp, gör varje träningspass effektivt och skräddarsytt.</li>
                </ul>
            </article>

            <div className='PlusDiv' ><h2>+</h2></div>

            <article>
                <h2>"Sov bättre och nå dina träningsmål snabbare med 'Scandi Sömnplan'! - under 60 sekunder"</h2>
                <h3>Total värde: 249kr</h3>
                <img src={LaptopSleepplan} alt='Sleepplan On Laptop' />
                <ul>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Med Scandi Schema bestämmer du hur du vill träna, hemma eller på gymmet.</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Slipper tänka ut träningsplaner varje gång – börja träna direkt och spara tid.</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Tydliga mål och snabba resultat ger motivation att fortsätta träna hårt.</li>
                    <li><img src={CheckmarkGreen} alt='Checkmark' /> Anpassat för din kropp, gör varje träningspass effektivt och skräddarsytt.</li>
                </ul>
            </article>

            <div className='LineDiv'><div className='Line' ></div></div>

            <h3>Total värde: 997kr</h3>
            <h4>Få din scandi hälso paket idag</h4>
            <h2><span>Gratis</span> För De Första 5000 Användarna</h2>
            <p>Nuvarande Användare: 2457</p>
            <Link to='' className='getHealthPackageBtn' >Ja, ge mig mitt hälso paket <br/> <span>Helt Gratis!!</span></Link>


        </section>
    )
}

function HowDoesTheScandifitHealthPackageWork() {
    return (
        <section className='howDoesTheScandifitHealthPackageWork'>
            <h2>Hur Ditt “Scandi Hälsopaket” Fungerar</h2>
            <article>
                <aside>
                    <div>
                        <img src={pictureFromTheQuiz} alt='Picture From The Quiz' />
                        <aside>
                            <h4>Ta Vårt 60-sekunders Quiz</h4>
                            <p>Börja med vårt 60-sekunders quiz där vi frågar om din träningsnivå, dina mål och din livsstil för att förstå dina behov bättre.</p>
                        </aside>
                    </div>
                    <div className='line' ></div>
                    <div className='remove' ></div>
                    <div>
                        <img src={trainingSchedualIcon} alt='Training Schedual Icon' />
                        <aside>
                            <h4>Få Ditt Personligt Anpassade Träningsschema, Kostplan, Sömnplan</h4>
                            <p>Efter analysen skapas ett personligt träningsschema, kostplan, sömnplan  som finns i ditt konto i scandifit.</p>
                        </aside>
                    </div>
                    <div className='remove' ></div>
                    <div className='line' ></div>
                </aside>
                <div></div>
                <aside>
                    <div className='remove' ></div>
                    <div>
                        <img src={analyze} alt='' />
                        <aside>
                            <h4>Analysera Dina Svar</h4>
                            <p>När du har slutfört quizet analyserar vårt system dina svar noggrant för att skapa en personlig steg-stegträningsplan som passar just dina behov.</p>
                        </aside>
                    </div>
                    <div className='line' ></div>
                    <div className='remove' ></div>
                    <div>
                        <img src={runningOnTreadmilIcon} alt='' />
                        <aside>
                            <h4>Börja Träna och Följ planen</h4>
                            <p>Börja följa ditt personliga scandi hälso paket och upplev hur effektiv och motiverande en  anpassad träningsplan kan vara. Vi finns här för att stödja dig varje steg på vägen</p>
                        </aside>
                    </div>
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

function WhyYouHaveFailedBeforeAndWhyWeWork() {
    return (
        <section className='WhyYouHaveFailedBeforeAndWhyWeWork'>
            <article>
                <img src={HandshakeIcon} alt='icon' />
                <div>
                    <p>Hemligheten till Framgång</p>
                    <h2>Varför Scandi Hälsopaketet fungerar när andra metoder misslyckas:</h2>
                    <ul>
                        <li><img src={CheckmarkGreen} alt='CheckmarkIcon' /> Skräddarsytt för dig: Vi gör en plan som är perfekt för just dig och dina mål. Varje steg du tar hjälper dig att nå ditt mål snabbt och enkelt.</li>
                        <li><img src={CheckmarkGreen} alt='CheckmarkIcon' /> Vetenskapligt beprövat: Våra planer bygger på den bästa forskningen. Det betyder att vi vet att våra metoder fungerar.</li>
                        <li><img src={CheckmarkGreen} alt='CheckmarkIcon' /> Helhetslösning: Vi fokuserar inte bara på träning, utan även på kost och sömn – tre nyckelkomponenter för att nå dina träningsmål.</li>
                    </ul>
                </div>
            </article>
        </section>
    )
}

function WhatDoesOtherPeopleSay() {
    return (
        <section className='WhatDoesOtherPeopleSay'>
            <h2>Här är vad folk säger om det</h2>
            <article>
                <div>
                    <p>"Vitamin Pro har verkligen hjälpt mig att öka min energinivå under träningen. Nu kan jag hålla mig fokuserad och intensiv genom hela passet, vilket har resulterat i bättre prestation och ökad styrka."</p>
                    <div className='line'></div>
                    <h3>Erik B.</h3>
                    <h4>MjukvaruIngenjör</h4>
                </div>
                <div>
                    <p>"Vitamin Pro har verkligen hjälpt mig att öka min energinivå under träningen. Nu kan jag hålla mig fokuserad och intensiv genom hela passet, vilket har resulterat i bättre prestation och ökad styrka."</p>
                    <div className='line'></div>
                    <h3>Erik B.</h3>
                    <h4>MjukvaruIngenjör</h4>
                </div>
                <div>
                    <p>"Vitamin Pro har verkligen hjälpt mig att öka min energinivå under träningen. Nu kan jag hålla mig fokuserad och intensiv genom hela passet, vilket har resulterat i bättre prestation och ökad styrka."</p>
                    <div className='line'></div>
                    <h3>Erik B.</h3>
                    <h4>MjukvaruIngenjör</h4>
                </div>
            </article>
        </section>
    )
}

function Home() {

    return (
        <>
            <Hero />
            <ThreeBenifits />
            <ProblemWithAchivingGoal />
            <AllPartsAreNeededForSuccess />
            <ScandifitHealthPackage />
            <HowDoesTheScandifitHealthPackageWork />
            <BenifitsThatYouMightExpect />
            <WhyYouHaveFailedBeforeAndWhyWeWork />
            <WhatDoesOtherPeopleSay />
        </>
    );
}

export default Home;