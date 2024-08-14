console.log('log from service worker');

// called for the first time when service worker run
// Since this will not run on every releoad, it only runs when there is any change in file
// main usecase of this listener is to store the subscription(made with public key) in browser
// and send that same subscription to server to store which server will send to push service.
// And push service again find your browser with same subscription
self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array("PUBLIC_URL")
  }
  )

  const response = await saveSubscription(subscription)
  console.log(response)
})

// Called when there is any push notification from registered subscription
self.addEventListener("push", e => {
  self.registration.showNotification("Custom Notification title", { body: e.data.text() })
})


async function saveSubscription(subscription) {
  // Save subscription in backend db
  const response = await fetch('http://localhost:3000/save-sub', {
    method: 'post',
    headers: { 'Content-type': "application/json" },
    body: JSON.stringify(subscription)
  })

  return response.json()
}






















function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
