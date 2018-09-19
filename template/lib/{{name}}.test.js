
const <%= camelname %> = require('./<%= name %>');

describe('<%= camelname %>', () => {
  test.skip('should exist', () => {
    expect(<%= camelname %>).toBeDefined();
  });
});
