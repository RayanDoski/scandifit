import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Importing CSS
import '../styles/header.css';

// Importing loading screen
import LoadingScreenFullScreen from './loadingScreenFullScreen';

// Images
import wastebasket from '../images/icons/bin.png';
import Postnord from '../images/postnord.png'

function CartSlideInMenu({isCartOpen, setIsCartOpen, products, setProducts}) {

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
        setLoading(true)
        const response = await fetch('http://127.0.0.1:8000/GetCartInfo', {
            method: 'POST',
            credentials: 'include'  // Include credentials (cookies)
        });
        const data = await response.json();
        if (data.success) {
            setProducts(data.products)
            setLoading(false)
            if (data.products.length > 0) {
                setIsCartOpen(true)
            }
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
        setTotalPrice(total + 49)
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
            <section onClick={() => setIsCartOpen(false)} className={isCartOpen ? 'BackgroundForCartSlideInMenu show' : 'BackgroundForCartSlideInMenu'}></section>
            <form onSubmit={handleSubmit} className={isCartOpen ? 'ContainerForCartSlideInMenu show' : 'ContainerForCartSlideInMenu'}>
                <h1>Varukorg <span>- {products.length} Artiklar</span></h1>

                {products.map((product, index) => (
                    <div className='productDiv' key={index}>
                        <article>
                            <img src={getImage(product.picture)} alt={product.picture}/>
                            <div>
                                <h2>{product.name}</h2>
                                { product.subOrOnce === 'sub' ? (
                                    <div>
                                        <h3>Prenumeration</h3>
                                    </div>
                                ) : (
                                    <div className='quantityDiv'>
                                        <button type='button' onClick={() => quantityAdjustSubtract(index)} >-</button>
                                        <input type='text' value={product.quantity} readOnly />
                                        <button type='button' onClick={() => quantityAdjustAdd(index)} >+</button>
                                    </div>
                                )}
                                
                            </div>
                        </article>
                        <aside>
                            <h3>{ product.quantity * product.price } kr</h3>
                            <img src={wastebasket} alt='bin' className='bin' onClick={() => deleteItem(product.id)} />
                        </aside>
                        
                    </div>
                ))}

                <aside className='ShippingContainer'>
                    {/* <h3>1-3 arbetsdagar - Hemleverans</h3> */}
                    <article>
                        <div>
                            <img src={Postnord} alt='Postnord Logo' />
                            <p>1-3 arbetsdagar - Hemleverans</p>
                        </div>
                        <p>49 kr</p>
                    </article>
                </aside>

                <div className='TotalPrice' >
                    <p>Varukorg Total</p>
                    <h2>{ totalPrice } kr</h2>
                </div>

                <button type='submit' className='proceedBtn' >Gå Till Kassa</button>

                <button type='button' className='exitBtn' onClick={() => setIsCartOpen(false)} >X</button>

            </form>
        </>
    )
}

export default CartSlideInMenu;