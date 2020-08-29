const fs = require("fs");
const chalk = require("chalk")
const { remove } = require("fs-extra");

const getNotes = () => {
    const notes = "your notes...";
    return notes;
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateTitle = notes.find((note) => title === note.title);
    // const duplicateTitle = notes.filter(function(note) {
    //     return title === note.title; 
    // });
    if(!duplicateTitle) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log("new note added");
    } else {
        console.log("title taken");
    }  
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => title !== note.title);

    if(notes.length > notesToKeep.length){
        console.log(chalk.bgGreen("note removed"));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.bgRed("note not found"));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green.underline("your notes:"));
    notes.forEach(note => {
        console.log(`${note.title}: ${note.body}`); 
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteToFind = notes.find((note) => title === note.title)
    if (noteToFind) {
        console.log(`${noteToFind.title}: ${noteToFind.body}`)
    } else {
        console.log(chalk.red("note not found"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON)
}

loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json" );
        const dataString = dataBuffer.toString();
        return JSON.parse(dataString)
    } catch {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}


