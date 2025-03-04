## MERN Notes App

 A full-stack MERN (MongoDB, Express, React, Node.js) application for managing notes with authentication, speech-to-text, and favorites functionality.

 Features

 User Authentication (Signup/Login)

 Create, Read, Update, and Delete Notes

 Speech-to-Text for Notes

 Favorite Notes (Stored in Local Storage)

 Search and Sort Notes

 Installation & Setup

 1. Clone the Repository

 git clone https://github.com/your-username/mern-notes-app.git
 cd mern-notes-app

 2. Set Up the Backend

 cd backend
 npm install

 Create a .env file in the backend folder:

 MONGO_URI=your_mongodb_connection_string
 PORT=5000
 CLIENT_URL=http://localhost:3000
 JWT_SECRET=your_jwt_secret

 Start the Backend Server:

 npm start

 The backend will run on http://localhost:5000

 3. Set Up the Frontend

 cd ../frontend
 npm install

 Create a .env file in the frontend folder:

 VITE_API_BASE_URL=http://localhost:5000/api
 VITE_API_KEY=your_text_to_speech_api_key

 Start the Frontend:

 npm run dev

 The frontend will run on http://localhost:3000

 Set environment variables (MONGO_URI, PORT, CLIENT_URL, etc.).

 API Routes

 Authentication

 POST /api/auth/signup → Register a new user

 POST /api/auth/login → Login and receive JWT token

 Notes

 GET /api/notes/ → Fetch all notes

 POST /api/notes/ → Create a new note

 PUT /api/notes/:id → Update a note

 DELETE /api/notes/:id → Delete a note

