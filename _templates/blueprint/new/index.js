const path = require('path');
const { execSync } = require('child_process');
const { kebab } = require('case');

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
];

module.exports = {
  prompt: ({ inquirer, args }) => {
    // remove questions that have argument value
    const toAsk = questions.filter(object => !args[object.name]);

    return inquirer
      .prompt(toAsk)
      .then((answers) => {
        const combinedAnswers = { ...answers, ...args };

        // format answers
        const formattedAnswers = {
          ...combinedAnswers,
          name: kebab(combinedAnswers.name),
        };

        const nextQuestions = [
          {
            type:    'input',
            name:    'gitConfigName',
            message: 'Git Config Name',
            default: answers.authorName,
          },
          {
            type:    'input',
            name:    'gitConfigEmail',
            message: 'Git Config Email',
            default: answers.authorEmail,
          },
          {
            type:    'input',
            name:    'directory',
            message: 'Project Directory',
            default: path.join(process.cwd(), formattedAnswers.name),
            filter(input) {
              return path.normalize(
                path.isAbsolute(input) ? input : path.resolve(process.cwd(), input),
              );
            },
          },
        ];
        const toAskAgain = nextQuestions.filter(object => !args[object.name]);

        return inquirer.prompt(toAskAgain).then((nextAnswers) => {
          const merged = { ...formattedAnswers, ...nextAnswers };
          return {
            ...merged,
            projectName:      merged.name,
            projectDirectory: path.normalize(
              path.isAbsolute(merged.directory) ? merged.directory : path.resolve(process.cwd(), merged.directory),
            ),
          };
        });
      });
  },
};
