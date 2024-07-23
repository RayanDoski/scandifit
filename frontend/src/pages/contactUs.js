import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// Importing CSS
import '../styles/contactUs.css';

// Importing Loading Screen
import LoadingScreen from '../components/loadingScreenFullScreen.js';

function ContactUs() {

    // communication variables
    const [btnMessage, setBtnMessage] = useState('Skicka Meddelande')
    const [headTextMessage, setheadTextMessage] = useState('Kontakta Oss')
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [meddelande, setMeddelande] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        // Updating the information
        const SendThierMessage = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/send_message', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, meddelande }),
            });
            const data = await response.json();
            if (data.success) {
                setLoading(false)
                setName('')
                setEmail('')
                setMeddelande('')
                setBtnMessage('Skickats')
                setheadTextMessage('Vi har Tagit Emot Ditt meddelande')
            } else {

            }
        }
        SendThierMessage()

    };

    return (
        <>
            { loading ? <LoadingScreen /> : '' }
            <section className='ContactUsSection'>
                <h2 className='subText' >Har En Fråga?</h2>
                <h1>{headTextMessage}</h1>
                <p className=''>Vi är här för att svara på vilken fråga du än har. Vi ser fram emot att höra från dig</p>
                <form className='ContactUsForm' onSubmit={handleSubmit}>
                    <label htmlFor='namn' >Namn:</label>
                    <input type='text' id='namn' value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor='email' >Email:</label>
                    <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor='meddelande' >Meddelande:</label>
                    <textarea id='meddelande' value={meddelande} onChange={(e) => setMeddelande(e.target.value)} />
                    <button type='submit'>{btnMessage}</button>
                </form>
            </section>
        </>
    );
}

export default ContactUs;