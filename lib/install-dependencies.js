const { exec } = require('child_process');

module.exports = ({ directory }) => new Promise((resolve, reject) => {
  exec(`cd ${directory} && npm install`, (error) => {
    if (error) {
      reject(new Error(error));
      return;
    }
    resolve();
  });
});
