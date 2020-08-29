const yargs = require("yargs");
const notes = require("./notes.js");
const chalk = require("chalk");


yargs.command({
    command: "add",
    describe: "add a note",
    builder: {
        title:{
            describe: "note title",
            demandOption: true,
            type: "string"
        },
        body:{
            describe: "note body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
        // console.log(`title: ${argv.title}`);
        // console.log(`content: ${argv.body}`);
    }
})

yargs.command({
    command: "remove",
    describe: "remove a new note",
    builder: {
        title:{
            describe: "note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
        //console.log("removing a new note")
    }
})

yargs.command({
    command: "list",
    describe: "displaying notes in list",
    handler(argv) {
        notes.listNotes(argv.title, argv.body);
    }
})

// yargs.command("list" , "displaying notes in list", function() {
//     console.log("showing notes list");
// })

yargs.command({
    command: "read",
    describe: "read your notes",
    builder: {
        title: {
            describe: "read note",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

yargs.parse();
//console.log(yargs.argv);