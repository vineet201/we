const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

   
const rawData = atob(base64);
const outputArray = new Uint8Array(rawData.length);
for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
}
 return outputArray;

}

const saveSubcription = async (subscription) => {
    const response = await fetch('http://localhost:3000/save-subscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
    })
    return response.json();

}


self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BAonEfpv7z-KmCcvtH4WMbVIgBiM4aZVVODi9GVuLbLp078fWBcxQT4xgwwSs8BU9Vq4v-j37PL5HjfSp6CMLng")
    })

    const response = await saveSubcription(subscription)
    console.log(response)
})

// Public Key:
// BAonEfpv7z-KmCcvtH4WMbVIgBiM4aZVVODi9GVuLbLp078fWBcxQT4xgwwSs8BU9Vq4v-j37PL5HjfSp6CMLng

// Private Key:
// ggcL3bioULXefmhgZpp--KxlPEqWI256zOsCp4DwoCM