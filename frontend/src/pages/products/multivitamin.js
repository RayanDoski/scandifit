import React, { useEffect, useState, useRef } from 'react';
import { Form, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Importing CSS
import '../../styles/multivitamin.css';

// Importing Loading Screen
import LoadingScreen from '../../components/loadingScreenFullScreen.js';

// Import cart
import CartSlideInMenu from '../../components/cart.js';

// Importing Images
import Lock from '../../images/icons/open-lock.png'
import CustomerManagment from '../../images/icons/customer-management.png'
import FreeTag from '../../images/icons/Free-Tag.png'

import GreenStar from '../../images/icons/star-green.png'
import CheckmarkGreen from '../../images/icons/checkde-checkmark.png'
import HealthyAndStrong from '../../images/icons/healthy-and-strong.png'

import ProductPicture from '../../images/product-picture/scandifitMultivitamin.jpg'
import SadIcon from '../../images/icons/sadIcon.png'
import MultivitaminHeroImg from '../../images/product-picture/multivitaminHeroImg.jpg'

import Energy from '../../images/icons/energy.png'
import Recovery from '../../images/icons/recovery.png'
import keepHealthy from '../../images/icons/keepHealthy.png'
import importantMinerals from '../../images/icons/importantMinerals.png'
import LowerWeight from '../../images/icons/lowerWeight.png'
import strongHealth from '../../images/icons/strong-health.png'
import LeftSideFeather from '../../images/icons/leftSideFeather.png'
import RightSideFeather from '../../images/icons/RightSideFeather.png'
import Schedual from '../../images/icons/shedual.png'
import conbine from '../../images/icons/conbine.png'
import Postnord from '../../images/postnord.png'
import Return from '../../images/icons/return-one.png'

// Cards
import AmexBlack from '../../images/payment-alternativ/amex-black.png'
import ApplePayBlack from '../../images/payment-alternativ/apple-pay-black.png'
import CardBlack from '../../images/payment-alternativ/card-black.png'
import VisaBlack from '../../images/payment-alternativ/visa-black.png'
import KlarnaBlack from '../../images/payment-alternativ/klarna.png'

function Line() {
    return (
        <div className='HomeLineDesign'></div>
    )
}

function IntroductionMultivitamin({ setViewProductPopup, scrollToFAQ }) {
    return (
        <section className='IntroductionMultivitamin'>
            <h2>Vill du boosta din prestation och maximera dina resultat?</h2>
            <h1>Maximera din träning och hälsa med "Scandifit Multivitamin" – Upp till 30 - 44%  snabbare & bättre resultat!</h1>
            <p>Få din första månadsleverans helt gratis och betala endast 49 kr för frakten. <span>Ingen bindningstid!</span></p>
            <img src={MultivitaminHeroImg} alt='Multivitamin Picture' />
            <button className='actionBtn' onClick={() => setViewProductPopup(true)}>Prenumerera</button>
            <h4 onClick={scrollToFAQ}>Hur avslutar jag min prenumeration?</h4> 
        </section>
    )
}

function WhyScandimultivitamin() {
    return (
        <section className='WhyScandimultivitamin'>
            <h2>Varför Scandifit Multivitamin?</h2>
            <article>

                <div>
                    <img src={Lock} alt='Lock Icon' />
                    <h3>Ingen Bindningstid</h3>
                    <p>Det är ingen bindningstid eller uppsägningstid, avsluta när du vill.</p>
                </div>

                <div>
                    <img src={CustomerManagment} alt='Lock Icon' />
                    <h3>1000+ prenumeranter</h3>
                    <p>Vi är stolta över att kunna meddela att vi har över 1000 aktiva prenumeranter.</p>
                </div>

                <div>
                    <img src={FreeTag} alt='Lock Icon' />
                    <h3>Gratis Månad</h3>
                    <p>Det är ingen bindningstid eller uppsägningstid, avsluta när du vill.</p>
                </div>

            </article>
        </section>
    )
}

function MultivitaminTestemonial() {

    const [showOtherTestimonials, setShowOtherTestimonials] = useState(false)

    const styles = {
        roundBtn: {
            backgroundColor: '#50C878'
        },
        noStyle: {}
    };

    return (
        <section className='HomePageTestemonial'>
            <article>
                <h2>Vad våra användare säger</h2>
                <aside>

                    <div className={ showOtherTestimonials ? 'threeFirstTestemonials' : 'threeFirstTestemonials show'}>
                        <aside>
                            <h3>Johan</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>De är lätta att ta och stör inte magen. Som en regelbunden gymbesökare hjälper de mig att fylla på alla viktiga vitaminer och mineraler. Jag märker också en ökad energinivå och håller mig frisk. Rekommenderas starkt!</p>
                    </div>

                    <div className={ showOtherTestimonials ? 'threeFirstTestemonials' : 'threeFirstTestemonials show'}>
                        <aside>
                            <h3>Samir</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Jag älskar dessa vitaminer. Jag är aktiv och de ger mig hållbar energi hela dagen. Om jag inte tar dem märker jag en skillnad.</p>
                    </div>

                    <div className={ showOtherTestimonials ? 'threeFirstTestemonials' : 'threeFirstTestemonials show'}>
                        <aside>
                            <h3>Lin</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Hela min familj tar dessa vitaminer. De har ingen eftersmak och är lätta att svälja.</p>
                    </div>

                    <div className={ showOtherTestimonials ? 'threeSecondTestemonials show' : 'threeSecondTestemonials'}>
                        <aside>
                            <h3>Ali</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Fantastiskt tillskott! Håller mina energinivåer uppe och hjälper till att hålla mig frisk.</p>
                    </div>

                    <div className={ showOtherTestimonials ? 'threeSecondTestemonials show' : 'threeSecondTestemonials'}>
                        <aside>
                            <h3>Erik</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Lätta att ta, ingen lukt eller problem med matsmältningen.</p>
                    </div>

                    <div className={ showOtherTestimonials ? 'threeSecondTestemonials show' : 'threeSecondTestemonials'}>
                        <aside>
                            <h3>Mikael</h3>
                            <div>
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                                <img src={GreenStar} alt='Green Star' />
                            </div>
                        </aside>
                        <p>Utmärkt produkt. Ger energi.</p>
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
        </section>
    )
}

function WhyTheyNeedIt() {
    return (
        <section className='whyTheyNeedIt'>
            <h2>Visste du att bristen på multivitaminer kan vara det som hindrar dig från att nå dina träningsmål och maximera din hälsa?</h2>
            <img src={SadIcon} alt='Product Image' />
            <div>
                <p>Har du tränat hårt men ändå inte sett de resultat du vill ha?</p>
                <p>Känner du dig trött och orkeslös trots att du äter rätt och tränar regelbundet?</p>
                <p>Många upplever att de inte når sina träningsmål trots alla ansträngningar.</p>
                <p>Tänk dig att vakna tidigt för att träna, bara för att känna dig utmattad hela dagen.</p>
                <p>Du kämpar på gymmet, men dina muskler växer inte och du känner dig trött.</p>
                <p>Det är lätt att bli frustrerad och börja tvivla på om allt arbete verkligen är värt det.</p>
                <p>Du kanske till och med frågar dig själv: "Varför når jag inte mina mål trots all min ansträngning?"</p>
                <p>Men tänk om jag sa att det finns en enkel lösning?</p>
            </div>
        </section>
    )
}

function TheKeyToYourGoal({ setViewProductPopup }) {
    return (
        <section className='theKeyToYourGoal'>
            <div>
                <img src={ProductPicture} alt='Picture' />
            </div>
            <aside>
                <h2>Scandifit Multivitamin - nyckeln till att nå dina träningsmål snabbare och mer effektivt.</h2>
                <p><span>Vår unika formel är skapad för aktiva individer.</span> Den balanserar nödvändiga vitaminer och mineraler för att ge dig mer energi under träningen och förbättra din styrka.</p>
                <p><span>Med Scandi Multivitamin kan du uppnå dina träningsmål 30-44% snabbare</span> och få den energi som krävs för att maximera din träning.</p>
                <p>Första månaden: Gratis (ord. 249 kr). Betala endast 49 kr för frakten. <span>Ingen bindningstid.</span></p>
                <button className='actionBtn' onClick={() => setViewProductPopup(true)}>Prenumerera</button>
            </aside>
        </section>
    )
}

function WhyYouNeedItTwo() {
    return (
        <section className='whyYouNeedItTwo'>
            <h2>Varför du som tränar & vill börja träna behöver scandifit multivitamin</h2>
            <article>
                <div>
                    <img src={Energy} alt='Icon' />
                    <h3>Mer energi</h3>
                    <p>När du tränar använder din kropp mycket energi. Scandifit Multivitamin <span>ger dig mer energi så du orkar träna längre och bättre.</span></p>
                </div>
                <div>
                    <img src={importantMinerals} alt='Icon' />
                    <h3>Fyller på med viktiga saker</h3>
                    <p>När du tränar mycket behöver din kropp massor av näringsämnen för att fungera bra. <span>Scandi Multivitamin ger dig alla nödvändiga näringsämnen för att hålla dig stark och frisk under träning.</span></p>
                </div>
                <div>
                    <img src={Recovery} alt='Icon' />
                    <h3>Återhämtning efter träning</h3>
                    <p>När du tränar mycket behöver <span>dina muskler extra hjälp för att läka</span> och bli starkare. <span>Scandi Multivitamin hjälper dina muskler att återhämta sig snabbare efter träningen.</span></p>
                </div>
                <div>
                    <img src={keepHealthy} alt='Icon' />
                    <h3>Hålla dig frisk</h3>
                    <p>Ibland kan <span>träning göra din kropp lite svagare, och du kan lättare bli sjuk.</span> scandi Multivitamin kan <span>hjälpa ditt immunsystem att kämpa mot sjukdomar</span> och hålla dig frisk.</p>
                </div>
            </article>
        </section>
    )
}

function HowMultivitaminWillIncreaseMuscleMass() {
    return (
        <section className='HowMultivitaminWillIncreaseMuscleMass'>
            <h2>Oavsett vilka mål du har kommer scandi multivitamine hjälpa till</h2>
            <p>Här är vad scandifit multivitamin kan hjälpa dig med...</p>
            <article>
                <aside>
                    <h3>öka muskelmassa</h3>

                    <div>
                        <img src={CheckmarkGreen} alt='Icon' />
                        <aside>
                            <h4>Vitamin B6</h4>
                            <p>Hjälper kroppen att göra <span>protein till muskler.</span> så du kan bygga <span>muskler snabbare.</span></p>
                        </aside>
                    </div>

                    <div>
                        <img src={CheckmarkGreen} alt='Icon' />
                        <aside>
                            <h4>Vitamin D</h4>
                            <p>Gör dina muskler starkare och hjälper dem att <span>återhämta sig snabbare</span> efter träning. Så du kan <span>träna mer och få större muskler.</span></p>
                        </aside>
                    </div>

                    <div>
                        <img src={CheckmarkGreen} alt='Icon' />
                        <aside>
                            <h4>Vitamin C</h4>
                            <p>hjälper till att <span>reparera och bygga upp musklerna efter träning.</span> Så dina muskler <span>återhämtar sig snabbare och bli starkare.</span></p>
                        </aside>
                    </div>

                    <div>
                        <img src={CheckmarkGreen} alt='Icon' />
                        <aside>
                            <h4>Zink</h4>
                            <p>Zink hjälper dina muskler att <span>växa och bli starkare.</span> vilket leder till att du får <span>större muskler på kortare tid.</span></p>
                        </aside>
                    </div>

                </aside>
                <img src={HealthyAndStrong} alt='Icon' />
            </article>
        </section>
    )
}

function HowMultivitaminWillHelpLowerWeight() {
    return (
        <section className='HowMultivitaminWillHelpLowerWeight'>
            <img src={LowerWeight} alt='Lower Weight' />
            <aside>
                <h3>Viktminskning</h3>

                <div>
                    <img src={CheckmarkGreen} alt='Icon' />
                    <aside>
                        <h4>Kalcium</h4>
                        <p>Det hjälper kroppen att bryta ner fett och <span>minska mängden fett som lagras i kroppen</span> vilket gör det lättare för <span>dig att gå ner i vikt.</span></p>
                    </aside>
                </div>

                <div>
                    <img src={CheckmarkGreen} alt='Icon' />
                    <aside>
                        <h4>Vitamin D</h4>
                        <p>Hjälper kroppen att bestämma när den är hungrig eller inte. Det kan också få kroppen att <span>bränna kalorier snabbare.</span></p>
                    </aside>
                </div>

                <div>
                    <img src={CheckmarkGreen} alt='Icon' />
                    <aside>
                        <h4>Vitamin C</h4>
                        <p><span>Gör kroppen stark</span> och hjälper till att minska inflammation. Det är bra för att bli <span>av med extra vikt.</span></p>
                    </aside>
                </div>

            </aside>
        </section>
    )
}

function HowMultivitaminWillHelpWithTraining({ setViewProductPopup }) {
    return (
        <section className='HowMultivitaminWillHelpWithTraining'>
            <article>
                <aside>
                    <h3>Träna, Bättre & Snabbare</h3>

                    <div>
                        <img src={CheckmarkGreen} alt='Icon' />
                        <aside>
                            <h4>Vitamin B6</h4>
                            <p>Hjälper kroppen att <span>omvandla mat till bränsle</span> vilket leder till <span>förbättrad energi under träningen</span></p>
                        </aside>
                    </div>

                    <div>
                        <img src={CheckmarkGreen} alt='Icon' />
                        <aside>
                            <h4>Vitamin D</h4>
                            <p>hjälper till att reparera och bygga upp musklerna efter träningen. <span>så att du återhämtar dig snabbare och bli starkare.</span></p>
                        </aside>
                    </div>

                    <div>
                        <img src={CheckmarkGreen} alt='Icon' />
                        <aside>
                            <h4>Magnesium</h4>
                            <p>Främjar muskelavslappning och <span>återhämtning efter träningen,</span> vilket minskar risken för kramp och främjar <span>bättre träningsresultat</span></p>
                        </aside>
                    </div>

                </aside>
                <img src={strongHealth} alt='Strong Health Picture' />
            </article>
            <button className='actionBtn' onClick={() => setViewProductPopup(true)}>Prenumerera</button>
        </section>
    )
}

function OneTestemonial() {
    return (
        <section className='OneTestemonial'>
            <h2>Recension</h2>
            <p><span>"</span>Vitamin Pro har verkligen förändrat mitt träningsliv! Innan jag började ta det, kämpade jag med att gå ner i vikt och öka min muskelmassa. Dessutom kände jag mig alltid trött och utmattad efter träningen, vilket hindrade mig från att nå mina mål.</p>
            <p>Men sedan jag började med Vitamin Pro har jag märkt en stor förändring. Jag har lyckats gå ner i vikt, bygga mer muskelmassa och prestera mycket bättre i gymmet. Jag känner mig mer energisk och alert under träningen, och jag kan pressa mig själv hårdare än någonsin tidigare.</p>
            <p>Dessutom har min återhämtning förbättrats avsevärt, och jag känner mig starkare och piggare än någonsin tidigare. Jag rekommenderar verkligen Vitamin Pro till alla som vill ta sin träning till nästa nivå!<span>"</span></p>
            <h3>Dennis L.</h3>
        </section>
    )
}

function HowToConsume() {
    return (
        <section className='HowToConsume'>
            <h2>Hur använder jag det?</h2>
            <p>För att ta två tabletter av Scandifit Multivitamin varje dag, föreslår jag att du följer denna enkla guide</p>
            <article>

                <div>
                    <h4>01</h4>
                    <img src={Schedual} alt='Routine Icons' />
                    <h3>Skapa en rutin</h3>
                    <p>Bestäm en tidpunkt varje dag för att ta dina 2 tabletter.</p>
                </div>

                <div>
                    <h4>02</h4>
                    <img src={conbine} alt='Routine Icons' />
                    <h3>Kombinera med mat</h3>
                    <p>Ta dina tabletter tillsammans med en måltid för att minska risken för magbesvär.</p>
                </div>

                <div>
                    <h4>03</h4>
                    <img src={importantMinerals} alt='Routine Icons' />
                    <h3>Placera det synligt</h3>
                    <p>Förvara din Scandifit Multivitamin synligt för att lättare komma ihåg att ta dina tabletter.</p>
                </div>

            </article>
        </section>
    )
}

function MultivitaminEachFAQ({ question, answer }) {

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

function IngredientsAndBenefits() {
    return (
        <section className='IngredientsAndBenefits'>
            <h2>Viktiga Ingredienser och deras fördelar</h2>
            <article>
                <aside>
                    <MultivitaminEachFAQ question='Vitamin A' answer='Nödvändigt för syn, immunfunktion och hudhälsa.' />
                    <MultivitaminEachFAQ question='Magnesium' answer='Viktigt för muskel- och nervfunktion, energiproduktion och bibehållande av benhälsa.' />
                    <MultivitaminEachFAQ question='Vitamin B6' answer='Stödjer hjärnans utveckling och funktion, hjälper kroppen omvandla mat till energi.' />
                    <MultivitaminEachFAQ question='Kalcium' answer='Avgörande för benhälsa, nervöverföring, muskelfunktion och blodkoagulering.' />
                    <MultivitaminEachFAQ question='Biotin' answer='Spelar roll i metabolismen av kolhydrater, fett och proteiner, främjar hälsosam hud, hår och naglar.' />
                    <MultivitaminEachFAQ question='Vitamin B12' answer='Nödvändigt för nervfunktion, bildandet av röda blodkroppar och DNA-syntes.' />
                </aside>
                <div className='line'></div>
                <div>
                    <MultivitaminEachFAQ question='Vitamin D' answer='Nödvändigt för kalciumabsorption, benhälsa och immunfunktion.' />
                    <MultivitaminEachFAQ question='Vitamin E' answer='Fungerar som en antioxidant och skyddar celler från skador.' />
                    <MultivitaminEachFAQ question='Folsyra' answer='Avgörande för celluppdelning och DNA-syntes, särskilt under graviditet.' />
                    <MultivitaminEachFAQ question='Jod' answer='Nödvändigt för produktionen av sköldkörtelhormoner som reglerar ämnesomsättningen och stödjer korrekt tillväxt och utveckling.' />
                    <MultivitaminEachFAQ question='Zink' answer='Nödvändigt för immunfunktion, sårläkning, DNA-syntes och korrekt smak- och luktsinne.' />
                    <MultivitaminEachFAQ question='Krom' answer='Hjälper till i metabolismen av kolhydrater och reglerar blodsockernivåer.' />
                </div>
            </article>
        </section>
    )
}

function BenifitsWithSubscription() {
    return (
        <section className='BenefitsWithSubscription'>
            <article>
                <h2>Varför välja Scandi Multivitamine - Fördelar med Abonnemang</h2>
                <p>För att uppnå de bästa resultaten med ett kosttillskott krävs regelbunden användning. Vi vill göra det så enkelt som möjligt för dig att få den bästa upplevelsen och effekten av din Scandi Multivitamin.</p>
                <h3>Fördelar med ett Scandi Multivitamin-abonnemang</h3>
                <ul>
                    <li>Ingen bindningstid eller uppsägningstid</li>
                    <li>Leverans direkt hem var 4:e vecka</li>
                    <li>Personlig och professionell kundservice</li>
                    <li>tillgång till specialerbjudanden och rabatter.</li>
                </ul>
            </article>
            <img src={Lock} alt='Open Lock Icon' />
        </section>
    )
}

function WhyIsTheFirstMonthFree({ setViewProductPopup }) {
    return (
        <section className='WhyIsTheFirstMonthFree'>
            <article>
                <h2>Varför ger vi bort scandifit multivitamin gratis?</h2>
                <p>Vi vill att du ska kunna uppleva fördelarna med multivitamin utan risk.</p>
                <p>Genom att erbjuda den första månaden gratis, hoppas vi att du ser de positiva effekterna på din hälsa och träning.</p>
                <h3>Första månaden: Gratis (ord. 249 kr). Betala endast 49 kr för frakten. Ingen bindningstid.</h3>
            </article>
            <button className='actionBtn' onClick={() => setViewProductPopup(true)}>Prenumerera</button>
        </section>
    )
}

function MultivitaminGuarantee({ setViewProductPopup }) {
    return (
        <section className='MultivitaminGuarantee'>
            <aside>
                <h2><img src={LeftSideFeather} alt='Feather Icon' /> Här är vår “Du måste vara galen!" garanti <img src={RightSideFeather} alt='Feather Icon' /></h2>
            </aside>
            <p>Om du provar Scandifit Multivitamin och inte känner dig bättre och mer hälsosam, låt oss veta så återbetalar vi fraktkostnaden och du får behålla produkten som kompensation för din tid.</p>
            <p>Det stämmer. Du behöver inte skicka tillbaka något.</p>   
            <p>Bara mejla oss, så återbetalar vi dina fraktkostnader utan frågor.</p>    
            <button className='actionBtn' onClick={() => setViewProductPopup(true)}>Prenumerera</button>
        </section>
    )
}

function ViewproductMultivitaminPopup({ setViewProductPopup }) {

    const [loading, setLoading] = useState(false)
    const [subOrOnce, setSubOrOnce] = useState('sub')
    const [price, setPrice] = useState(0)
    const [stripePriceId, setStripePriceId] = useState('price_1Pd6V9KgpFWeoEQVHTeeLcyx')
    let id = 1
    let name = 'Scandifit Multivitamin'
    let picture = 'ScandifitMultivitaminImg.png'
    let quantity = 1

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch('http://127.0.0.1:8000/AddCartInfo', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subOrOnce, price, id, name, picture, quantity, stripePriceId }),
        });
        const data = await response.json();
        if (data.success) {
            setLoading(false);
            setViewProductPopup(false);
            window.location.reload();
        } else {
            setLoading(false);
            setViewProductPopup(false);
            window.location.reload();
        }
    };

    return (
        <>
            { loading ? <LoadingScreen /> : '' }
            <div className='ViewproductMultivitaminPopupBackground' onClick={() => setViewProductPopup(false)}></div>
            <section className='ViewproductMultivitaminPopup'>

                {/* ClosePopup code */}
                <button className='closeBtn' onClick={() => setViewProductPopup(false)} >X</button>

                <img src={ProductPicture} alt='Product Picture' />
                <article>
                    <h2>Scandifit Multivitamin</h2>
                    <form onSubmit={handleSubmit}>

                        <input
                            type='radio'
                            name='typeOfPurchase'
                            value='sub'
                            id='typeOfPurchaseSub'
                            checked={subOrOnce === 'sub'}
                            onChange={() => { setSubOrOnce('sub'); setPrice(0); setStripePriceId('price_1Pd6V9KgpFWeoEQVHTeeLcyx')}}
                        />
                        <label htmlFor='typeOfPurchaseSub'>
                            <div>
                                <h3>Månadsvis Prenumeration</h3>
                                <p>sedan 249 kr per månad</p>
                            </div>
                            <p>Gratis</p>
                        </label>
                        
                        <input
                            type='radio'
                            name='typeOfPurchase'
                            value='once'
                            id='typeOfPurchaseOnce'
                            checked={subOrOnce === 'once'}
                            onChange={() => {setSubOrOnce('once'); setPrice(499); setStripePriceId('price_1Pd6wiKgpFWeoEQVQAzWAJnE')}}
                        />
                        <label htmlFor='typeOfPurchaseOnce'>
                            <div>
                                <h3>Engångsköp</h3>
                            </div>
                            <p>499 Kr</p>
                        </label>

                        <button type='submit'>Lägg Till</button>

                        <article>

                            <aside>
                                <div>
                                    <img src={Postnord} alt='Postnord Icon' />
                                    <h3>1-3 Dagars Frakt - Hemleverans</h3>
                                    <p>Gratis vid prenumeration</p>
                                </div>
                                <h3>49 Kr</h3>
                            </aside>

                            <aside>
                                <div>
                                    <h3><img src={Return} alt='return icon' />90 Dagar Öppet Köp</h3>
                                </div>
                            </aside>

                            <aside>
                                <div>
                                    <h3>Betalnings Alternativ</h3>
                                    <aside>
                                        <img src={AmexBlack} alt='Payment Icon' />
                                        <img src={ApplePayBlack} alt='Payment Icon' />
                                        <img src={CardBlack} alt='Payment Icon' />
                                        <img src={VisaBlack} alt='Payment Icon' />
                                        <img src={KlarnaBlack} alt='Payment Icon' />
                                    </aside>
                                </div>
                            </aside>

                        </article>

                    </form>
                </article>
            </section>
        </>
    )
}

function FAQMultivitamin() {
    return (
        <section className='IngredientsAndBenefits'>
            <h2>Vanliga Frågor</h2>
            <article>
                <aside>
                    <MultivitaminEachFAQ question='Hur avslutar jag min prenumeration?' answer='Att avsluta din prenumeration är väldigt enkelt. Skicka ett mail till Kontakta@scandifit.se eller använd formuläret på vår hemsida (länk här) och meddela att du vill avsluta din prenumeration. Vi kommer att ta hand om det direkt!.' />
                    <MultivitaminEachFAQ question='Vad är Scandifir Multivitamine och vad gör den unik?' answer='Scandifit Multivitamine är ett högkvalitativt kosttillskott som innehåller en noggrant balanserad blandning av vitaminer och mineraler. Vår unika formel är utformad för att ge dig mer energi, förbättra muskelåterhämtning och stärka ditt immunförsvar.' />
                    <MultivitaminEachFAQ question='Hur tar jag Scandifit Multivitamine?' answer='Du tar två tabletter dagligen, helst i samband med en måltid för att förbättra absorptionen och minska risken för magbesvär.' />
                    <MultivitaminEachFAQ question='Finns det några biverkningar?' answer='Scandi Multivitamine är generellt säkert för de flesta människor. Dock, om du är gravid, ammar, tar medicin eller har ett medicinskt tillstånd, bör du rådfråga en läkare innan du börjar använda produkten.' />
                    <MultivitaminEachFAQ question='Hur lång tid tar det att se resultat?' answer='Många användare rapporterar förbättrad energi och hälsa inom några veckor av regelbunden användning. För bästa resultat rekommenderar vi att du använder produkten dagligen.' />
                    <MultivitaminEachFAQ question='Finns det någon bindningstid på abonnemanget?' answer='Nej, det finns ingen bindningstid eller uppsägningstid. Du kan avsluta ditt abonnemang när du vill.' />
                    <MultivitaminEachFAQ question='Vad innebär vår garanti?' answer='Om du provar Scandifit  Multivitamin och inte känner dig bättre och hälsosammare, återbetalar vi fraktkostnaden och du får behålla produkten.' />
                    <MultivitaminEachFAQ question='Hur fungerar abonnemanget efter den gratis perioden?' answer='Efter din gratis första månad får du en leverans varje månad. Om du väljer att fortsätta, kostar abonnemanget 249 kr per månad. Du kan avsluta när som helst utan bindningstid.' />
                </aside>
            </article>
        </section>
    )
}

function Multivitamin() {

    const [viewProductPopup, setViewProductPopup] = useState(false)
    const faqRef = useRef(null);

    const scrollToFAQ = () => {
        if (faqRef.current) {
            faqRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <IntroductionMultivitamin setViewProductPopup={setViewProductPopup} scrollToFAQ={scrollToFAQ} />
            <Line />
            <WhyScandimultivitamin />
            <Line />
            <MultivitaminTestemonial />
            <Line />
            <WhyTheyNeedIt />
            <Line />
            <TheKeyToYourGoal setViewProductPopup={setViewProductPopup} />
            <Line />
            <WhyYouNeedItTwo />
            <Line />
            <HowMultivitaminWillIncreaseMuscleMass />
            <Line />
            <HowMultivitaminWillHelpLowerWeight />
            <Line />
            <HowMultivitaminWillHelpWithTraining setViewProductPopup={setViewProductPopup} />
            <Line />
            <OneTestemonial />
            <Line />
            <HowToConsume />
            <Line />
            <IngredientsAndBenefits />
            <Line />
            <BenifitsWithSubscription />
            <Line />
            <WhyIsTheFirstMonthFree setViewProductPopup={setViewProductPopup} />
            <Line />
            <MultivitaminGuarantee setViewProductPopup={setViewProductPopup} />
            <Line />
            <section ref={faqRef}>
                <FAQMultivitamin />
            </section>
            { viewProductPopup ? <ViewproductMultivitaminPopup setViewProductPopup={setViewProductPopup} />  : ''}
        </>
    );
}

export default Multivitamin;