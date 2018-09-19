// const { exec } = require('child_process');
const processTemplates = require('./lib/process-templates');
const installDependencies = require('./lib/install-dependencies');
const setupGit = require('./lib/setup-git');

/* eslint-disable complexity */
module.exports = {
  async generate(options) {
    await processTemplates(options);
  },
  async install({ directory }) {
    await installDependencies({ directory });
  },
  async git({ directory, author }) {
    setupGit({ directory, author });
  },
};
