# Eurobot AV Dashboard - Server

Backend API server for the Eurobot AV Dashboard platform. Built with Node.js, Express.js, and MongoDB.

## Overview

The server provides REST API endpoints for all platform operations including authentication, team management, match scheduling, score recording, and real-time updates via WebSocket.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js v4.18.2
- **Database**: MongoDB v4.4
- **Real-time Communication**: Socket.io v4.7.1
- **Authentication**: JWT (jsonwebtoken v9.0.2)
- **Password Hashing**: bcrypt v5.1.1
- **Database Client**: Mongoose v7.3.4
- **Additional**: CORS support, Cookie Parser

## Project Structure

```
Server/
├── src/
│   ├── models/                 # MongoDB data models
│   │   ├── user.js            # User account schema
│   │   ├── team.js            # Team schema
│   │   ├── round.js           # Round schema
│   │   ├── match.js           # Match schema
│   │   └── score.js           # Score schema
│   │
│   ├── routes/                 # API route handlers
│   │   ├── auth.js            # Authentication & user management
│   │   │                       # GET /login - User login
│   │   │                       # GET /user - List users (admin only)
│   │   │                       # POST /user - Create user (admin only)
│   │   │                       # DELETE /user - Delete user (admin only)
│   │   │
│   │   ├── team.js            # Team management
│   │   │                       # GET|POST|PATCH|DELETE /team
│   │   │
│   │   ├── match.js           # Match management
│   │   │                       # GET|POST|PATCH|DELETE /match
│   │   │
│   │   ├── round.js           # Round management
│   │   │                       # GET|POST|PATCH|DELETE /round
│   │   │
│   │   ├── score.js           # Score recording
│   │   │                       # GET|POST|PATCH|DELETE /score
│   │   │
│   │   ├── finals.js          # Finals management
│   │   │                       # GET|POST|PATCH|DELETE /finals
│   │   │
│   │   ├── info.js            # Configuration endpoints
│   │   │                       # GET /info - Get configuration
│   │   │
│   │   └── webSocket.js       # WebSocket real-time updates
│   │
│   ├── helpers/                # Utility functions and middleware
│   │   ├── authMiddleware.js  # JWT authentication middleware
│   │   └── createMatch.js     # Match creation utilities
│   │
│   ├── config/                 # Configuration files
│   │   ├── connectDB.js       # MongoDB connection setup
│   │   └── info.js            # Task list & scoring configuration
│   │
│   ├── index.js               # Server entry point
│   └── .env                   # Environment variables (not in repo)
│
├── Dockerfile                  # Docker configuration
└── package.json               # Dependencies and scripts
```

## Configuration

### Environment Variables

Create a `.env` file in the `Server/` directory with the following variables:

```env
# Database connection
DB_CONNECTION_STRING=mongodb://mongodb:27017/EurobotDB

# Server configuration
CLIENT_URL=http://192.168.0.10

# JWT authentication
JTW_SECRET_KEY=your-secure-secret-key
```

**Configuration Details**:
- `DB_CONNECTION_STRING`: MongoDB connection string. In Docker, use `mongodb://mongodb:27017/EurobotDB`
- `CLIENT_URL`: The client application URL. Server only accepts requests from this origin
- `JTW_SECRET_KEY`: Secret key for signing JWT tokens. Use a strong, random string in production

### Task List and Scoring Configuration

The file `src/config/info.js` contains the task list and scoring configuration for your competition edition.

**For setup and configuration instructions**, see the [main README](../readme.md#step-4-configure-tasks-and-scoring) where you'll find detailed information about:
- Task list structure
- Example configurations
- Color settings
- Score estimation options

This configuration is loaded by the server on startup and provides the `/info` API endpoint with task and scoring details used by the client application.

## API Routes

All routes run on port 3001 and require authentication (except `/login`).

### Authentication Routes (`/`)

- **`GET /login`** - User login
- **`GET /user`** - List users (Admin only)
- **`POST /user`** - Create new user (Admin only)
- **`DELETE /user`** - Delete user (Admin only)

### Team Management (`/team`)

- **`GET /team`** - Get teams
- **`POST /team`** - Create team
- **`PATCH /team`** - Update team
- **`DELETE /team`** - Delete team

### Match Management (`/match`)

- **`GET /match`** - Get matches
- **`POST /match`** - Create match
- **`PATCH /match`** - Update match
- **`DELETE /match`** - Delete match

### Round Management (`/round`)

- **`GET /round`** - Get rounds
- **`POST /round`** - Create round
- **`PATCH /round`** - Update round
- **`DELETE /round`** - Delete round

### Score Management (`/score`)

- **`GET /score`** - Get scores
- **`POST /score`** - Record score
- **`PATCH /score`** - Update score
- **`DELETE /score`** - Delete score

### Finals Management (`/finals`)

- **`GET /finals`** - Get finals data
- **`POST /finals`** - Create finals
- **`PATCH /finals`** - Update finals
- **`DELETE /finals`** - Delete finals

### Info/Configuration (`/info`)

- **`GET /info`** - Get platform configuration (tasks, colors, year)

### WebSocket (Real-time Updates)

- Real-time score and match status updates
- Connected clients receive instant notifications
- Authenticated connection required

## Development

### Local Setup (Without Docker)

#### Prerequisites

- Node.js v14 or higher
- MongoDB running locally on `mongodb://localhost:27017`

#### Installation

```bash
cd Server
npm install
```

#### Environment Setup

Create `.env` file:

```env
DB_CONNECTION_STRING=mongodb://localhost:27017/EurobotDB
CLIENT_URL=http://localhost:3000
JTW_SECRET_KEY=dev-secret-key
```

#### Running the Server

```bash
npm start
```

The server will start on `http://localhost:3001`

#### Development with Auto-Reload

The project uses `nodemon` for automatic server restart on file changes:

```bash
npm start
```

### Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing
- **socket.io**: Real-time WebSocket communication
- **cors**: Cross-Origin Resource Sharing
- **cookie-parser**: Cookie parsing middleware
- **dotenv**: Environment variable management
- **nodemon**: Development auto-reload (dev dependency)

## Running with Docker

### Build

```bash
docker build -t eurobot_av_server .
```

### Run

```bash
docker run -p 3001:3001 \
  -e DB_CONNECTION_STRING=mongodb://mongodb:27017/EurobotDB \
  -e CLIENT_URL=http://192.168.0.10 \
  -e JTW_SECRET_KEY=your-secret-key \
  eurobot_av_server
```

### Docker Compose

Use the provided `docker-compose.yml` in the root directory.

## Authentication

The server uses JWT (JSON Web Tokens) for authentication.

### JWT Process

1. User logs in with username/password via `GET /login`
2. Server verifies credentials and returns JWT token
3. Client stores token in cookies or local storage
4. Client includes token in Authorization header for protected routes
5. Server validates token before processing requests

### Middleware

The `authMiddleware.js` handles:
- Token verification
- Role-based access control (RBAC)
- Admin-only route protection

## WebSocket Connection

Real-time updates are handled via Socket.io:

```javascript
const socket = io('http://server-url:3001');

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('score_update', (data) => {
    console.log('Score updated:', data);
});
```

## Troubleshooting

### Database Connection Error

- Verify MongoDB is running
- Check `DB_CONNECTION_STRING` in environment variables
- Ensure network connectivity to MongoDB server

### JWT Token Error

- Verify `JTW_SECRET_KEY` matches between server and client
- Check token expiration (default: 24 hours)
- Ensure token is properly sent in request headers

### CORS Errors

- Verify `CLIENT_URL` environment variable is correctly set
- Ensure client IP/hostname matches `CLIENT_URL`
- Check firewall and network settings

### Port Already in Use

- Change `PORT` environment variable
- Or kill the process using port 3001:
  ```bash
  # Windows
  netstat -ano | findstr :3001
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -i :3001
  kill -9 <PID>
  ```

## Security Considerations

- Always use strong, random `JTW_SECRET_KEY` in production
- Validate and sanitize all user input
- Implement rate limiting for API endpoints
- Use HTTPS in production
- Regularly update dependencies: `npm update`
- Don't commit `.env` file to version control
- Implement proper error handling without exposing sensitive information

## Future Enhancements

- [ ] Add request validation schemas
- [ ] Implement API rate limiting
- [ ] Add request logging and monitoring
- [ ] Implement database backups
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Implement caching strategies
- [ ] Implement data export functionality

---

For more information about the overall platform, see the [main README](../readme.md).
