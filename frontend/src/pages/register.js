
// Images
import logo from '../images/logo.png';

// Importing CSS
import '../styles/login.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';

function Register() {

    // Declaring Varibales 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Are They Logged In? 
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/protected', {
                    method: 'GET',
                    credentials: 'include'  // Include credentials (cookies)
                });
                const data = await response.json();
                if (data.success) {
                    navigate('/');
                }
            } catch (error) {
                setErrorMessage(error);
            }
        };
        checkAuth();
    }, []);  // Include navigate in dependency array


    // Handle Form Submit With Input Info
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name, phonenumber }),
        });
        const data = await response.json();
        if (data.success) {
            navigate('/')
        } else {
            setErrorMessage(data.message)
        }
    };

    return (
        <section className='LoginSection'>
            <img src={logo} alt='Logo' />
            
            <form onSubmit={handleSubmit}>
                <h1>Inloggning</h1>
                <p className='WrongPasswordOrEmail'>{ErrorMessage}</p>
                <label htmlFor='name'>Namn</label>
                <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='phonenumber'>Telefonnummer</label>
                <input
                    type='number'
                    id='phonenumber'
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
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

            <Link className='LinkButton' to='/login'>
                Skapa Ditt Scandifit-Konto
            </Link>

        </section>
    );
}

export default Register;