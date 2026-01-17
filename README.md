# Crypto Sentinel

Crypto Sentinel is a crypto price alert system built using Node.js, PostgreSQL, and Docker.
It allows users to create alerts for cryptocurrencies and automatically triggers alerts when predefined price conditions are met.
A background worker continuously monitors prices using the CoinGecko API.

---

## Technology Stack

- Backend: Node.js, Express
- Database: PostgreSQL
- Background Worker: node-cron
- Frontend: HTML, Bootstrap, jQuery
- Containerization: Docker, Docker Compose
- External API: CoinGecko

---

## Project Structure

```bash
crypto-sentinel/
├── public/                 # Frontend files (HTML, CSS, JS)
├── src/
│   ├── controllers/
│   ├── services/
│   ├── workers/
│   ├── config/
│   └── server.js
├── database/               # SQL scripts (optional)
├── Dockerfile
├── docker-compose.yml
├── .env
├── package.json
└── README.md

```

## ⚙️ Configuration

Create a .env file in the project root directory:

    PORT=3000
    DB_HOST=postgres
    DB_PORT=5432
    DB_USER=crypto_user
    DB_PASSWORD=admin@123
    DB_NAME=crypto_sentinel
    COINGECKO_API=https://api.coingecko.com/api/v3/simple/price

Note: When running via Docker, the app connects to the postgres service name. For local development, ensure your local PostgreSQL instance is running on localhost.

## 🚀 Getting Started

# Running Locally
    1. Install Dependencies:
        npm install
    2. Database Setup: Ensure PostgreSQL is running and create the necessary tables using the init.sql script found in the /database folder.
    3. Start the Application:
        npm run dev
    4. Access the app at: http://localhost:3000

# Running with Docker Compose:
    1. Build and Launch:
        docker compose up --build
    2. Database Setup: Ensure the necessary tables using the init.sql script found in the /database folder.
    3. Access the App: The application will be live at http://localhost:3000.

# Running Tests:
    1. This project includes unit and integration tests to validate API endpoints and alert-triggering logic.
    2. Run all tests using:
        npm test

## 🧠 Alert Logic & Features

    ## Trigger Logic
        - Condition ABOVE: Triggers when the current market price exceeds the user's target price.
        - Condition BELOW: Triggers when the current market price falls below the user's target price.
        - State Management: Once triggered, an alert's status changes from ACTIVE to TRIGGERED. It will remain inactive until manually reset or deleted to prevent redundant notifications.
    
    ---

    ## Trigger Notifications (Console Logging)

        - When an alert is triggered, the system logs a message to the application console indicating:
        - The cryptocurrency name
        - The current market price at the time of trigger

        Example log output:
            ALERT TRIGGERED: BITCOIN at $65234.12

## Key Features
    - RESTful API: Robust endpoints for managing price alerts.
    - Automated Monitoring: Background worker ensures 24/7 price tracking.
    - Persistent Storage: Data remains secure in a PostgreSQL database.
    - Interactive UI: A clean Bootstrap-based interface to create, view, reset, and delete alerts.

## 🤖 AI Disclosure
    - AI tools were utilized during development to assist with:
    - Backend architecture design and Docker configuration.
    - Frontend logic structuring and documentation drafting.

## Author: Rohithparthiban K, Software Engineer
