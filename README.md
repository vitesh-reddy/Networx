# Networx

Networx is a platform designed to facilitate networking at events, allowing participants to discover and connect with others based on mutual interests.

## Features

- User authentication and profile management.
- Chat functionality for individual and group conversations.
- Event creation and discovery.
- Personalized recommendations based on user interests.

---

## Folder Structure

```
Backend/
    server.js
    routes/
    models/
    middleware/
    api/
Frontend/
    src/
        Components/
        Pages/
```

---

## Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (running locally or on a cloud service like MongoDB Atlas)

---

## Installation

### Clone the repository:

   ```bash
   git clone https://github.com/vitesh-reddy/Networx.git
   cd Networx
   ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and add the following:
   ```
   MONGO_URI=<your_mongodb_connection_string>
   PORT=3000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

---

## Usage

1. Open your browser and navigate to:
   - **Frontend**: `http://localhost:5173`
   - **Backend API**: `http://localhost:3000/api`

2. Register a new user or log in to access the platform.

3. Explore features like event creation, chat, and personalized recommendations.

---

## API Documentation

API documentation is available in the `apiDoc.md` file located in the backend directory.

---

## Scripts

### Backend

- **Start Server**:
  ```bash
  npm run backend
  ```

- **Run in Development Mode**:
  ```bash
  npm run dev
  ```

### Frontend

- **Start Development Server**:
  ```bash
  npm run frontend
  ```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

## Contact

For any inquiries or support, please contact the me

--- 
