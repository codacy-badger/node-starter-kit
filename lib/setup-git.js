const { exec } = require('child_process');

module.exports = ({ directory, author }) => new Promise((resolve, reject) => {
  exec(`cd ${directory} && \
git init && \
git config --add user.email '${author.email}' && \
git config --add user.name '${author.name}'`, (error) => {
    if (error) {
      reject(new Error(error));
      return;
    }
    resolve();
  });
});
