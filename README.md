
# Calorie Tracker

A calorie Tracker tool to log daily food intake, track calories consumed, and view calorie entries day-wise. The project includes:

- **Backend**: Built with Express.js and MongoDB.
- **Frontend**: Built with React and Tailwind CSS.

## Features

### Backend:
- User authentication.(Email Auth)
- Logging daily food intake.
- Tracking total calorie consumption.
- Viewing calorie entries day-wise.

### Frontend:
- User-friendly interface for logging and tracking food intake.
- Responsive design using Tailwind CSS.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: [Download here](https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js.
- **MongoDB**: [Download here](https://www.mongodb.com/try/download/community)
- **Git**: [Download here](https://git-scm.com/)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chintamani-pala/Calorie-Tracker.git
   cd Calorie-Tracker
   ```

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

---

## Setup

### Backend:
1. Create a `.env` file in the `backend` directory and configure the following variables:
   ```env
   PORT = 8000 #port for run server
   MODE_ENV = development #application environment
   DB_URL =  mongodb_url_link
   ORIGIN = frontend url
   REDIS_URL = redisurl
   ACCESS_TOKEN = secret key for access token generation
   ACCESS_TOKEN_EXPIRE = expire time(5,10)
   ACTIVATION_SECRET = random numbers
   REFRESH_TOKEN = secret key for refresh token generation
   REFRESH_TOKEN_EXPIRE = expire time(5,10)
   SMTP_HOST = mail host
   SMTP_MAIL = mailid
   SMTP_PASSWORD = mail password
   SMTP_PORT = mail port
   ```

2. Start the backend server:
   ```bash
   npm run start
   ```

3. The backend server will run at `http://localhost:8000`.

### Frontend:
1. Create a `.env` file in the `frontend` directory and configure the following variable:
   ```env
   VITE_BACKEND_URL = backend url
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```

3. The frontend will be accessible at `http://localhost:5173`.

---

## Usage

1. Navigate to `http://localhost:5173` in your browser.
2. Register or log in to your account.
3. Start logging your daily food intake and track your calories.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

---

## Contact

For questions or feedback, please contact [chintamanipala67@gmail.com](mailto:chintamanipala67@gmail.com).

--- 