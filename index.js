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
// vcdsc_prompts_1: First member of team to be added is always Manager. Because the Manager class extends the Employee class, and we will need to create an instance of Manager later, we need to ensure that managerPrompt contains all the properties the Manager class requires.
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

// vcdsc_triggerTeamBuilder_1: The triggerTeamBuilder function will allows to start the process of building a Team, by capturing the necessary details to generate the first team member, the Manager.
function triggerTeamBuilder() {
  // The below message is displayed in the terminal once index.js is triggered to run through Node.js.
  console.log(
    "Let's build you a Team! :) Just follow the prompts and this will be generated for you."
  );

  // vcdsc_triggerTeamBuilder_2: We will use the employees variable to hold the members of our team.
  const employees = [];

  inquirer.prompt(managerPrompt).then((data) => {
    // vcdsc_triggerTeamBuilder_3: We are using the input collected through the Inquirer prompts to instantiate the Manager class.
    const manager = new Manager(
      data.managerName,
      data.managerId,
      data.managerEmail,
      data.managerOfficeNumber
    );

    // vcdsc_triggerTeamBuilder_4: We then add our newly created manager to our array of employees.
    employees.push(manager);

    addEmployee(employees);
  });
}

triggerTeamBuilder();

// vcdsc_addEmployee_1: The addEmployee function will allow us to select between the following options: 1) add an Engineer to the team, 2) add an Intern to the team, or 3) mark the team as complete. Until such a point where option 3 is selected, User should be prompted to enter the necessary details to create either an Engineer or an Intern and add them to the team.
// Using this example:
// https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/examples/recursive.js
// Made the addEmployee function into a recursive function; until we tell it to stop (once the team is complete) it will keep updating the employees array with either new instances of Engineers and/or Interns.
function addEmployee(employees) {
  inquirer.prompt(addTeamMemberPrompt).then((data) => {
    if (data.addTeamMember === "addEngineer") {
      // If the User opts to add an Engineer to the team, their input is used to build a new instance of the Engineer class.
      inquirer.prompt(engineerPrompt).then((data) => {
        const engineer = new Engineer(
          data.engineerName,
          data.engineerId,
          data.engineerEmail,
          data.engineerGitHub
        );

        // This new instance of the Engineer class is then added to the employees array.
        employees.push(engineer);

        // Every time we do this (i.e. add an Engineer to the team) our employees array will be updated with the newly added employee.
        addEmployee(employees);
      });
    } else if (data.addTeamMember === "addIntern") {
      // If the User opts to add an Intern to the team, their input is used to build a new instance of the Intern class.
      inquirer.prompt(internPrompt).then((data) => {
        const intern = new Intern(
          data.internName,
          data.internId,
          data.internEmail,
          data.internSchool
        );

        // This new instance of the Engineer class is then added to the employees array.
        employees.push(intern);

        // Every time we do this (i.e. add an Intern to the team) our employees array will be updated with the newly added employee.
        addEmployee(employees);
      });
    } else {
      // In order to effectively use Recursion, the function must have a condition to stop calling itself. In this case, if we are neither adding an Engineer or an Intern this means we are done building our team, hence the addEmployee function will stop calling itself.
      console.log(employees);
      return;
    }
  });
}
