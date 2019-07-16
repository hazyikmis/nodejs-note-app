const chalk = require("chalk");
const yargs = require("yargs");
//const getNotes = require("./notes.js");
const notes = require("./notes.js");

//if you do not put this line below, version control done from the
//package.json, if you write down this code, then when anybody
//asks the version, the answer will be "1.0.9"
//>node app.js --version
//Customize app version via yargs:
yargs.version("1.0.9");

//Create add command via yargs:
//registering new command to app
//Checking all available commands: >node app.js --help
/*
yargs.command({
  command: "add",
  describe: "Add a new note",
  handler: function() {
    console.log("Adding a new note...");
  }
});
*/
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note text",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    //console.log("Title:", argv.title);
    //console.log(
    //  chalk.red("Title:") + argv.title + chalk.blue("\nBody:") + argv.body
    //);
    notes.addNote(argv.title, argv.body);
  }
});

//Create & register remove command via yargs:
yargs.command({
  command: "remove",
  describe: "Remove a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    //console.log("Removing a new note...");
    notes.removeNote(argv.title);
  }
});

//Create list command:
yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    //console.log("Listing out all notes...");
    notes.listNodes();
  }
});

//Create list command:
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    //console.log("Reading a note...");
    notes.readNote(argv.title);
  }
});

//console.log(process.argv);
//If you want to list all registered Commands & Options to this app
//you need to write down the code below:
//console.log(yargs.argv);
//>node app.js --help

//In order to write down args double, we can replace ">console.log(yargs.argv)" with ">yargs.parse()"
yargs.parse();

//example commands:
//node app.js --help
//node app.js add --help
//node app.js add --title="Shopping List" --body="sugar, bread, olive, cheese, water, butter, tomatoes"
