const inquirer = require("inquirer");
const fs = require("fs");

console.log("hi");
const createMd = (answer) => {
  return `# ${answer.title} 
  \`\`\` ${answer.description} \`\`\` 
  ## ${answer.installation}
  ## ${answer.user}
  ## ${answer.tests}
  ## ${answer.licenses}
  ### ${answer.github}
  ### ${answer.email}
  ### ${answer.contributors}
  `;
};
inquirer
  .prompt([
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
      type: "input",
      name: "installations",
      message: "do you have an installation script",
    },
    {
      type: "input",
      name: "installation",
      message: "what is the installation script for your project",
    },
    {
      type: "input",
      name: "User",
      message: "how does the user use your application",
    },
    {
      type: "input",
      name: "test",
      message: "do you have tests for your application",
    },
    {
      type: "input",
      name: "tests",
      message: "how do i test the application",
    },
    {
      type: "list",
      name: "licenses",
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
  ])
  .then((answer) => {
    fs.writeFile("read-me-generator.md", createMd(answer), function (err) {
      if (err) throw err;
    });
  });
