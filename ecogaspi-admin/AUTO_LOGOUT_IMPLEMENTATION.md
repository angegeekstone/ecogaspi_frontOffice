# Automatic Logout and Token Refresh System

## Overview
This system implements automatic logout after 30 minutes of inactivity combined with automatic token refresh to maintain secure user sessions.

## Components

### 1. Idle Timer (`src/utils/idleTimer.ts`)
- Monitors user activity (mouse movement, clicks, keystrokes, etc.)
- Automatically logs out user after 30 minutes of inactivity
- Resets the timer on any detected user activity

### 2. Auto Logout Component (`src/components/AutoLogoutManager.tsx`)
- Integrates the idle timer with the authentication context
- Handles cleanup of timers when component unmounts
- Note: Token refresh is now handled automatically by the apiClient interceptor

### 3. Enhanced API Client (`src/utils/apiClient.ts`)
- Intercepts 401 responses and attempts token refresh automatically using the /auth/refresh endpoint
- Retries failed requests after successful token refresh
- Dispatches logout events when token refresh fails
- Updates tokens in localStorage and API client automatically

### 4. Authentication Context (`src/contexts/AuthContext.tsx`)
- Listens for auto-logout events from the API client
- Manages login, logout, and token refresh operations
- Maintains user session state

## Configuration

### Token Expiration
- Access tokens expire after 30 minutes (1800 seconds)
- Refresh tokens remain valid for 7 days
- Automatic refresh occurs automatically when 401 responses are received

### Inactivity Timeout
- User is automatically logged out after 30 minutes of inactivity
- Activity includes mouse movements, clicks, keystrokes, scrolling, etc.

## Security Features

1. **Short-lived Access Tokens**: Limits exposure window if tokens are compromised
2. **Automatic Refresh**: Maintains seamless user experience without frequent re-authentication
3. **Activity Monitoring**: Prevents unauthorized access from unattended sessions
4. **Secure Storage**: Tokens stored in localStorage with proper cleanup on logout

## Implementation Details

The system works in three layers:

1. **Frontend Detection**: The idle timer detects user inactivity and triggers logout
2. **Token Management**: Automatic refresh keeps tokens valid during active sessions via API interceptors
3. **API Integration**: Failed requests trigger token refresh before returning errors

This ensures both security and usability by maintaining active sessions during legitimate use while preventing unauthorized access from inactive sessions.