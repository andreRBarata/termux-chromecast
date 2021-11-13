const axios = require('axios');
const { Command } = require('commander');

const program = new Command();

program.command('play')
  .argument('<mediaUrl>')
  .action((mediaUrl) => {
    axios.get(`http://localhost:8078/play/${mediaUrl}`)
  });

program.command('pause')
  .action((mediaUrl) => {
    axios.get(`http://localhost:8078/pause`)
  });


program.command('resume')
  .action((mediaUrl) => {
    axios.get(`http://localhost:8078/resume`)
  });

program.command('stop')
  .action((mediaUrl) => {
    axios.get(`http://localhost:8078/stop`)
  });

program.parse(process.argv);
