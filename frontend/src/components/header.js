import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Importing CSS
import '../styles/header.css';

// Importing loading screen
import LoadingScreenFullScreen from './loadingScreenFullScreen';

// Import Cart 
import CartSlideInMenu from './cart.js';

// Images
import logo from '../images/logo.png';
import HamburgerMenu from '../images/icons/hamburger-menu.png';
import wastebasket from '../images/icons/bin.png';

const API_BASE_URL = process.env.REACT_APP_API_URL

function HeaderSlideInMenu({isMenuOpen, closeMenu, setIsCartOpen, loggedIn, products}) {
    return (
        <>
            <section onClick={closeMenu} className={isMenuOpen ? 'BackgroundForSlideInMenu show' : 'BackgroundForSlideInMenu'}></section>
            <section className={isMenuOpen ? 'ContainerForSlideInMenu show' : 'ContainerForSlideInMenu'}>
                <ul className='SlideInMenuLinks'>
                    <Link className='Link' to="/">Hem</Link>
                    <div className='line'></div>
                    <Link className='Link' to="https://www.postnord.se/vara-verktyg/spara-brev-paket-och-pall">Spåra Order</Link>
                    <div className='line'></div>
                    <Link className='Link' to="/contactus">Kontakta Oss</Link>
                    <div className='line'></div>
                    <Link className='CartLink' onClick={() => {closeMenu();setIsCartOpen(true)}}>
                        Kundvagn
                        <p className='AmountInCart'>{products.length > 0 ? products.length : 'Tom'}</p>
                    </Link>
                    <div className='line'></div>
                    { loggedIn ? (<Link className='ButtonLink' to="/profile/myprofile">Din Profil</Link>) : (<Link className='ButtonLink' to="/login">Logga In</Link>)}
                </ul>
            </section>
        </>
    )
}

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)

    // These Variabels Are for cart
    const [products, setProducts] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // This is for hamburgerMenu Clicks
    const handleHamburgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Are They Logged In?
    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch(`${API_BASE_URL}/api/protected`, {
                method: 'GET',
                credentials: 'include'  // Include credentials (cookies)
            });
            const data = await response.json();
            if (data.success) {
                setLoggedIn(true)
            }
        };
        checkAuth();
    }, []); 

    return (
    <>
        <section className='HeaderContainerForWebsite'>
            <header className='HeaderForWebsite'>

                <aside className='LogoContainer'>
                    <Link className='LogoLink' to="/"><img className='Logo' src={logo} alt='Logo' /></Link>
                </aside>

                <ul className='HeaderLinks'>
                    <Link className='Link' to="/">Hem</Link>
                    <Link className='Link' to="https://www.postnord.se/vara-verktyg/spara-brev-paket-och-pall">Spåra Order</Link>
                    <Link className='Link' to="/contactus">Kontakta Oss</Link>
                    <Link className='CartLink' onClick={() => setIsCartOpen(true)}>
                        Kundvagn
                        <p className='AmountInCart'>{products.length > 0 ? products.length : 'Tom'}</p>
                    </Link>
                </ul>

                <aside className='ButtonContainer'>
                    <img className='Hamburgermenu' onClick={handleHamburgerClick} src={HamburgerMenu} alt='hamburgermenu'/>
                    { loggedIn ? (<Link className='ButtonLink' to="/profile/myprofile">Din Profil</Link>) : (<Link className='ButtonLink' to="/login">Logga In</Link>)}
                </aside>

            </header>
        </section>
        <HeaderSlideInMenu 
            isMenuOpen={isMenuOpen} 
            closeMenu={handleHamburgerClick} 
            setIsCartOpen={setIsCartOpen}
            loggedIn={loggedIn}
            products={products}
        />
        <CartSlideInMenu 
            isCartOpen={isCartOpen} 
            setIsCartOpen={setIsCartOpen}
            products={products}
            setProducts={setProducts}
        />
    </>
    );
  
}

export default Header;