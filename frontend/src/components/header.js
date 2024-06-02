// import logo from './logo.svg';
import '../styles/header.css';

function Header() {
  return (
    <header>

        <div class="upper-nav">
            <main>
                <a href="/#kontakta-oss">Kontakta@scandifit.se</a>
                <h2>En Minut, Ett Starkare Du – Gratis Träningsschema Nu!</h2>
                <a href="/jobb">Jobba Hos Oss</a>
            </main>
        </div>
        
        <nav>
            <main>
                <div>
                <a href="/"><img src="images/logo.png" alt="Logo" /></a>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/#kontakta-oss">Kontakta Oss</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/multivitamin">Multivitamin</a></li>
                        <li><a href="https://www.postnord.se/vara-verktyg/spara-brev-paket-och-pall">Spåra Order</a></li>
                    </ul> 
                </div>

                <aside>
                    <a href="{% if 'user_id' in session %} /profile/trainingplan {% else %} /login {% endif %}">
                        <img src="images/icons/user.png" alt="Logga In" /> 
                        <h3>Logga In</h3>
                    </a>
                    <a id="open-cart">
                        <p>1</p>
                        <img src="images/icons/cart.png" alt="Kundvagn" />
                        <h3>Kundvagn</h3>
                    </a>
                    <a class="button-link" href="{% if 'user_id' in session %} /profile/trainingplan {% else %} /trainingplan/quiz {% endif %}">Individuell träningsplan</a>
                    <img src="images/icons/hamburger-menu.png" alt="Hamburger Menu" id="hamburger-menu" />
                </aside>
            </main>
        </nav>

    </header>
  );
}

export default Header;