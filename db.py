import mysql.connector
def establish_database_connection():
    while True:
        try:
            db = mysql.connector.connect(
                host="localhost",
                user="root",
                passwd="Rayan12345",
                database="scandifit",
            )
            return db
        except:
            print("CONNECTION FAILED")

db = establish_database_connection()
cursor = db.cursor()

from flask_mail import Mail

mail = Mail()