#!/data/data/com.termux/files/usr/bin/node
const axios = require('axios');
const waitPort = require('wait-port');
const { Command } = require('commander');
const { Monitor } = require('forever-monitor');

const program = new Command();

function callOnApi(callUrl) {
  return axios.get(`http://localhost:8078`)
    .catch(() => {
      new Monitor('./chromecast-server.js', {
        max: 3,
        silent: true,
        args: []
      }).start();

      return waitPort({ host: 'localhost', port: 8078});
    })
    .then(() => axios.get(callUrl));
}

program.command('play')
  .argument('<mediaUrl>')
  .action((mediaUrl) => {
    callOnApi(`http://localhost:8078/play/${encodeURIComponent(mediaUrl)}`)
  });

program.command('pause')
  .action((mediaUrl) => {
    callOnApi(`http://localhost:8078/pause`)
  });


program.command('resume')
  .action((mediaUrl) => {
    callOnApi(`http://localhost:8078/resume`)
  });

program.command('stop')
  .action((mediaUrl) => {
    callOnApi(`http://localhost:8078/stop`)
  });

program.parse(process.argv);
