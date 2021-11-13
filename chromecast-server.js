const express = require('express');
const ChromecastAPI = require('chromecast-api');
const { URL } = require('url');
const { promisify: p } = require('util');

const app = express();
const chromecastClient = new ChromecastAPI();

chromecastClient.on('device', (device) => {

  app.get('/', (req, res) =>
    res.send({connected: true})
  );

  app.get('/play/:mediaUrl', async (req, res) => {
    const mediaUrl = new URL(req.params.mediaUrl);
    const startTime = mediaUrl.searchParams.get('t');
    await p(device.play).call(device, mediaUrl.toString());

    if (startTime) {
      await p(device.seekTo).call(device, parseInt(startTime));
    }

    res.send({playing: mediaUrl.toString(), startTime});

  });

  app.get('/pause', async (req, res) => {
    await p(device.pause).call(device);

    res.send({paused: true});
  });


  app.get('/resume', async (req, res) => {
    await p(device.resume).call(device);

    res.send({paused: false});
  });

  app.get('/stop', async (req, res) => {
    await p(device.stop).call(device);

    res.send({stopping: true});

    device.close();
    app.close();
  });

  app.listen(8078);
});
