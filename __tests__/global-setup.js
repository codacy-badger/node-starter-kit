const { exec } = require('child_process');
const path = require('path');

module.exports = () => new Promise((resolve) => {
  exec('yarn generate-template', {
    cwd:   path.resolve(__dirname, '..'),
    env:   process.env,
    stdio: 'inherit',
  }, () => {
    resolve();
  });
});
