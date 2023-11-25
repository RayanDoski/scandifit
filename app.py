from flask import Flask
from flask_mail import Mail

from views import views
from profil import profil
from login_register import login_register
from recentioner import recensioner
from quiz import quiz
from checkout import checkout

app = Flask(__name__)

app.secret_key = "scandifit04121754161"

app.register_blueprint(views)
app.register_blueprint(profil)
app.register_blueprint(login_register)
app.register_blueprint(recensioner)
app.register_blueprint(quiz)
app.register_blueprint(checkout)

# Configure the sender address
app.config['MAIL_DEFAULT_SENDER'] = 'kontakta@scandifit.se'

#for mail sending
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Outgoing server name
app.config['MAIL_PORT'] = 587  # Port for STARTTLS
app.config['MAIL_USE_TLS'] = True  # Use TLS for secure connection
app.config['MAIL_USE_SSL'] = False  # Disable SSL
app.config['MAIL_USERNAME'] = 'kontakta.scandifit@gmail.com'
app.config['MAIL_PASSWORD'] = 'exyt gssr sfdf tmby'

mail = Mail(app)

if "__main__" == __name__:
    app.run(port=8000, debug=True)