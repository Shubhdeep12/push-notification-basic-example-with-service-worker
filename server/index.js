const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 3000;

const apiKeys = {
    publicKey: "PUBLIC_KEY",
    privateKey: "PRIVATE_KEY"
}

// this acts as a push service which is a mediator b/w server and client which verifies the combination of public and private key
webpush.setVapidDetails(
    'mailto:emailid',
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

const db = [];

// POST API which will save the unique subscription created by service worker(using public key) in db.
app.post("/save-sub", (req, res) => {
  db.push(req.body);
  console.log(db)
    res.json({ status: "Success", message: "Subscription saved!" })
})

// While sending notifcation server use this savee subscription and send this to push service..
// push service find the correct match of public key and get the browser where a service worker isregistered with that public key
app.get("/send-notification", (req, res) => {
  console.log({db})
    webpush.sendNotification(db[0], "Hello world");
    res.json({ "status": "Success", "message": "Message sent to push service" });
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})