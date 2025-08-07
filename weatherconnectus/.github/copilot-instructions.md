<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# WeatherConnectUs Push Notification App

This is a Next.js TypeScript application that implements push notifications functionality using:

- **Next.js 15** with App Router and TypeScript
- **Supabase** for backend services and storing notification subscriptions
- **Web Push API** for sending push notifications to all subscribed devices
- **Tailwind CSS** for styling
- **Netlify** for deployment

## Key Features:
- Push notification permission handling
- Service worker registration for background notifications
- Button to send notifications to all subscribed devices
- Works even when the website is closed (via service worker)
- Supabase integration for storing push subscriptions

## Important Implementation Notes:
- Use VAPID keys for web push authentication
- Store push subscriptions in Supabase database
- Implement proper error handling for notification permissions
- Ensure service worker is properly registered
- Handle both development and production environments for Netlify deployment

## Supabase Configuration:
- Database table for storing push subscriptions
- API endpoints for subscription management
- Proper authentication and authorization
