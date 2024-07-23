from flask import Flask
from flask_mail import Mail

from flask_cors import CORS

from views import views
from userInfo import profil
from login_register import login_register
from trainingplan_quiz import trainingplan_quiz
from cart import cart
from trainingplan import trainingplan
from exercises import exercises
from stripe_python import stripePy
from dietplan import dietplan
from sleepplan import sleepplan

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')

app.secret_key = "scandifit0412175416"
CORS(app, supports_credentials=True)  # Enable CORS for all routes
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)

app.register_blueprint(views)
app.register_blueprint(profil)
app.register_blueprint(login_register)
app.register_blueprint(trainingplan_quiz)
app.register_blueprint(cart)
app.register_blueprint(trainingplan)
app.register_blueprint(exercises)
app.register_blueprint(stripePy)
app.register_blueprint(dietplan)
app.register_blueprint(sleepplan)

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

@app.route('/')
@app.route('/home')
@app.route('/contactus')
@app.route('/login')
@app.route('/register')
@app.route('/profile/myprofile')
@app.route('/trainingplan/quiz')
@app.route('/sleepplan/quiz')
@app.route('/dietplan/quiz')
@app.route('/profile/trainingplan')
@app.route('/profile/sleepplan')
@app.route('/profile/dietplan')

# @app.route('/profile/exercises/:muscle')
# @app.route('/profile/exercise/:id')
# @app.route('/ordercomplete/:sessionId')

@app.route('/profile/exercises/<muscle>')
@app.route('/profile/exercise/<id>')
@app.route('/ordercomplete/<sessionId>')

@app.route('/products/multivitamin')
def index():
    return app.send_static_file('index.html')

if "__main__" == __name__:
    app.run(port=8000, debug=True)