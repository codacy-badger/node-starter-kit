const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const execOptions = {
  cwd:   path.resolve(__dirname, '..'),
  env:   process.env,
  stdio: 'inherit',
};
const projectDir = path.resolve(__dirname, '../tmp/project-name');

describe('template generator', () => {
  beforeAll(() => {
    execSync([
      'yarn hygen blueprint new ',
      '--name \'project name\'',
      '--description \'This is the best project in the world!\'',
      '--directory tmp/project-name',
      '--authorName \'Some User\'',
      '--authorEmail test@test.com',
      '--gitConfigName \'Some User\'',
      '--gitConfigEmail test@test.com',
      '--githubUserName github.user',
    ].join(' '), execOptions);
  });

  afterAll(() => {
    execSync('rm -rf tmp/', execOptions);
  });

  test('should create new template', () => {
    expect(fs.existsSync(projectDir)).toBeTruthy();
  });
});
