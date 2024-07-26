from flask import Flask, request, jsonify, render_template
import psycopg2
from psycopg2.extras import RealDictCursor
import atexit

app = Flask(__name__)

# Database connection parameters
DB_HOST = 'your_db_host'
DB_NAME = 'astrobattles'
DB_USER = 'your_db_user'
DB_PASS = 'your_db_password'

def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )
    return conn

@app.route('/')
def index():
    """Serve the index.html file from the templates directory."""
    return render_template('index.html')

@app.route('/api/score', methods=['POST'])
def save_score():
    data = request.get_json()
    name = data['name']
    score = data['score']
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO scores (name, score) VALUES (%s, %s)", (name, score))
    conn.commit()
    cur.close()
    conn.close()
    
    return jsonify({"message": "Score saved successfully!"})

def drop_database():
    """Drop the database when the application exits (TESTING PURPOSES FOR REMOVAL OF UNNECESSARY DATA)."""
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,  
            user=DB_USER,
            password=DB_PASS
        )
        conn.autocommit = True  # Required for database drop
        cur = conn.cursor()
        cur.execute(f"DROP DATABASE IF EXISTS {DB_NAME};")
        cur.close()
        conn.close()
        print(f"Database {DB_NAME} deleted successfully.")
    except Exception as e:
        print(f"An error occurred while deleting the database: {e}")

atexit.register(drop_database)
if __name__ == '__main__':
    app.run(debug=True)
