# push-notification-basic-example-with-service-worker


## client

- added service worker which will subscribe to server with a public and private key
- recieves a push notification and display it.


## server

- stores the subscription of all service worker
- sends a push notification.


### How to create public and private vapid keys for push service

- run `npx web-push generate-vapid-keys` in terminal