let express = require('express');
let router = express.Router();
let PubNub = require('pubnub');

let RandomData = require('../data/RandomData');
let pubnub = new PubNub({
    ssl: true,
    publishKey: 'pub-c-d38647d3-7a56-4e35-83b5-166917dae32e',
    subscribeKey: 'sub-c-0762c92e-742e-11e6-92a0-02ee2ddab7fe',
    secretKey: 'sec-c-Mzc1MGU0NmUtMDA3OS00MTZiLWI4YjQtYmUzNGE2ZmQ1Mjll'
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
