import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// Importing CSS
import '../styles/userInfo.css';

// For Login
import NotLiAuthCheck from './loginSystem/notLiAuthCheck.js';

// importing Secondary Header
import SecondaryHeader from '../components/secondaryHeader.js';


function UserInfo() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [telefonnummer, setTelefonnummer] = useState(0)
    const [password, setPassword] = useState('')

    const [editName, setEditName] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editTelefonnummer, setEditTelefonnummer] = useState(false)
    const [editPassword, setEditPassword] = useState(false)

    // For error Messages
    const [errorMessage, setErrorMessage] = useState('Din Information')

    // Are They Logged In? 
    NotLiAuthCheck()

    // Getting Their Information
    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/profile/information', {
                method: 'POST',
                credentials: 'include'  // Include credentials (cookies)
            });
            const data = await response.json();
            if (data.success) {
                setName(data.namn)
                setEmail(data.email)
                setTelefonnummer(data.telefonnummer)
                setPassword(data.password)
            } else {
                setName('Information Saknas')
                setEmail('Information Saknas')
                setPassword('Information Saknas')
            }
        };
        checkAuth();
    }, []);  // Include navigate in dependency array

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setEditName(false)
        setEditEmail(false)
        setEditTelefonnummer(false)
        setEditPassword(false)
        
        // Updating the information
        const updateUserInfo = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/profile/information/update', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ namn: name, email, telefonnummer, password }),
            });
            const data = await response.json();
            if (!data.success) {
                setErrorMessage(data.message)
            } 
        }
        updateUserInfo()

    };

    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
        const data = await response.json();
        if (data.success) {
            navigate('/');
            // Whole Website Has To Reload For Changes to be implemented
            window.location.reload();
        }
    };
    return (
        <>
            <SecondaryHeader />
            <section className='userInfoSection'>

                <article className='RightSide'>
                    <h1>{errorMessage}</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <aside>
                                <label htmlFor='name'>Namn:</label>  
                                <input 
                                    type='text' 
                                    id='name' 
                                    name='name' 
                                    value={name}
                                    readOnly={!editName}
                                    className={editName ? 'editable' : ''}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </aside>
                            {editName ? (
                                <button type='button' onClick={handleSubmit}>Spara</button>
                            ) : (
                                <button type='button' onClick={() => setEditName(true)}>Ändra</button>
                            )}
                        </div>

                        <div>
                            <aside>
                                <label htmlFor='email'>Email:</label>  
                                <input 
                                    type='email' 
                                    id='email' 
                                    name='email' 
                                    value={email}
                                    readOnly={!editEmail}
                                    className={editEmail ? 'editable' : ''}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </aside>
                            {editEmail ? (
                                <button type='button' onClick={handleSubmit}>Spara</button>
                            ) : (
                                <button type='button' onClick={() => setEditEmail(true)}>Ändra</button>
                            )}
                        </div>

                        <div>
                            <aside>
                                <label htmlFor='Telefonnummer'>Telefonnummer:</label>  
                                <input 
                                    type='number' 
                                    id='Telefonnummer' 
                                    name='Telefonnummer' 
                                    value={telefonnummer}
                                    readOnly={!editTelefonnummer}
                                    className={editTelefonnummer ? 'editable' : ''}
                                    onChange={(e) => setTelefonnummer(e.target.value)}
                                />
                            </aside>
                            {editTelefonnummer ? (
                                <button type='button' onClick={handleSubmit}>Spara</button>
                            ) : (
                                <button type='button' onClick={() => setEditTelefonnummer(true)}>Ändra</button>
                            )}
                        </div>

                        <div>
                            <aside>
                                <label htmlFor='password'>Lösenord:</label>  
                                <input 
                                    type='password' 
                                    id='password' 
                                    name='password' 
                                    value={password}
                                    readOnly={!editPassword}
                                    className={editPassword ? 'editable' : ''}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </aside>
                            {editPassword ? (
                                <button type='button' onClick={handleSubmit}>Spara</button>
                            ) : (
                                <button type='button' onClick={() => setEditPassword(true)}>Ändra</button>
                            )}
                        </div>

                    </form>
                </article>

                <aside className='LeftSide'>
                    <Link to='/contactus' className='ContactUsBtn'>Kontakta Oss</Link>
                    <button type='button' className='LogoutBtn' onClick={handleLogout}>Logga Ut</button>
                </aside>

            </section>
        </>
    );
}

export default UserInfo;