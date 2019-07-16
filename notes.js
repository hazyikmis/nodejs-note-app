const fs = require("fs");
const chalk = require("chalk");

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const getNotes = () => {
  return "Your notes ...";
};

//const addNote = function(title, body) {
const addNote = (title, body) => {
  const notes = loadNotes();
  //console.log(notes);
  //filter: if true then item is pushed to results and iteration continues
  //returns empty array for complete falsy scenario
  /*
  const duplicateNotes = notes.filter(note => {
    return note.title === title;
  });
*/
  //  const duplicateNotes = notes.filter(note => note.title === title);
  const duplicateNote = notes.find(note => note.title === title);

  //  if (duplicateNotes.length === 0) {
  if (!duplicateNote) {
    /*
  notes.push({
    title: title,
    body: body
  });
  */
    notes.push({
      title,
      body
    });
    saveNotes(notes);
    console.log(chalk.green("New note added."));
  } else {
    console.log(chalk.red("Note not added:") + " Title taken already!");
  }
};

const removeNote = title => {
  const notes = loadNotes();
  /*
  const remainingNotes = notes.filter(note => {
    return note.title !== title;
  });
*/
  const remainingNotes = notes.filter(note => note.title !== title);

  if (notes.length > remainingNotes.length) {
    saveNotes(remainingNotes);
    console.log(chalk.green("Note removed:") + title);
  } else {
    console.log(chalk.red("Note not removed:") + " Title not found!");
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse(`Your Notes (${notes.length}):`));
  notes.forEach(note => {
    console.log(note.title);
  });
};

const readNote = title => {
  const notes = loadNotes();
  const foundNote = notes.find(note => note.title === title);
  if (foundNote) {
    console.log(chalk.blue(foundNote.title) + ": " + foundNote.body);
  } else {
    console.log(
      chalk.red("Note not found") + ": No such title (" + title + ")"
    );
  }
};

//module.exports = {getNotes, addNote, removeNote, listNodes, readNote};
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNodes: listNotes,
  readNote: readNote
};
