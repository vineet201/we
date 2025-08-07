self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'You have a new notification!',
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'View',
          icon: '/checkmark.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/xmark.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'WeatherConnectUs', options)
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('https://weatherconnectus.netlify.app')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action when clicking the notification body
    event.waitUntil(
      clients.openWindow('https://weatherconnectus.netlify.app')
    );
  }
});

self.addEventListener('notificationclose', function(event) {
  console.log('Notification was closed', event);
});
