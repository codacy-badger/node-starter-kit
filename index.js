const { exec } = require('child_process');

/* eslint-disable complexity */
module.exports = {
  generateTemplate({
    name, description, directory, authorName, authorEmail, githubUserName,
  }) {
    // console.log('generateTemplate');
    return new Promise((resolve, reject) => {
      const args = [
        'npx hygen blueprint new',
      ];
      if (name) args.push(`--name '${name}'`);
      if (directory) args.push(`--directory '${directory}'`);
      if (description) args.push(`--description '${description}'`);
      if (authorName) {
        args.push(`--authorName '${authorName}'`);
        args.push(`--gitConfigName '${authorName}'`);
      }
      if (authorEmail) {
        args.push(`--authorEmail '${authorEmail}'`);
        args.push(`--gitConfigEmail '${authorEmail}'`);
      }
      if (githubUserName) args.push(`--githubUserName '${githubUserName}'`);

      exec(args.join(' '), (error) => {
        if (error) {
          reject(new Error(error));
          return;
        }
        resolve();
      });
    });
  },
  installDependencies(directory) {
    // console.log('installDependencies');
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
};
