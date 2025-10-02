// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

self.addEventListener('message', (event) => {
  if (event.data.type === 'FIREBASE_CONFIG') {
    const configUrl = event.data.config;

    if (firebase.apps.length > 0) {
      console.log('Firebase already initialized');
      return;
    }

    fetch(configUrl)
      .then((response) => response.text())
      .then((configScript) => {
        eval(configScript);
        
        if (firebase.apps.length === 0) {
          firebase.initializeApp(self.firebaseConfig);
          
          const messaging = firebase.messaging();
          messaging.onBackgroundMessage((payload) => {
            console.log('Received background message:', payload);

            const notificationTitle = payload.notification.title;
            const notificationOptions = {
              body: payload.notification.body,
              icon: '/favicon.ico',
            };

            self.registration.showNotification(notificationTitle, notificationOptions);
          });
        }
      })
      .catch((err) => console.error('Error loading Firebase config:', err));
  }
});
