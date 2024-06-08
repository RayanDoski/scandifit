
// Images
import logo from '../images/logo.png';
import HamburgerMenu from '../images/icons/hamburger-menu.png';

// Importing CSS
import '../styles/header.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function HeaderSlideInMenu({isMenuOpen, closeMenu}) {
    return (
        <>
            <section onClick={closeMenu} className={isMenuOpen ? 'BackgroundForSlideInMenu show' : 'BackgroundForSlideInMenu'}></section>
            <section className={isMenuOpen ? 'ContainerForSlideInMenu show' : 'ContainerForSlideInMenu'}>
                <ul className='SlideInMenuLinks'>
                    <Link className='Link' to="/">Program</Link>
                    <div className='line'></div>
                    <Link className='Link' to="/">Produkter</Link>
                    <div className='line'></div>
                    <Link className='Link' to="/">Kontakta Oss</Link>
                    <div className='line'></div>
                    <Link className='CartLink' to="/">
                        Kundvagn
                        <p className='AmountInCart'>1</p>
                    </Link>
                    <div className='line'></div>
                    <Link className='ButtonLink' to="/">Börja Gratis</Link>
                </ul>
            </section>
        </>
    )
}

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleHamburgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

  return (
    <>
        <section className='HeaderContainerForWebsite'>
            <header className='HeaderForWebsite'>

                <aside className='LogoContainer'>
                    <Link className='LogoLink' to="/"><img className='Logo' src={logo} alt='Logo' /></Link>
                </aside>

                <ul className='HeaderLinks'>
                    <Link className='Link' to="/">Program</Link>
                    <Link className='Link' to="/">Produkter</Link>
                    <Link className='Link' to="/">Kontakta Oss</Link>
                    <Link className='CartLink' to="/">
                        Kundvagn
                        <p className='AmountInCart'>1</p>
                    </Link>
                </ul>

                <aside className='ButtonContainer'>
                    <img className='Hamburgermenu' onClick={handleHamburgerClick} src={HamburgerMenu} alt='hamburgermenu'/>
                    <Link className='ButtonLink' to="/">Börja Gratis</Link>
                </aside>

            </header>
        </section>
        <HeaderSlideInMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu}/>
    </>
  );
  
}

export default Header;