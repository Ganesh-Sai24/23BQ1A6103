# Notification System Design

## Architecture
- React Frontend
- Affordmed Notifications API
- Logging Middleware

## Flow
1. Authenticate and obtain access token.
2. Fetch notifications from API.
3. Log API actions using logging middleware.
4. Sort notifications by priority:
   - Placement
   - Result
   - Event
5. Sort same-type notifications by latest timestamp.
6. Display top 10 notifications.

## Technologies
- React
- Vite
- JavaScript
- Fetch API