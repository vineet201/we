'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
        return registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        throw error;
      }
    }
    throw new Error('Service workers not supported');
  };

  const requestPermission = async () => {
    if (!isSupported) {
      throw new Error('Push notifications not supported');
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  };

  const subscribeToPush = async () => {
    setIsLoading(true);
    try {
      if (permission !== 'granted') {
        const newPermission = await requestPermission();
        if (newPermission !== 'granted') {
          throw new Error('Permission not granted');
        }
      }

      const registration = await registerServiceWorker();
      
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidPublicKey) {
        throw new Error('VAPID public key not configured');
      }

      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      setSubscription(pushSubscription);

      // Save subscription to Supabase
      const subscriptionJson = pushSubscription.toJSON();
      const { error } = await supabase
        .from('push_subscriptions')
        .upsert({
          endpoint: pushSubscription.endpoint,
          p256dh: subscriptionJson.keys?.p256dh,
          auth: subscriptionJson.keys?.auth,
          user_agent: navigator.userAgent,
          created_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error saving subscription:', error);
        throw error;
      }

      return pushSubscription;
    } catch (error) {
      console.error('Error subscribing to push:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribeFromPush = async () => {
    if (subscription) {
      try {
        await subscription.unsubscribe();
        
        // Remove from Supabase
        await supabase
          .from('push_subscriptions')
          .delete()
          .eq('endpoint', subscription.endpoint);

        setSubscription(null);
      } catch (error) {
        console.error('Error unsubscribing:', error);
        throw error;
      }
    }
  };

  return {
    permission,
    subscription,
    isSupported,
    isLoading,
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush,
  };
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
