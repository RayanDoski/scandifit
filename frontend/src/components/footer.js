
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

function DropDownMenu({heroText, linkOne, textOne, linkTwo, textTwo, linkThree, textThree}) {

    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);

    const HandleDropDownMenuClicks = () => {
        setIsDropDownMenuOpen(!isDropDownMenuOpen);
    };

    return (
        <div onClick={HandleDropDownMenuClicks}>
            <div>
                <h2>{heroText}</h2>
                <h2 className='OpenCloseFooterLinks'>{ isDropDownMenuOpen ? '-' : '+' }</h2>
            </div>
            <aside className={ isDropDownMenuOpen ? 'open' : '' }>
                <Link className='Link' to={linkOne}>{textOne}</Link>
                <Link className='Link' to={linkTwo}>{textTwo}</Link>
                <Link className='Link' to={linkThree}>{textThree}</Link>
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
            <DropDownMenu heroText='Scandifit' linkOne='/contactus' textOne='Kontakta Oss' linkTwo='/contactus' textTwo='Användarvillkor' linkThree='/contactus' textThree='Returpolicy' />
            <DropDownMenu heroText='Planer' linkOne='/profile/trainingplan' textOne='Träningsplan' linkTwo='/profile/dietplan' textTwo='Kostplan' linkThree='/profile/sleepplan' textThree='Sömnplan' />
            <DropDownMenu heroText='Användare' linkOne='/login' textOne='Logga In' linkTwo='/register' textTwo='Registrera Dig' />
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