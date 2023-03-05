const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const {
  managerPrompt,
  addTeamMemberPrompt,
  engineerPrompt,
  internPrompt,
} = require("./prompts");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

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
      // vcdsc_addEmployee_2: If the User opts to add an Engineer to the team, their input is used to build a new instance of the Engineer class.
      inquirer.prompt(engineerPrompt).then((data) => {
        const engineer = new Engineer(
          data.engineerName,
          data.engineerId,
          data.engineerEmail,
          data.engineerGitHub
        );

        // vcdsc_addEmployee_3: This new instance of the Engineer class is then added to the employees array.
        employees.push(engineer);

        // vcdsc_addEmployee_4: Every time we do this (i.e. add an Engineer to the team) our employees array will be updated with the newly added employee.
        addEmployee(employees);
      });
    } else if (data.addTeamMember === "addIntern") {
      // vcdsc_addEmployee_5: If the User opts to add an Intern to the team, their input is used to build a new instance of the Intern class.
      inquirer.prompt(internPrompt).then((data) => {
        const intern = new Intern(
          data.internName,
          data.internId,
          data.internEmail,
          data.internSchool
        );

        // vcdsc_addEmployee_6: This new instance of the Engineer class is then added to the employees array.
        employees.push(intern);

        // vcdsc_addEmployee_7: Every time we do this (i.e. add an Intern to the team) our employees array will be updated with the newly added employee.
        addEmployee(employees);
      });
    } else {
      // vcdsc_addEmployee_8: In order to effectively use Recursion, the function must have a condition to stop calling itself. In this case, if we are neither adding an Engineer or an Intern this means we are done building our team, hence we can generate the HTML for it and the addEmployee function will stop calling itself.
      buildTeamHTMLPage(employees);
      return;
    }
  });
}

// vcdsc_buildTeamHTMLPage_1: Once all User input has been collected through Inquirer and saved into the employees are, we now want to 1) make use of the render function provided and 2) create an HTML file using the HTML returned from the previous step.
function buildTeamHTMLPage(employees) {
  // vcdsc_buildTeamHTMLPage_2: fs.mkdir generates the directory where our file will live should it not exist; as for the recursive option, if our file directory was dependant on other directories, it would generate those as well, to ensure the file was placed in the correct directory.
  fs.mkdir(OUTPUT_DIR, { recursive: true }, (error) => {
    if (error) throw error;
  });

  // vcdsc_buildTeamHTMLPage_3: Whatever input we collected through our triggerTeamBuild and addEmployee functions will now be used to generate the HTML for the page.
  const teamMembers = render(employees);
  return fs.writeFile(outputPath, teamMembers, (error) => {
    error
      ? console.log(error)
      : console.log(
          "Done! Please open `index.html` in the browser to view your newly created Team. :)"
        );
  });
}
