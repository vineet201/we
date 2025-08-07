# Supabase Setup Instructions

## Step 1: Create the Database Table

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to the **SQL Editor** tab
3. Copy and paste the SQL from `supabase/setup.sql` 
4. Click **Run** to create the table and policies

## Step 2: Verify the Setup

After running the SQL, you should see a new table called `push_subscriptions` in your database with the following columns:

- `id` (primary key)
- `endpoint` (unique, not null)
- `p256dh` (not null)
- `auth` (not null) 
- `user_agent`
- `created_at`
- `updated_at`

## Step 3: Test the Application

1. Make sure your `.env.local` file has all the correct Supabase credentials
2. Start the development server: `npm run dev`
3. Open http://localhost:3000
4. Click "Enable Notifications" and allow permissions
5. Click "Send Notification to All Devices"
6. You should receive a push notification!

## Environment Variables Required

Make sure these are set in your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://rvmuzdokgiyfvyfzomte.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
NEXT_PUBLIC_SITE_URL=https://weatherconnectus.netlify.app
```

## For Netlify Deployment

Add all the environment variables from `.env.local` to your Netlify site settings:

1. Go to your Netlify site dashboard
2. Navigate to Site settings → Environment variables
3. Add each variable from your `.env.local` file
4. Deploy your site

## Troubleshooting

- If notifications don't work, check browser console for errors
- Make sure HTTPS is enabled (required for push notifications)
- Verify that the service worker is registered correctly
- Check that the database table was created successfully
