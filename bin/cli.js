#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const inquirer = require('inquirer');
const { execSync } = require('child_process');
const pkg = require('../package.json');
const nsk = require('..');


function exec(cmd) {
  return execSync(cmd).toString().trim();
}

const questions = [
  {
    type:    'input',
    name:    'name',
    message: 'Project Name',
    validate(input) {
      return !!input.length;
    },
  },
  {
    type:    'input',
    name:    'description',
    message: 'Project Description',
    validate(input) {
      return !!input.length;
    },
  },
  {
    type:    'input',
    name:    'authorName',
    message: 'Author Name',
    default: exec('git config user.name'),
  },
  {
    type:    'input',
    name:    'authorEmail',
    message: 'Author Email',
    default: exec('git config user.email'),
  },
  {
    type:    'input',
    name:    'githubUserName',
    message: 'GitHub User Name',
    validate(input) {
      return !!input.length;
    },
  },
];

program
  .version(pkg.version)
  .arguments('[directory]')
  .option('-n, --name [string]', 'Name of the new project')
  .option('-d, --desc [string]', 'Project description')
  .option('-an, --author-name [string]', 'Name of the project author')
  .option('-ae, --author-email [string]', 'Email of the project author')
  .option('-g, --username [string]', 'GitHub username')
  .action((directory = process.cwd()) => {
    const {
      name, desc, authorName, authorEmail, username,
    } = program;
    const dirpath = path.normalize(
      path.isAbsolute(directory) ? directory : path.resolve(process.cwd(), directory),
    );
    const toAsk = questions.filter((question) => {
      const key = question.name === 'description' ? 'desc' : question.name;
      return !program[key];
    });
    return inquirer
      .prompt(toAsk)
      .then(async (answers) => {
        const options = {
          name,
          authorName,
          authorEmail,
          directory:      dirpath,
          githubUserName: username,
          description:    desc,
          ...answers,
        };

        try {
          await nsk.generateTemplate(options);
          await nsk.installDependencies(dirpath);
        } catch (error) {
          console.error({ error });
        }
      });
  });

program.parse(process.argv);
