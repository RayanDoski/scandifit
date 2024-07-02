import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Importing CSS
import '../styles/header.css';

// Importing loading screen
import LoadingScreenFullScreen from './loadingScreenFullScreen';

// Images
import logo from '../images/logo.png';
import HamburgerMenu from '../images/icons/hamburger-menu.png';
import wastebasket from '../images/icons/bin.png';

function CartSlideInMenu({isCartOpen, closeCart, products, setProducts}) {

    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false)

    const quantityAdjustAdd = (index) => {
        setProducts(prevProducts => {
            const newProducts = [...prevProducts];
            newProducts[index] = { ...newProducts[index], quantity: newProducts[index].quantity + 1 };
            return newProducts;
        });
    };
    
    const quantityAdjustSubtract = (index) => {
        setProducts(prevProducts => {
            const newProducts = [...prevProducts];
            if (newProducts[index].quantity > 1) {
                newProducts[index] = { ...newProducts[index], quantity: newProducts[index].quantity - 1 };
            }
            return newProducts;
        });
    };

    const GetCartInfo = async () => {
        const response = await fetch('http://127.0.0.1:8000/GetCartInfo', {
            method: 'POST',
            credentials: 'include'  // Include credentials (cookies)
        });
        const data = await response.json();
        if (data.success) {
            setProducts(data.products)
        }
    };

    // Getting Cart Info
    useEffect(() => {
        GetCartInfo();
    }, []);  // Include navigate in dependency array

    // For product picture
    const getImage = (imageName) => {
        try {
            return require(`../images/product-picture/${imageName}`);
        } catch (err) {
            return null; // Handle the case when the image is not found
        }
    };

    const calculateTotalPrice = () => {
        let total = 0;
        products.forEach(product => {
            total += product.quantity * product.price;
        });
        setTotalPrice(total)
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [products]);

    const deleteItem = async (index) => {
        const response = await fetch('http://127.0.0.1:8000/deleteFromCart', {
            method: 'POST',
            credentials: 'include',  // Include credentials (cookies)
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ index }),
        });
        const data = await response.json();
        if (data.success) {
            // For the cart info to be constantly updated when a change is made
            GetCartInfo();
        } else {
            console.error('Failed to delete item');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch('http://127.0.0.1:8000/create_checkout_session', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ products }),
        });
        const data = await response.json();
        if (data.success) {
            setLoading(false)
            window.location.href = data.redirect_url; // Use the provided URL from the server
        } else {
            setLoading(false)
            alert(data.message)
        }
    };

    return (
        <>
            { loading ? < LoadingScreenFullScreen /> : '' }
            <section onClick={closeCart} className={isCartOpen ? 'BackgroundForCartSlideInMenu show' : 'BackgroundForCartSlideInMenu'}></section>
            <form onSubmit={handleSubmit} className={isCartOpen ? 'ContainerForCartSlideInMenu show' : 'ContainerForCartSlideInMenu'}>
                <h1>Varukorg <span>- {products.length} Artiklar</span></h1>

                {products.map((product, index) => (
                    <div className='productDiv' key={index}>
                        <article>
                            <img src={getImage(product.picture)} alt={product.picture}/>
                            <div>
                                <h2>{product.name}</h2>
                                <div className='quantityDiv'>
                                    <button type='button' onClick={() => quantityAdjustSubtract(index)} >-</button>
                                    <input type='text' value={product.quantity} readOnly />
                                    <button type='button' onClick={() => quantityAdjustAdd(index)} >+</button>
                                </div>
                            </div>
                        </article>
                        <aside>
                            <h3>{ product.quantity * product.price } kr</h3>
                            <img src={wastebasket} alt='bin' className='bin' onClick={() => deleteItem(product.id)} />
                        </aside>
                        
                    </div>
                ))}

                <div className='TotalPrice' >
                    <p>Varukorg Total</p>
                    <h2>{ totalPrice } kr</h2>
                </div>

                <button type='submit' className='proceedBtn' >Gå Till Kassa</button>

                <button type='button' className='exitBtn' onClick={closeCart} >X</button>

            </form>
        </>
    )
}

function HeaderSlideInMenu({isMenuOpen, closeMenu, closeOpenCart, loggedIn, products}) {
    return (
        <>
            <section onClick={closeMenu} className={isMenuOpen ? 'BackgroundForSlideInMenu show' : 'BackgroundForSlideInMenu'}></section>
            <section className={isMenuOpen ? 'ContainerForSlideInMenu show' : 'ContainerForSlideInMenu'}>
                <ul className='SlideInMenuLinks'>
                    <Link className='Link' to="/">Program</Link>
                    <div className='line'></div>
                    <Link className='Link' to="/">Produkter</Link>
                    <div className='line'></div>
                    <Link className='Link' to="/contactus">Kontakta Oss</Link>
                    <div className='line'></div>
                    <Link className='CartLink' onClick={() => { closeOpenCart(); closeMenu(); }}>
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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)

    // These Variabels Are for cart
    const [products, setProducts] = useState([]);

    // This is for hamburgerMenu Clicks
    const handleHamburgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // This is for Cart Clicks 
    const handleCartClick = () => {
        if (products.length > 0) {
            setIsCartOpen(!isCartOpen);
        } else {
            setIsCartOpen(false)
        }
    };

    // Are They Logged In?
    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch('http://127.0.0.1:8000/protected', {
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
                    <Link className='Link' to="/">Produkter</Link>
                    <Link className='Link' to="/">Produkter</Link>
                    <Link className='Link' to="/contactus">Kontakta Oss</Link>
                    <Link className='CartLink' onClick={handleCartClick}>
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
            closeOpenCart={handleCartClick} 
            loggedIn={loggedIn}
            products={products}
        />
        <CartSlideInMenu 
            isCartOpen={isCartOpen} 
            closeCart={handleCartClick}
            products={products}
            setProducts={setProducts}
        />
    </>
    );
  
}

export default Header;