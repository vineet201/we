const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("Service Worker is not supported in this browser.");
    }
    if (!('Notification' in window)) {
        throw new Error("Notifications are not supported in this browser.");
    }
}

const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
        return registration;
    }

    const requestNotificationPermission = async () => {
        const permission = await Notification.requestPermission();

        if (permission !== 'granted') {
            throw new Error("Notification permission denied.");
        }
    }

    const main = async () => {
        checkPermission()
        await requestNotificationPermission()
        await registerSW()
    }
 




    

