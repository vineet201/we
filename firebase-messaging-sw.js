importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD2rYBmr5fu2HEkZJ-6OKUx6XQUcs9Ppg0",
  authDomain: "weather-notify-8bf63.firebaseapp.com",
  projectId: "weather-notify-8bf63",
  storageBucket: "weather-notify-8bf63.firebasestorage.app",
  messagingSenderId: "541861104637",
  appId: "1:541861104637:web:f6307953860e1eaff96794",
  measurementId: "G-B9KXD8XYS6"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192x192.png',
    badge: '/badge-96x96.png',
    vibrate: [200, 100, 200],
    tag: 'weather-notification',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
}); 