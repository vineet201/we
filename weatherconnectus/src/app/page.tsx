'use client';

import { useState } from 'react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

export default function Home() {
  const {
    permission,
    subscription,
    isSupported,
    isLoading,
    subscribeToPush,
    unsubscribeFromPush,
  } = usePushNotifications();

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    try {
      await subscribeToPush();
      setMessage('Successfully subscribed to notifications!');
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribeFromPush();
      setMessage('Successfully unsubscribed from notifications');
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const sendNotification = async () => {
    if (!subscription) {
      setMessage('Please subscribe to notifications first');
      return;
    }

    setSending(true);
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'WeatherConnectUs Alert',
          body: 'This is a test notification sent to all subscribed devices!',
          url: 'https://weatherconnectus.netlify.app'
        }),
      });

      const result = await response.json();
      setMessage(result.message || 'Notification sent successfully!');
    } catch (error) {
      setMessage(`Error sending notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSending(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">WeatherConnectUs</h1>
          <p className="text-gray-600">
            Push notifications are not supported in this browser.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          WeatherConnectUs
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Stay connected with weather alerts through push notifications
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              Notification Status: 
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                permission === 'granted' 
                  ? 'bg-green-100 text-green-800' 
                  : permission === 'denied'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {permission}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Subscription: {subscription ? '✅ Active' : '❌ Not subscribed'}
            </p>
          </div>

          {!subscription ? (
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              {isLoading ? 'Subscribing...' : 'Enable Notifications'}
            </button>
          ) : (
            <div className="space-y-3">
              <button
                onClick={sendNotification}
                disabled={sending}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
              >
                {sending ? 'Sending...' : 'Send Notification to All Devices'}
              </button>
              <button
                onClick={handleUnsubscribe}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Unsubscribe
              </button>
            </div>
          )}

          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes('Error') 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {message}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Notifications work even when this website is closed!
          </p>
        </div>
      </div>
    </div>
  );
}
