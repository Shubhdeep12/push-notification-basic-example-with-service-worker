
function checkPermission() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('No support of SW')
  }

  if (!('Notification' in window)) {
    throw new Error('No support of notification API')
  }

  if (!('PushManager' in window)) {
    throw new Error('No support of Push API')
  }

  console.log('service-worker present in navigator and Notification and PushManager API is supported')
}

async function requestNotificationPermission() {
  // get the permission from browser to send notification
  const permission = await Notification.requestPermission();

  if (permission !== 'granted') {
    throw new Error("Notification permission not granted")
  }

  console.log('notification request approved')

}

async function registerSW() {

  // Registers the service worker in browser
  const registration = await navigator.serviceWorker.register('serviceworker.js');
  console.log({ registration })
  return registration
}

async function main() {

  checkPermission();
  await requestNotificationPermission()
  await registerSW();
}
