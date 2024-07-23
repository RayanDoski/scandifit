import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';

// Importing CSS
import '../../styles/login.css';

// For Login
import LiAuthCheck from './LiAuthCheck.js';

// Images
import logo from '../../images/logo.png';

function Login() {

    // Declaring Varibales 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Are They Logged In? 
    LiAuthCheck()

    // Handle Form Submit With Input Info
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success) {
            navigate('/profile/myprofile')
            // Whole Website Has To Reload For Changes to be implemented
            window.location.reload();
        } else {
            setErrorMessage('Ogiltig Email eller lösenord')
        }
    };

    return (
        <section className='LoginSection'>
            <img src={logo} alt='Logo' />
            
            <form onSubmit={handleSubmit}>
                <h1>Inloggning</h1>
                <p className='WrongPasswordOrEmail'>{ErrorMessage}</p>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Lösenord</label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Fortsätt</button>
                <p>
                    Genom att fortsätta godkänner du Scandifits{' '}
                    <Link className='Link' to="/">
                        Användarvillkor
                    </Link>
                </p>
            </form>

            <article>
                <div></div>
                <p>Ny hos Scandifit?</p>
                <div></div>
            </article>

            <Link className='LinkButton' to='/register'>
                Skapa Ditt Scandifit-Konto
            </Link>

        </section>
    );
}

export default Login;