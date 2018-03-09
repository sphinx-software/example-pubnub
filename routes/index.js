let express = require('express');
let router = express.Router();
let PubNub = require('pubnub');

let RandomData = require('../data/RandomData');
let pubnub = new PubNub({
    ssl: true,
    publishKey: 'pub-c-3fce0b13-4d9b-41ba-9608-bd2d0842cdae',
    subscribeKey: 'sub-c-688c1d5e-2350-11e8-a183-761142583d66',
    secretKey: 'sec-c-NTk3MDA4MjEtNWY3ZC00MzM4LWFjOTItMjFjNDY2MTU4NzNk'
});

let i = 1;

let looper = setInterval(() => {
    i++;
    let data = RandomData.makeRandomData(new Date(), new Date());
    pubnub.publish({
        channel: 'sampleChannel',
        message: data
    });

    if (i > 100) {
        clearInterval(looper);
    }
}, 5000);


router.get('/', (req, res, next) => {
    res.json({
        server: 'Example Pubnub',
        version: '1.0'
    })
});

/* GET AJAX API. */
router.get('/ajax-example', (req, res, next) => {
  let exampleData = [];

  for (let i = 0; i < 100; i++) {
    let data = RandomData.makeRandomData(new Date(), new Date());
    exampleData.push(data)
  }
  res.json(exampleData)
});

module.exports = router;
