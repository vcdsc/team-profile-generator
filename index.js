const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// ===> FEED INQUIRER PROMPTS START
// vcdsc_prompts_1: First member of Team to be added is always Manager. Because the Manager class extends the Employee class, and we will need to create an instance of Manager later, we need to ensure that managerPrompt contains all the properties the Manager class requires.
const managerPrompt = [
  {
    type: "input",
    name: "managerName",
    message: "Please enter Manager's name.",
  },
  {
    type: "number",
    name: "managerId",
    message: "Please enter Manager's employee ID.",
  },
  {
    type: "input",
    name: "managerEmail",
    message: "Please enter Manager's email address.",
  },
  {
    type: "number",
    name: "managerOfficeNumber",
    message: "Please enter Manager's office number.",
  },
];

// vcdsc_prompts_2: Once a Manager is added, User is prompted to either a) add more team members (Engineer or Intern) or b) finish the team set up.
const addTeamMemberPrompt = [
  {
    type: "list",
    name: "addTeamMember",
    message: "What do you want to do next?",
    choices: [
      {
        name: "Add an Engineer to the Team.",
        value: "addEngineer",
      },
      {
        name: "Add an Intern to the Team.",
        value: "addIntern",
      },
      {
        name: "Team is complete, proceed to generate Team's page.",
        value: "isTeamComplete",
      },
    ],
  },
];

// vcdsc_prompts_3: Because the Engineer class extends the Employee class, and we will need to create an instance (or several) of Engineer later, we need to ensure that engineerPrompt contains all the properties the Engineer class requires.
const engineerPrompt = [
  {
    type: "input",
    name: "engineerName",
    message: "Please enter Engineer's name.",
  },
  {
    type: "number",
    name: "engineerId",
    message: "Please enter Engineer's employee ID.",
  },
  {
    type: "input",
    name: "engineerEmail",
    message: "Please enter Engineer's email address.",
  },
  {
    type: "input",
    name: "engineerGitHub",
    message: "Please enter Engineer's GitHub handle.",
  },
];

// vcdsc_prompts_4: Because the Intern class extends the Employee class, and we will need to create an instance of Intern (or several) later, we need to ensure that internPrompt contains all the properties the Intern class requires.
const internPrompt = [
  {
    type: "input",
    name: "internName",
    message: "Please enter Intern's name.",
  },
  {
    type: "number",
    name: "internId",
    message: "Please enter Intern's employee ID.",
  },
  {
    type: "input",
    name: "internEmail",
    message: "Please enter Intern's email address.",
  },
  {
    type: "input",
    name: "internSchool",
    message: "Please enter Intern's school.",
  },
];
// <=== FEED INQUIRER PROMPTS END

// The triggerTeamBuilder function will allows to start the process of building a team, by capturing the necessary details to generate the first team member, the Manager.
function triggerTeamBuilder() {
  // The below message is displayed in the terminal once index.js is triggered to run through Node.js.
  console.log(
    "Let's build you a Team! :) Just follow the prompts and this will be generated for you."
  );

  // We will use the employees variable to hold the members of our team.
  const employees = [];

  inquirer.prompt(managerPrompt).then((data) => {
    // We are using the input collected through the Inquirer prompts to instantiate the Manager class.
    const manager = new Manager(
      data.managerName,
      data.managerId,
      data.managerEmail,
      data.managerOfficeNumber
    );

    // We then add our newly created manager to our array of employees.
    employees.push(manager);
    console.log(employees);
  });
}

triggerTeamBuilder();
