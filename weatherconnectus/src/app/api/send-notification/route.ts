import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';
import { supabaseAdmin } from '@/lib/supabase';

// Configure web-push
webpush.setVapidDetails(
  'mailto:your-email@example.com', // Replace with your email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { title, body, url } = await request.json();

    // Get all subscriptions from Supabase
    const { data: subscriptions, error } = await supabaseAdmin
      .from('push_subscriptions')
      .select('*');

    if (error) {
      console.error('Error fetching subscriptions:', error);
      return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ message: 'No subscriptions found' }, { status: 200 });
    }

    // Prepare notification payload
    const payload = JSON.stringify({
      title: title || 'WeatherConnectUs Notification',
      body: body || 'You have a new notification!',
      url: url || 'https://weatherconnectus.netlify.app',
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png'
    });

    // Send notifications to all subscriptions
    const promises = subscriptions.map(async (subscription) => {
      try {
        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dh,
            auth: subscription.auth
          }
        };

        await webpush.sendNotification(pushSubscription, payload);
        return { success: true, endpoint: subscription.endpoint };
      } catch (error) {
        console.error('Error sending to subscription:', error);
        
        // If subscription is invalid, remove it from database
        if (error instanceof Error && error.message.includes('410')) {
          await supabaseAdmin
            .from('push_subscriptions')
            .delete()
            .eq('endpoint', subscription.endpoint);
        }
        
        return { success: false, endpoint: subscription.endpoint, error: error };
      }
    });

    const results = await Promise.all(promises);
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return NextResponse.json({
      message: `Notifications sent to ${successful} devices, ${failed} failed`,
      results: results
    });

  } catch (error) {
    console.error('Error in send-notification API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
