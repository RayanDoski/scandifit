
// Images
import WhiteLogo from '../images/logo-footer.png';
import KlarnaIcon from '../images/payment-alternativ/klarna.svg';
import AppleIcon from '../images/payment-alternativ/apple-pay.png';
import MasterCardIcon from '../images/payment-alternativ/card.png';
import AmexIcon from '../images/payment-alternativ/amex.png';
import visaIcon from '../images/payment-alternativ/visa.png';

// Importing CSS
import '../styles/footer.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form } from 'react-router-dom';

function DropDownMenu() {

    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);

    const HandleDropDownMenuClicks = () => {
        setIsDropDownMenuOpen(!isDropDownMenuOpen);
    };

    return (
        <div onClick={HandleDropDownMenuClicks}>
            <div>
                <h2>Scandifit</h2>
                <h2 className='OpenCloseFooterLinks'>{ isDropDownMenuOpen ? '-' : '+' }</h2>
            </div>
            <aside className={ isDropDownMenuOpen ? 'open' : '' }>
                <Link className='Link' to='/'>Kontakta Oss</Link>
                <Link className='Link' to='/'>Användarvillkor</Link>
                <Link className='Link' to='/'>Returpolicy</Link>
            </aside>
        </div>
    )
}

function Footer() {

  return (
    <section className='FooterContainer'>

        <div className='ContainerForLogoAndLink'>
            <img src={WhiteLogo} alt='Logo' />
            <Link className='LinkButton'>Börja Gratis</Link>
        </div>

        <div className='Line'></div>

        <article>
            <DropDownMenu />
            <DropDownMenu />
            <DropDownMenu />
        </article>

        <aside>
            <p>©2024 Scandifit. All rights reserved.</p>
            <div></div>
            <img src={KlarnaIcon} alt='PaymentIcons'/>
            <img src={AppleIcon} alt='PaymentIcons'/>
            <img src={MasterCardIcon} alt='PaymentIcons'/>
            <img src={AmexIcon} alt='PaymentIcons'/>
            <img src={visaIcon} alt='PaymentIcons'/>
        </aside>

    </section>
  );
  
}

export default Footer;