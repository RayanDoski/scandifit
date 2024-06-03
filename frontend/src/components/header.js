
// Images
import logo from '../images/logo.png';

// Importing CSS
import '../styles/header.css';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Header() {
  return (
    <header className='HeaderForWebsite'>

        <aside className='LogoContainer'>
            <img className='Logo' src={logo} alt='Logo' />
        </aside>

        <ul className='HeaderLinks'>
            <Link className='Link' to="/">Program</Link>
            <Link className='Link' to="/">Produkter</Link>
            <Link className='Link' to="/">Kontakta Oss</Link>
            <Link className='CartLink' to="/">
                Kundvagn
                <p className='AmountInCart'>1</p>
            </Link>
        </ul>

        <aside className='ButtonContainer'>
            <Link className='ButtonLink' to="/">Börja Gratis</Link>
        </aside>

    </header>
  );
}

export default Header;