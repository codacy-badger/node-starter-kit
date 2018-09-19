const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '../tmp');

describe('template generator', () => {
  test('should create new template', () => {
    expect(fs.existsSync(projectDir)).toBeTruthy();
  });
});
