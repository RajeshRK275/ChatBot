# ChatBot
# Chatbot Interface with LLM Response Formatting and Memory Store

## Project Description
This project is a simple chatbot interface that integrates with a Large Language Model (LLM) API. The chatbot accepts user questions, sends them to the API, formats the responses, and allows users to save the results. It features an intuitive user interface, an admin panel for managing users and responses, History tab to check the saved responses and robust state management using Redux.

## Installation Instructions
Follow these steps to set up the project locally:

### Prerequisites
- Node.js (version 14 or above)

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/RajeshRK275/ChatBot.git
2. **Install backend dependencies:**
   cd Backend
   npm install
4. **Install backend dependencies:**
   cd ..
   cd Frontend
   cd chatbot
   npm install
5. **Add the Environment Variables for Backend:**
   add the .env file
   MONGO_URI=mongodb+srv://rajesheswaran27599:yjf6Mh7zEGgfmLgc@cluster1.y213b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
JWT_SECRET=def526e0bc801da0beace0c0e65643f98da6819e13c85be02b3c3df811a1ee48745b003bc033d7270b6ab7729221df1866097d45988adf0146dbee80d99df824

7. **Add the Environment Variables for Frontendend:**
   add the .env file
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_PRODUCTION_BACKEND_URL=https://chat-bot-server-chi.vercel.app/api
   REACT_APP_ENVIRONMENT=DEV
   REACT_APP_AI_URL=https://api.ai21.com/studio/v1/chat/completions
   REACT_APP_AI_TOKEN=8dBTGGWPx4NzNmZmSrFRfNSRXdLvKBKp

8. **Run the Backend Application:**
   node server.js
9. **Run the Frontend Application**
    npm start

### API Endpoints
  1. To add a user to the application
     POST -> https://your-project-name.vercel.app/api/users/register or http://localhost:5000/api/users/register
     If the user is a admin set the isAdmin to true 
     body{
      email: 'user@example.com',
      password: 'userpassword',
      username: 'username',
      isAdmin: false
    }
### CREDIENTIALS
  Admin_credentials={
  "email": "admin@example.com",
  "password": "securepassword",
  }

  user1={
    email: 'user1@example.com',
    password: 'userpassword',
  }

  user2={
    email: 'user2@example.com',
    password: 'userpassword',
  }
   
   
