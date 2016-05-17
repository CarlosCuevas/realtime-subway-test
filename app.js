const express = require('express');
const app = express();
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const request = require('request');
const fs = require('fs');

// load api key synchronously
const apiKey = fs.readFileSync('./apiKey.txt', 'utf8');


app.get('/', (req, res) => res.send('Hello World!'));

// update stream
app.get('/update', (req, res) => {
  const requestSettings = {
    method: 'GET',
    url: 'http://datamine.mta.info/mta_esi.php?key=' + apiKey + '&feed_id=1',
    encoding: null
  };
  request(requestSettings, (error, response, body) => {
    if (error || response.statusCode !== 200) return res.sendStatus(500);

    const feed = GtfsRealtimeBindings.FeedMessage.decode(body);
    feed.entity.forEach((entity) => console.log(entity));
    res.sendStatus(200);
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
