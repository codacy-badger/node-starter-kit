---
to: <%= projectDirectory %>/lib/<%= projectName %>.test.js
---
<%
 varname = h.inflection.camelize(projectName, true);
%>
const <%= varname %> = require('./<%= projectName %>');

describe('<%= varname %>', () => {
  test.skip('should exist', () => {
    expect(<%= varname %>).toBeDefined();
  });
});
