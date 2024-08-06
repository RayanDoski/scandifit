// Importing CSS
import '../styles/secondaryHeader.css';

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';

function SecondaryHeader() {

    const [menu, setMenu] =useState(false)

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const activeStyle = {
        backgroundColor: 'var(--green)', // Define your active style
        color: 'var(--white)',
        transition: '.5s all'
    };

    return (
        <section className="secondaryHeader">
            <div onClick={toggleMenu} className="MobileViewOpenBtn">
                <h3>{ menu ? 'stäng profil meny ↑' : 'öppna profil meny ↓' }</h3>
            </div>
            <ul className={menu ? 'openProfileLinks' : ''}>
                <li>
                    <NavLink 
                        to="/profile/trainingplan" 
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='profileLinks'>
                        Träningsplan
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/profile/sleepplan" 
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='profileLinks'>
                        Sömnplan
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/profile/dietplan" 
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='profileLinks'>
                        Kostplan
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/profile/exercises/alla" 
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='profileLinks'>
                        Övningar
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/profile/myprofile" 
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='profileLinks'>
                        Profil
                    </NavLink>
                </li>
            </ul>
        </section>
    )
}


export default SecondaryHeader;