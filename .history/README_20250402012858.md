# Online Voting System - Backend API

![Project Logo](https://via.placeholder.com/150x50?text=Online+Voting+System)  
*A secure and anonymous voting platform with real-time results analysis*

## Table of Contents
- [Online Voting System - Backend API](#online-voting-system---backend-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [API Documentation](#api-documentation)
    - [Authentication](#authentication)
    - [Polls](#polls)
    - [Votes](#votes)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Configuration](#configuration)
  - [Running the App](#running-the-app)
    - [Development](#development)
    - [Production](#production)
  - [Testing](#testing)
  - [Deployment](#deployment)
    - [Heroku](#heroku)
    - [Docker](#docker)
  - [Security](#security)
    - [Implemented Measures](#implemented-measures)
    - [Recommendations](#recommendations)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Features

🔒 **Secure Authentication**
- JWT-based user registration and login
- Password hashing with bcrypt
- Protected API endpoints

🗳️ **Voting System**
- Create polls with multiple options
- Anonymous voting with encrypted voter IDs
- Prevention of duplicate voting
- Real-time vote counting and results

📊 **Advanced Analytics**
- Percentage calculations per option
- Automatic winner determination
- Realistic data with ±5% fake votes
- Comprehensive poll statistics

🛡️ **Security**
- Encrypted voter information
- Input validation
- Secure API design

## Tech Stack

**Backend**
- Node.js (v16+)
- Express.js
- MongoDB (v5+)
- Mongoose ODM

**Security**
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- AES-256-CBC encryption

**Utilities**
- dotenv for environment variables
- morgan for HTTP request logging
- crypto for encryption

## API Documentation

### Authentication

| Endpoint          | Method | Description                     | Protected |
|-------------------|--------|---------------------------------|-----------|
| `/api/auth/register` | POST   | Register new user               | No        |
| `/api/auth/login`    | POST   | Login existing user             | No        |

### Polls

| Endpoint                | Method | Description                     | Protected |
|-------------------------|--------|---------------------------------|-----------|
| `/api/polls`            | POST   | Create new poll                 | Yes       |
| `/api/polls/user`       | GET    | Get polls created by user       | Yes       |
| `/api/polls/:id`        | GET    | Get poll details                | Yes       |
| `/api/polls/:id/results`| GET    | Get poll results with analytics | Yes       |

### Votes

| Endpoint                | Method | Description                     | Protected |
|-------------------------|--------|---------------------------------|-----------|
| `/api/votes/:pollId`    | POST   | Cast vote in a poll             | Yes       |

**Note:** All protected routes require JWT in Authorization header (`Bearer <token>`)

## Installation

### Prerequisites
- Node.js v16 or higher
- MongoDB (local or cloud instance)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/its-kundan/online-voting-system-backend.git
   cd online-voting-system-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Configuration

1. Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/voting-app
   JWT_SECRET=your-strong-jwt-secret-here
   JWT_EXPIRES_IN=1d
   ENCRYPTION_KEY=32-char-encryption-key-here
   NODE_ENV=development
   PORT=5000
   ```

2. Replace the placeholder values with your actual configuration.

## Running the App

### Development
```bash
npm run dev
# or
yarn dev
```

The server will start with nodemon for automatic reloading.

### Production
```bash
npm start
# or
yarn start
```

The API will be available at `http://localhost:5000` by default.

## Testing

To run tests (if available):
```bash
npm test
# or
yarn test
```

## Deployment

### Heroku
1. Create a new Heroku app
2. Set config vars in Heroku dashboard (same as `.env` file)
3. Connect your GitHub repository
4. Enable automatic deploys

### Docker
1. Build the Docker image:
   ```bash
   docker build -t voting-backend .
   ```
2. Run the container:
   ```bash
   docker run -p 5000:5000 --env-file .env voting-backend
   ```

## Security

### Implemented Measures
- Password hashing with bcrypt
- JWT authentication
- Encrypted voter IDs
- Input validation
- Secure HTTP headers (via helmet - recommended to add)

### Recommendations
- Use HTTPS in production
- Implement rate limiting
- Add CORS restrictions
- Regular dependency updates

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Maintainer - [Kundan Kumar](mailto:kundan@example.com)  
LinkedIn - [Kundan Kumar](https://www.linkedin.com/in/its-kundan/)  
GitHub - [its-kundan](https://github.com/its-kundan)  
Twitter - [@kundan_k_](https://x.com/kundan_k_)  

Project Link - [https://github.com/its-kundan/online-voting-system-backend](https://github.com/its-kundan/online-voting-system-backend)

---

**Note:** This README assumes you've set up the project with the structure and code provided earlier. Adjust any details as needed for your specific implementation.

