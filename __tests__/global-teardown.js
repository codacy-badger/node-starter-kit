const { exec } = require('child_process');
const path = require('path');

module.exports = () => new Promise((resolve) => {
  exec('rm -rf tmp/', {
    cwd:   path.resolve(__dirname, '..'),
    env:   process.env,
    stdio: 'inherit',
  }, () => {
    resolve();
  });
});
