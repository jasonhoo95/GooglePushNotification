const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
let subscription = {};
// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());
app.use(cors());

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  console.log(req.body);
  subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload

  // Pass object into sendNotification
  // webpush
  //   .sendNotification(subscription, payload)
  //   .catch(err => console.error(err));
}

);

app.post("/notify", (req,res) => {

  console.log(subscription);
  let payload = JSON.stringify({title : req.body.title, tag:req.body.tag});
    console.log("push now");
    webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
  


    res.end();

})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
