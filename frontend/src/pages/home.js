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

import postnord from '../images/postnord.png';
import LoadingScreenFullScreen from '../components/loadingScreenFullScreen.js';

function Hero() {
    return (
        <section className='HomepageHeroSection'>
            <article>
                <img src={Logo} alt='Logo' />
                <h3>Vill du forma din drömkropp och imponera på dig själv i spegeln?</h3>
                <h1>Få din 60 sekunder personliga "Scandi Hälsopaket” och uppnå dina träningsmål 80-90% snabbare utan att slösa bort 24-48 timmar på planering!</h1>
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

function Home() {

    return (
        <>
            <Hero />
        </>
    );
}

export default Home;