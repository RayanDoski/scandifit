import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Importing CSS
import '../styles/order_complete.css';

// Import Loading Screen
import Loading from '../components/loadingScreenFullScreen.js';

// Importing Images
import postnord from '../images/postnord.png';
import LoadingScreenFullScreen from '../components/loadingScreenFullScreen.js';

function OrderComplete() {
    const { sessionId } = useParams();
    const [stripeSession, setStripeSession] = useState(null);
    const [loading, setLoading] = useState(true);

    // Deletes Everything in cart
    useEffect(() => {
        const deleteAllItemsInCart = async () => {
            const response = await fetch('http://127.0.0.1:8000/deleteAllFromCart', {
                method: 'POST',  // Ensure the method matches what your Flask route expects
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
        };
    
        deleteAllItemsInCart();
    }, []);
    
    // ferching the customers info from stripe
    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/stripe-session/${sessionId}`);
            const data = await response.json();
            setStripeSession(data);
            setLoading(false)
        };

        fetchSession();
    }, [sessionId]);

    return (
        <>
            { loading ? <LoadingScreenFullScreen /> : '' }
            { stripeSession ? (
                <section className="order-complete">
                    <h1>Tack för din beställning</h1>
                    <h2>Ett kvitto har skickats till din e-post som en bekräftelse på ditt köp. Vi uppskattar att du valde att handla hos oss!</h2>
                    <main>
                        <aside>
                            <div>
                                <h6>Beställningsnummer</h6>
                                <p>{stripeSession.created}</p>
                            </div>
                            <div>
                                <h6>Beställnings Datum</h6>
                                <p>{stripeSession.metadata.purchase_time}</p>
                            </div>
                            <div>
                                <h6>Kund</h6>
                                <p>{stripeSession.customer_details.name}</p>
                            </div>

                            <h2>Leveransadress</h2>
                            <p>{stripeSession.customer_details.name}</p>
                            <p>{stripeSession.customer_details.address.line1} {stripeSession.customer_details.address.line2}</p>
                            <p>{stripeSession.customer_details.address.postal_code}</p>
                            <p>{stripeSession.customer_details.address.city}</p>

                            <h2>Kontaktinformation</h2>
                            <p>{stripeSession.customer_details.name}</p>
                            <p>{stripeSession.customer_details.email}</p>
                            <p>{stripeSession.customer_details.phone}</p>

                            <h2>Kontakts Oss</h2>
                            <h3>om du har några ytterligare frågor, tveka inte att fråga oss, vi finns här för att hjälpa dig. <Link to='/contactus' className='linkToContactUs' >Kontakta Oss</Link> 😁</h3>
                        </aside>
                        {/* <div>
                            <h2>Ordersammanfattning</h2>
                            <aside>
                                <h6>Frakt:</h6>
                                <p>{stripeSession.total_details.amount_shipping} SEK</p>
                            </aside>
                            <p>Levereras inom 1-3 arbetsdagar.</p>
                        </div> */}
                    </main>
                </section>
            ) : ''}
            
        </>
    );
}

export default OrderComplete;