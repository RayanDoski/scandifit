import pymysql
import mysql.connector
def start_db_connection():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="Rayan12345",
        database="scandifit",
    )
    cursor = db.cursor()

    return cursor, db

# def close_db_connection():
#     cursor.close()
#     db.close()

from flask_mail import Mail

mail = Mail()