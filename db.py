import mysql.connector

def make_db_connection():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="Rayan12345",
        database="scandifit",
    )
    return db

from flask_mail import Mail

mail = Mail()