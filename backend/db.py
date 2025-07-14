import os
import pymysql
from flask_mail import Mail

# Get database credentials from environment variables
# These variable names should match those in your docker-compose.yml
DB_HOST = os.getenv('MYSQL_HOST', 'localhost') # Default to 'localhost' for local dev without Docker Compose
DB_USER = os.getenv('MYSQL_USER', 'root')
DB_PASSWORD = os.getenv('MYSQL_PASSWORD', 'your_db_password') # Use a fallback that's easy to spot if missing
DB_NAME = os.getenv('MYSQL_DB', 'scandifit') # Ensure this matches your init.sql and docker-compose.yml

def make_db_connection():
    '''
    This Function Makes The Connection With The Database
    '''
    db = pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        passwd=DB_PASSWORD,
        database=DB_NAME,
    )
    return db

mail = Mail()