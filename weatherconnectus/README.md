# WeatherConnectUs - Push Notification App

A Next.js application that sends push notifications to all subscribed devices, even when the website is closed. Built with TypeScript, Tailwind CSS, Supabase, and deployed on Netlify.

## Features

- 🔔 **Push Notifications**: Send notifications to all subscribed devices
- 📱 **Background Notifications**: Works even when the website is closed
- ⚡ **Real-time Subscriptions**: Manage push subscriptions with Supabase
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS
- 🚀 **Easy Deployment**: Optimized for Netlify hosting

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database & API)
- **Push Notifications**: Web Push API with VAPID keys
- **Deployment**: Netlify

## Getting Started

### Prerequisites

1. Node.js 18+ installed
2. A Supabase account and project
3. A Netlify account (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weatherconnectus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials and generated VAPID keys.

4. Set up the Supabase database:
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the SQL script from `supabase/setup.sql`

5. Generate VAPID keys (already done if using provided keys):
   ```bash
   node scripts/generate-vapid-keys.js
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deployment to Netlify

1. Connect your repository to Netlify
2. Set the following environment variables in Netlify:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
   - `VAPID_PRIVATE_KEY`
   - `NEXT_PUBLIC_SITE_URL`

3. Deploy! Netlify will automatically build and deploy your app.

## How It Works

1. **Subscription**: Users click "Enable Notifications" to subscribe
2. **Permission**: Browser requests notification permission
3. **Service Worker**: Registers to handle background notifications
4. **Storage**: Subscription details stored in Supabase
5. **Sending**: Admin can send notifications to all subscribed devices
6. **Delivery**: Notifications delivered even when website is closed

## API Endpoints

- `POST /api/send-notification`: Send notifications to all subscribed devices

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role secret key |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | VAPID public key for web push |
| `VAPID_PRIVATE_KEY` | VAPID private key for web push |
| `NEXT_PUBLIC_SITE_URL` | Your deployed site URL |

## Browser Support

- Chrome 42+
- Firefox 44+
- Safari 16+ (macOS 13+, iOS 16.4+)
- Edge 17+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
