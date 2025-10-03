# Bluestock Backend Setup Guide

This guide will help you set up the complete backend infrastructure for the Bluestock Financial Platform.

## 🎯 Overview

The backend consists of:
- **Node.js + Express** API server
- **PostgreSQL** for user authentication & company profiles
- **MySQL** for ML analysis results
- **Firebase** for authentication & OTP verification
- **Cloudinary** for image storage
- **Python** ML service for financial analysis

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- MySQL 8+
- Python 3.9+
- Firebase account
- Cloudinary account

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in your backend directory:

```env
# General
PORT=5000
NODE_ENV=development

# Bluestock API
BLUESTOCK_API_BASE=https://bluemutualfund.in/server/api/company.php
BLUESTOCK_API_KEY=your_api_key_here

# PostgreSQL (Auth & Profiles)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=bluestock_users
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_pg_password

# MySQL (ML Results)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=bluestock_financials
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_APP_ID=your_app_id
FIREBASE_MESSAGING_SENDER_ID=your_sender_id

# JWT
JWT_SECRET=super_secret_key_change_this
JWT_EXPIRES_IN=90d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Database Setup

#### PostgreSQL Setup

```sql
-- Create database
CREATE DATABASE bluestock_users;

-- Connect to database
\c bluestock_users;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    signup_type CHAR(1) NOT NULL DEFAULT 'e',
    gender CHAR(1) NOT NULL CHECK (gender IN ('m','f','o')),
    mobile_no VARCHAR(20) UNIQUE NOT NULL,
    is_mobile_verified BOOLEAN DEFAULT FALSE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create company_profile table
CREATE TABLE IF NOT EXISTS company_profile (
    id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    website TEXT,
    logo_url TEXT,
    banner_url TEXT,
    industry TEXT NOT NULL,
    founded_date DATE,
    description TEXT,
    social_links JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_company_owner ON company_profile(owner_id);
```

#### MySQL Setup

```sql
-- Create database
CREATE DATABASE bluestock_financials;

-- Use database
USE bluestock_financials;

-- Create ml table
CREATE TABLE IF NOT EXISTS ml (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id VARCHAR(32) NOT NULL UNIQUE,
    pros JSON,
    cons JSON,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_company_id (company_id)
);
```

### 3. Backend Server Setup

```bash
# Create backend directory
mkdir backend && cd backend

# Initialize npm
npm init -y

# Install dependencies
npm install express cors helmet express-validator bcryptjs jsonwebtoken
npm install pg mysql2 firebase-admin cloudinary
npm install dotenv morgan
npm install --save-dev nodemon @types/node

# Create directory structure
mkdir src
mkdir src/routes src/controllers src/middleware src/config src/utils
```

### 4. Backend API Endpoints

Create the following endpoints in your Express server:

#### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-otp` - Verify OTP

#### Company Routes
- `POST /api/company/register` - Create/update company profile
- `GET /api/company/:id` - Get company details + ML results
- `GET /api/companies` - List all companies
- `PUT /api/company/:id` - Update company profile

#### Analytics Routes
- `GET /api/analytics` - Get aggregated stats

### 5. Python ML Service Setup

```bash
# Create ML directory
mkdir ml-service && cd ml-service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install requests pandas numpy openpyxl pymysql python-dotenv
```

Create `ml_analysis.py`:

```python
import requests
import pandas as pd
import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

# Configuration
API_BASE = os.getenv('BLUESTOCK_API_BASE')
API_KEY = os.getenv('BLUESTOCK_API_KEY')

# MySQL connection
conn = pymysql.connect(
    host=os.getenv('MYSQL_HOST'),
    user=os.getenv('MYSQL_USER'),
    password=os.getenv('MYSQL_PASSWORD'),
    database=os.getenv('MYSQL_DB')
)

def fetch_company_data(company_id):
    """Fetch financial data from Bluestock API"""
    url = f"{API_BASE}?id={company_id}&api_key={API_KEY}"
    response = requests.get(url)
    return response.json()

def classify_metrics(data):
    """Classify metrics into Pros (>10%) and Cons (<10%)"""
    pros = []
    cons = []
    
    # Define metrics to analyze
    metrics = [
        'revenue_growth', 'net_profit_growth', 'eps_growth',
        'operating_margin', 'debt_equity_ratio', 'current_ratio'
    ]
    
    for metric in metrics:
        if metric in data:
            change = calculate_percentage_change(data[metric])
            
            if change > 10:
                pros.append({
                    'metric': metric,
                    'value': f"+{change:.1f}%",
                    'year': data.get('year', '2024')
                })
            elif change < -10:
                cons.append({
                    'metric': metric,
                    'value': f"{change:.1f}%",
                    'year': data.get('year', '2024')
                })
    
    # Return max 3 pros and 3 cons
    return pros[:3], cons[:3]

def save_to_mysql(company_id, pros, cons):
    """Save ML results to MySQL"""
    cursor = conn.cursor()
    
    query = """
        INSERT INTO ml (company_id, pros, cons, metadata)
        VALUES (%s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            pros = %s,
            cons = %s,
            updated_at = CURRENT_TIMESTAMP
    """
    
    import json
    pros_json = json.dumps(pros)
    cons_json = json.dumps(cons)
    metadata = json.dumps({'processed_at': str(pd.Timestamp.now())})
    
    cursor.execute(query, (
        company_id, pros_json, cons_json, metadata,
        pros_json, cons_json
    ))
    conn.commit()

# Run analysis
if __name__ == '__main__':
    # Read Nifty100 company IDs from CSV
    companies = pd.read_csv('nifty100.csv')
    
    for _, row in companies.iterrows():
        company_id = row['company_id']
        print(f"Processing {company_id}...")
        
        data = fetch_company_data(company_id)
        pros, cons = classify_metrics(data)
        save_to_mysql(company_id, pros, cons)
    
    conn.close()
```

### 6. Frontend Configuration

Update your frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### 7. Running the Application

```bash
# Terminal 1: Start PostgreSQL
# Terminal 2: Start MySQL
# Terminal 3: Start Backend
cd backend
npm run dev

# Terminal 4: Start Frontend
cd frontend
npm run dev

# Terminal 5: Run ML Service (when needed)
cd ml-service
python ml_analysis.py
```

## 🔒 Security Checklist

- [ ] Use strong JWT secret (min 32 characters)
- [ ] Enable CORS only for trusted origins
- [ ] Use helmet.js for security headers
- [ ] Sanitize all user inputs
- [ ] Use parameterized queries
- [ ] Hash passwords with bcrypt (min 10 rounds)
- [ ] Rate limit API endpoints
- [ ] Enable HTTPS in production

## 📊 API Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## 🧪 Testing

```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

## 📝 Additional Notes

- The frontend is already built and ready to connect to your backend
- Mock data is used in the frontend for demonstration
- Replace mock API calls with real endpoints once backend is ready
- Firebase setup requires creating a project at https://firebase.google.com
- Cloudinary account can be created at https://cloudinary.com

## 🤝 Support

For issues or questions, refer to:
- Express.js docs: https://expressjs.com
- PostgreSQL docs: https://www.postgresql.org/docs
- MySQL docs: https://dev.mysql.com/doc
- Firebase docs: https://firebase.google.com/docs

## 📄 License

This project is part of the Bluestock Financial Platform.
