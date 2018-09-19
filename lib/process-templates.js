const fs = require('fs');
const path = require('path');
const globby = require('globby');
const ejs = require('ejs');
const mkdirp = require('mkdirp');

module.exports = async (options) => {
  const templatedir = path.resolve(__dirname, '../template');
  const templates = globby.sync([
    path.join(templatedir, '**/*'),
  ], {
    dot: true,
  });

  const promises = templates
    .map((template) => {
      const basename = template
        .replace(templatedir, '')
        .replace(/^\//, '')
        .replace('{{name}}', options.name);
      const dest = path.join(options.directory, basename);

      return {
        basename,
        dest,
        src: template,
      };
    })
    .filter(({ dest }) => !fs.existsSync(dest))
    .map(({ src, dest }) => new Promise((resolve, reject) => {
      ejs.renderFile(src, options, (err, str) => {
        if (err) {
          console.error({ src, err, dest });
          reject(new Error(err));
          return;
        }
        const dirname = path.dirname(dest);
        if (!fs.existsSync(dirname)) {
          mkdirp.sync(dirname);
        }
        fs.writeFileSync(dest, str, 'utf8');
        resolve();
      });
    }));

  await Promise.all(promises);
};
