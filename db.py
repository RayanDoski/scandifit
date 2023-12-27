import pymysql
import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="Rayan12345",
    database="scandifit"
)

cursor = db.cursor()

from flask_mail import Mail

mail = Mail()