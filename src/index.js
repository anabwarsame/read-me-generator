const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const questions = [
  {
    type: "input",
    name: "title",
    message: "what is the title of your Readme.md?",
  },
  {
    type: "input",
    name: "description",
    message: "please enter your description for your readme.md",
  },
  {
    type: "confirm",
    name: "hasInstallation",
    message: "do you have an installation script",
  },
  {
    type: "input",
    name: "installation",
    message: "what is the installation script for your project",
    when: (answers) => {
      return answers.hasInstallation;
    },
  },
  {
    type: "input",
    name: "user",
    message: "how does the user use your application",
  },
  {
    type: "confirm",
    name: "hasTest",
    message: "do you have tests for your application",
  },
  {
    type: "input",
    name: "tests",
    message: "how do i test the application",
    when: (answers) => {
      return answers.hasTest;
    },
  },
  {
    type: "list",
    name: "license",
    message: "please choose what license you used for your project?",
    choices: ["MIT", "GPLv2", "Apache"],
  },
  {
    type: "input",
    name: "github",
    message: "please enter your github username",
  },
  {
    type: "input",
    name: "email",
    message: "please enter your email address",
  },
  {
    type: "input",
    name: "contributors",
    message: "please enter the contributors to your project",
  },
];

const createMd = (answers) => {
  return `# ${answers.title} ![${
    answers.license
  }](https://img.shields.io/static/v1?label=${
    answers.license
  }&message=License&color=green)

  ## Table of Contents

  - [Description](#description)
  ${answers.hasInstallation ? `- [Installations](#installations)` : ""}
  - [User Story](#user-story)
  ${answers.hasTest ? `- [Tests](#tests)` : ""}
  - [License](#license)
  - [Github](#github)
  - [Email address](#email-address)
  - [Contributors](#contributors)

  ## Description

  ${answers.description} 

  ${
    answers.hasInstallation
      ? `## Installations

  \`\`\`
  ${answers.installation}
  \`\`\``
      : ""
  }

   ## User Story

   ${answers.user}

  ${
    answers.hasTest
      ? `## Tests
  \`\`\`
  ${answers.tests}
  \`\`\``
      : ""
  }

  ## License
  ${answers.license}

  ## Github 
  [${answers.github}](https://github.com/${answers.github})

  ## Email address
  ${answers.email}

  ## Contributors
  ${answers.contributors}
  `;
};

const writeToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, data);
  } catch (error) {
    console.log(error.message);
  }
};

const init = async () => {
  // ask all questions
  const answers = await inquirer.prompt(questions);

  // generate the markdown
  const markdown = createMd(answers);

  // write to file
  writeToFile(path.join(__dirname, "../GENERATED_README.md"), markdown);

  console.log("Successfully generated README file");
};

init();
