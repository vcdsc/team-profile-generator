// ===> FEED INQUIRER PROMPTS START
// First member of Team to be added is Manager.
// Because the Manager class extends the Employee class, and we will need to create an instance of Manager, we need to ensure that managerPrompt contains all the properties the Manager class requires.
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

// Once a Manager is added, User is prompted to either 1) add more team members (Engineer or Intern) or 2) finish the team set up
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
      // name might need tweaking
      {
        name: "Team is complete, no need to add any more team members.",
        value: "isTeamComplete",
      },
    ],
  },
];

// Because the Engineer class extends the Employee class, and we will need to create an instance of Engineer further ahead, we need to ensure that engineerPrompt contains all the properties the Engineer class requires.
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

// Because the Intern class extends the Employee class, and we will need to create an instance of Intern further ahead, we need to ensure that internPrompt contains all the properties the Intern class requires.
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

module.exports = {
  managerPrompt,
  addTeamMemberPrompt,
  engineerPrompt,
  internPrompt,
};
