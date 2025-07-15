import os
import psycopg2
from flask_mail import Mail

# Get database credentials from environment variables
DB_HOST = os.getenv('POSTGRES_HOST', 'localhost')
DB_USER = os.getenv('POSTGRES_USER', 'rayan')
DB_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'Rayan0412175416')
DB_NAME = os.getenv('POSTGRES_DB', 'scandifit_db')

def make_db_connection():
    print("Connecting to the database...")
    print(f"Using credentials: {DB_USER}@{DB_HOST}/{DB_NAME}")
    db = psycopg2.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        dbname=DB_NAME,
    )
    print("Database connection established")
    return db

mail = Mail()