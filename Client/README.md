# Eurobot AV Dashboard - Client

Frontend React application for the Eurobot AV Dashboard platform. Provides user interfaces for managing competitions, displaying live matches, and recording scores.

## Overview

The client is a React-based single-page application that communicates with the backend server via REST APIs and WebSocket connections for real-time updates.

## Technology Stack

- **Framework**: React v18.2.0
- **Router**: React Router v6.15.0
- **State Management**: React Context API + Cookies (react-cookie)
- **HTTP Client**: Axios v1.5.0
- **UI Framework**: Bootstrap v5.3.1 + React Bootstrap v2.8.0
- **Icons**: FontAwesome (@fortawesome/react-fontawesome v0.2.0)
- **Real-time**: Socket.io-client v4.7.1
- **Authentication**: Custom JWT handling (react-jwt)
- **Build Tool**: Create React App (react-scripts v5.0.1)

## Project Structure

```
Client/
├── src/
│   ├── components/                # Reusable React components
│   │   ├── controlCenter/         # Competition management interface
│   │   │   ├── index.js
│   │   │   ├── matches.js        # Match management component
│   │   │   ├── navBar.js         # Navigation for control center
│   │   │   ├── rounds.js         # Round management component
│   │   │   └── teams.js          # Team management component
│   │   │
│   │   ├── dashboardAV/           # Audio-visual dashboard views
│   │   │   ├── index.js
│   │   │   ├── navBar.js
│   │   │   └── round.js
│   │   │
│   │   ├── display/               # Live display views for streaming
│   │   │   ├── v1/               # Display version 1 (alternative design)
│   │   │   │   ├── currentMatch.js
│   │   │   │   ├── currentMatchBanner.js
│   │   │   │   ├── matchScore.js
│   │   │   │   ├── timer.js
│   │   │   │   ├── roundResults.js
│   │   │   │   └── showRoundMatches.js
│   │   │   │
│   │   │   └── v2/               # Display version 2 (default design)
│   │   │       ├── currentMatch.js
│   │   │       ├── currentMatchBanner.js
│   │   │       ├── matchScore.js
│   │   │       ├── timer.js
│   │   │       ├── roundResults.js
│   │   │       ├── showRoundMatches.js
│   │   │       └── showRoundMatches.css
│   │   │
│   │   ├── referee/               # Score evaluation interface
│   │   │   ├── index.js
│   │   │   ├── evaluate.js       # Score entry component
│   │   │   ├── navBar.js
│   │   │   └── round.js
│   │   │
│   │   ├── scores/                # Score viewing and analysis
│   │   │   ├── index.js
│   │   │   ├── detailedScore.js
│   │   │   ├── navBar.js
│   │   │   ├── round.js
│   │   │   └── up2Round.js
│   │   │
│   │   └── users/                 # User management interface
│   │       ├── index.js
│   │       ├── createUser.js
│   │       ├── navBar.js
│   │       └── usersList.js
│   │
│   ├── pages/                     # Page-level components (routes)
│   │   ├── controlCenter.js      # Control center page
│   │   ├── dashboardAV.js        # Dashboard page
│   │   ├── display.js            # Live display page
│   │   ├── home.js               # Home/landing page
│   │   ├── login.js              # Login page
│   │   ├── referee.js            # Referee interface page
│   │   ├── scores.js             # Scores page
│   │   └── users.js              # Users management page
│   │
│   ├── services/                  # API client and utility services
│   │   ├── API.js                # Axios wrapper for API calls
│   │   ├── server.js             # Server URL configuration
│   │   ├── match.js              # Match-related API calls
│   │   ├── round.js              # Round-related API calls
│   │   ├── score.js              # Score-related API calls
│   │   ├── team.js               # Team-related API calls
│   │   ├── users.js              # User-related API calls
│   │   └── info.js               # Info/configuration API calls
│   │
│   ├── context/                   # React Context for state management
│   │   ├── infoContext.js        # Application info/configuration context
│   │   └── userContext.js        # User and authentication context
│   │
│   ├── features/                  # Feature utilities and helpers
│   │   └── requireAuth.js        # Authentication guard component
│   │
│   ├── assets/                    # Static assets
│   │   └── eurobot_tn.svg        # Eurobot logo/image
│   │
│   ├── styles/                    # Global stylesheets
│   │   └── (CSS files)
│   │
│   ├── config/                    # Configuration files (if any)
│   │   └── (Configuration)
│   │
│   ├── App.js                    # Main application component
│   ├── App.css                   # Application styles
│   ├── index.js                  # React entry point
│   └── .env                      # Environment variables (not in repo)
│
├── public/
│   ├── index.html               # HTML template
│   ├── manifest.json            # PWA manifest
│   └── robots.txt
│
├── build/                        # Production build output (generated)
│   └── (compiled files)
│
├── Dockerfile                    # Docker configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## Configuration

### Environment Variables

Create a `.env` file in the `Client/` directory:

```env
REACT_APP_DISPLAY_VERSION=v2
```

**Configuration Details**:
- `REACT_APP_DISPLAY_VERSION`: Display version to use (`v1` or `v2`)

**Note**: Environment variables must start with `REACT_APP_` to be accessible in the React application.

## Available Routes/Pages

### Authentication

- **`/`** - Home page (redirects to appropriate page based on auth status)
- **`/login`** - Login page (username/password authentication)

### Main Interfaces

- **`/controlCenter`** - Control Center for competition management
  - Manage teams, rounds, and matches
  - Control match flow and timing
  - Admin access only

- **`/referee`** - Referee Dashboard for score evaluation
  - Evaluate ongoing matches
  - Record task completions and scores
  - Referee and admin access

- **`/display`** - Live Match Display for broadcasting
  - Real-time match information display
  - Live scoring display
  - Timer and match status
  - Optimized for OBS/streaming
  - Two versions available (v1 and v2)

- **`/dashboardAV`** - Audio-Visual Dashboard
  - Alternative display interface
  - For projectors and displays
  - Admin and display-only users

- **`/scores`** - Score Viewing Interface
  - View historical scores
  - Analyze round results
  - All authenticated users

- **`/users`** - User Management
  - Create and manage user accounts
  - Assign roles and permissions
  - Admin only

## State Management

### Context API

- **`infoContext.js`** - Global app info and configuration
  - Task list
  - Colors
  - Year
  - Estimation settings

- **`userContext.js`** - User and authentication state
  - Current user info
  - User role
  - Authentication token

### Usage

```javascript
import { useContext } from 'react';
import { UserContext } from './context/userContext';

function MyComponent() {
    const { user, token } = useContext(UserContext);
    
    return <div>Hello {user.username}</div>;
}
```

## Authentication

### Login Flow

1. User enters username/password on login page
2. Client sends request to `/login` endpoint
3. Server returns JWT token
4. Token is stored in cookies via `react-cookie`
5. Token is included in all subsequent API requests
6. `requireAuth.js` component guards protected routes

### Protected Routes

The `requireAuth.js` component checks authentication status and redirects unauthenticated users to login page.

## Real-time Updates

WebSocket connection via Socket.io:

```javascript
import io from 'socket.io-client';

const socket = io(SERVER_URL);

socket.on('connect', () => {
    console.log('Connected');
});

socket.on('score_update', (data) => {
    // Handle real-time score updates
});
```

## Development

### Local Setup (Without Docker)

#### Prerequisites

- Node.js v14 or higher
- Backend server running on `http://localhost:3001`

#### Installation

```bash
cd Client
npm install
```

#### Environment Setup

Create `.env` file:

```env
REACT_APP_DISPLAY_VERSION=v2
```

#### Running Development Server

```bash
npm start
```

The client will open on `http://localhost:3000` with hot-reload enabled.

#### Building for Production

```bash
npm run build
```

Outputs optimized production build to `build/` directory.

### Testing

```bash
npm test
```

Runs tests in watch mode.

### Available Scripts

- **`npm start`** - Start development server
- **`npm run build`** - Create production build
- **`npm test`** - Run tests
- **`npm run eject`** - Eject from Create React App (irreversible)

## Styling

### CSS Structure

- **`App.css`** - Main application styles
- **Component-level CSS** - Individual component styles
- **Bootstrap** - Responsive grid and utilities
- **React Bootstrap** - Pre-styled Bootstrap components

## Running with Docker

### Build

```bash
docker build -t eurobot_av_client .
```

### Run

```bash
docker run -p 3000:3000 eurobot_av_client
```

### Docker Compose

Use the provided `docker-compose.yml` in the root directory.

## Display Versions (v1 vs v2)

The application supports two different display layouts for live streaming:

### Version Selection

Set via `REACT_APP_DISPLAY_VERSION` environment variable:

```env
REACT_APP_DISPLAY_VERSION=v2
```

### v1 (Alternative Design)

- Located in `components/display/v1/`
- Simpler visual design
- Lower bandwidth requirements
- Suitable for older display systems

### v2 (Default Design)

- Located in `components/display/v2/`
- Enhanced visual presentation
- More detailed information display
- Recommended for modern displays
- Better responsive design

## Troubleshooting

### Cannot Connect to Server

1. Verify backend server is running on port 3001
2. Check browser console for CORS errors
3. Verify firewall allows connections

### Login Issues

- Verify credentials (default: admin/admin)
- Check network tab in browser DevTools
- Ensure server `/login` endpoint is working

### Real-time Updates Not Working

- Check WebSocket connection in browser DevTools
- Verify Socket.io server is running
- Check browser console for connection errors

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Port 3000 Already in Use

```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Linux/Mac
lsof -i :3000
kill -9 <PID>
```

## Performance Optimization

- **Code Splitting**: Lazy load components for faster initial load
- **Memoization**: Use `React.memo()` for component optimization
- **Production Build**: Always use `npm run build` for production
- **CDN**: Serve static assets from CDN in production
- **Image Optimization**: Compress images before use

## Security Considerations

- Never commit `.env` file with sensitive data
- Use HTTPS in production
- Validate all user input
- Don't expose sensitive data in component states
- Clear tokens on logout
- Implement proper CORS in backend

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Responsive mobile design for all views
- [ ] Offline mode with service workers
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Export functionality (PDF, CSV)
- [ ] Advanced analytics dashboard
- [ ] Video integration for team displays
- [ ] Mobile-optimized referee interface

## Dependencies

See `package.json` for complete list. Key packages:

- **react**: UI framework
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **socket.io-client**: WebSocket client
- **bootstrap**: CSS framework
- **react-bootstrap**: Bootstrap React components
- **@fortawesome/react-fontawesome**: Icon library

---

For more information about the overall platform, see the [main README](../readme.md).
