# Pokedex-App

#https://67a99b12e493bd497db30082--pokedex-app-project-96.netlify.app

#Description
This project is a web application that provides the ability to learn about pokemon, and pokemon stats.
It allows users to create an account and log in with their credentials to save favorite privately.
The backend API is custom-built using Python and serves as the core of the application, managing user interactions and data storage.



## This website purpose is to learn about pokemon and pokemon stats

## Features
-User Authentication: Secure registration and login system to personalize user experience.
-Data Management: Users can create, update, and delete [items, expenses, tasks, etc.]
-API: The backend API handles requests efficiently and securely.

# Running Tests
Test are located in the pages/ directory. To run tests, execute:
npm test
Make sure you have jest installed:
pip install jest


## User Flow 
1. Sign Up/Login: Users create an account or log in.
2. Dashboard: Users access a personalized dashboard.
3. Perform Action: Add and delete from favorite
4. View Insights: Users analyze pokemon data using reports or visualizations.
5. Logout: Securely end the session.

The API is built with Flask/FastAPI and serves as the backend for the application. The API supports:

# API Documentation
- GET /items - Fetch all items.
- POST /items - Create a new item.
- PUT /items/{id} - Update an item.
- DELETE /items/{id} - Delete an item.

# Technology Stack
- Backned: Python, Flask
- Database: PostgreSQL/MySQL
- Frontend: React.js
- Testing: Jest
- Deployment: Fly.io, netlify

# Additional Notes
- Ensure you have all dependencies installed before running the project.
- The project follows best practices for code organization and API security

# Getting Started
1. Clone the repository: git clone https://github.com/obey96/Pokedex-final-project
2. Navigate to the project: cd pokedex-app
3. Install dependencies: pip install -r requirements.txt
4. Run the application: flask run
5. Run the fronend: npm start









