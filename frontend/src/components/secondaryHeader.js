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
    };

    return (
        <section className="secondaryHeader">
            <div onClick={toggleMenu} className="MobileViewOpenBtn">
                <h3>{ menu ? 'stäng profil meny ↑' : 'öppna profil meny ↓' }</h3>
            </div>
            <ul className={menu ? 'openProfileLinks' : ''}>
                <li>
                    <NavLink 
                        to="/profile/myprofile" 
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='profileLinks'>
                        Min Information
                    </NavLink>
                </li>
                <div className='line'></div>
                <li>
                    <NavLink 
                        to="/profile/exercises/alla" 
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='profileLinks'>
                        Övningar
                    </NavLink>
                </li>
                <div className='line'></div>
                <li>
                    <NavLink 
                        to="/profile/trainingplan" 
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='profileLinks'>
                        Träningsplan
                    </NavLink>
                </li>
                <div className='line'></div>
                <li>
                    <NavLink 
                        to="/profile/sleepplan" 
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='profileLinks'>
                        Sömnplan
                    </NavLink>
                </li>
                <div className='line'></div>
                <li>
                    <NavLink 
                        to="/profile/dietplan" 
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='profileLinks'>
                        Kostplan
                    </NavLink>
                </li>
            </ul>
        </section>
    )
}


export default SecondaryHeader;