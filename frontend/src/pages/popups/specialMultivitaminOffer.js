import React, { useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Importing CSS
import '../../styles/specialMultivitaminOffer.css';

// Importing Images
import ProductOfferPicture from '../../images/product-picture/multivitaminHeroImg.jpg'

const API_BASE_URL = process.env.REACT_APP_API_URL

function SpecialMultivitaminOfferPopup() {

    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch(`${API_BASE_URL}/api/protected`, {
                method: 'GET',
                credentials: 'include'  // Include credentials (cookies)
            });
            const data = await response.json();
            if (data.success) {
                setTimeout(() => {
                    setShowPopup(true);
                }, 10000);
            }
        };
        checkAuth();
    }, []);  // Include navigate in dependency array

    return (
        <>
            <section className={showPopup ? 'SpecialMultivitaminOfferPopupBackground view' : 'SpecialMultivitaminOfferPopupBackground'} ></section>
            {/* <section className={showPopup ? 'SpecialMultivitaminOfferPopup view' : 'SpecialMultivitaminOfferPopup'}>
                <p onClick={() => setShowPopup(false)}>Nej tack, jag vill inte ha det här fantastiska erbjudandet</p>
                <Link to='/products/multivitamin' className='ShowMoreBtn'>Visa Mer</Link>
            </section> */}

            <section className={showPopup ? 'SpecialMultivitaminOfferPopup view' : 'SpecialMultivitaminOfferPopup'}>
                <p onClick={() => setShowPopup(false)}>X</p>
                <img src={ProductOfferPicture} />
                <aside>
                    <h2>Få din första månad gratis!</h2>
                    <p>Betala <span>endast 49 kr</span> för snabb hemleverans. Därefter 249 kr per månad <span>utan bindningstid</span>.</p>
                    <Link to='/products/multivitamin' className='ShowMoreBtn' onClick={() => {setShowPopup(false); window.scrollTo(0, 0);}}>Visa Mer</Link>
                </aside>
            </section>
        </>
    );
}

export default SpecialMultivitaminOfferPopup;