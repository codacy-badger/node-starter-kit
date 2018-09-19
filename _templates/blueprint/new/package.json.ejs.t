---
to: <%= projectDirectory %>/package.json
---
{
  "name": "<%= projectName %>",
  "version": "1.0.0",
  "description": "<%= description %>",
  "main": "index.js",
  "scripts": {
    "test": "jest",
    "lint": "eslint . --fix"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/<%= githubUserName %>/<%= projectName %>.git"
  },
  "keywords": [
    "module"
  ],
  "author": "<%= authorName %> <<%= authorEmail %>>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/<%= githubUserName %>/<%= projectName %>/issues"
  },
  "homepage": "https://github.com/<%= githubUserName %>/<%= projectName %>#readme",
  "devDependencies": {
    "eslint": "^5.2.0",
    "eslint-config-airbnb-base": "^13.0.0",
    "eslint-plugin-import": "^2.13.0",
    "eslint-plugin-unicorn": "^6.0.0",
    "jest": "^23.6.0",
    "lint-staged": "^7.2.2",
    "yorkie": "^2.0.0"
  },
  "gitHooks": {
    "pre-commit": "scripts/pre-commit"
  },
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "git add"
    ]
  }
}
