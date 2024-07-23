import pymysql

def make_db_connection():
    '''
    This Function Makes The Connection With The Database
    '''
    db = pymysql.connect(
        host="localhost",
        user="root",
        passwd="Rayan12345",
        database="scandifit",
    )
    return db

from flask_mail import Mail

mail = Mail()