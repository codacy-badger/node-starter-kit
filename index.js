const { exec } = require('child_process');
const processTemplates = require('./lib/process-templates');

/* eslint-disable complexity */
module.exports = {
  generate(options) {
    processTemplates(options);
    return Promise.resolve();
  },
  installDependencies(directory) {
    return new Promise((resolve, reject) => {
      exec(`cd ${directory} && npm install`, (error) => {
        if (error) {
          reject(new Error(error));
          return;
        }
        resolve();
      });
    });
  },
  setupGit({ directory, authorName, authorEmail }) {
    return new Promise((resolve, reject) => {
      exec(`cd ${directory} && git init && git config --add user.email '${authorEmail}' && git config --add user.name '${authorName}'`, (error) => {
        if (error) {
          reject(new Error(error));
          return;
        }
        resolve();
      });
    });
  },
};
