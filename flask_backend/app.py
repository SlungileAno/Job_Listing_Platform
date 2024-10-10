from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load jobs from CSV
def load_jobs():
    return pd.read_csv('flask_backend/jobs.csv')

# Save jobs to CSV
def save_jobs(jobs_df):
    jobs_df.to_csv('flask_backend/jobs.csv', index=False)

@app.route('/jobs', methods=['GET'])
def get_jobs():
    jobs_df = load_jobs()
    jobs = jobs_df.to_dict(orient='records')
    return jsonify(jobs)

@app.route('/jobs', methods=['POST'])
def add_job():
    job = request.json
    jobs_df = load_jobs()
    
    # Ensure job_id is unique
    if job['job_id'] in jobs_df['job_id'].values:
        return jsonify({'error': 'Job ID already exists'}), 400
    
    new_job = pd.DataFrame([job])
    jobs_df = pd.concat([jobs_df, new_job], ignore_index=True)

    save_jobs(jobs_df)
    return jsonify(job), 201

if __name__ == '__main__':
    app.run(debug=True)
