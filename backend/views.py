# from flask import Blueprint, render_template
from flask import Blueprint, render_template, request, jsonify
from flask_mail import Message
from db import mail

views = Blueprint('views', __name__)

@views.route("/api/send_message", methods=['GET', 'POST'])
def send_message():
    '''
    Takes Information From Contact Form and sends It as a mail to us and to them.
    '''

    try:
        # Fetching info sent from frontend react
        data = request.get_json()

        namn = data.get('name')
        email = data.get('email')
        meddelande = data.get('meddelande')
            
        # for mail sending 
        msg = Message('Vi Har Tagit Emot Ditt Medelande', recipients=[email, 'kontakta@scandifit.se'])
        msg.html = render_template('mail_contact.html', namn=namn, meddelande=meddelande)
        mail.send(msg)  # Use 'mail', not 'Mail'
        return jsonify(
            {
                'success': True
            }
        )
    except:
        return jsonify(
            {
                'success': False
            }
        )