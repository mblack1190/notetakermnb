const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid');

const util = require('util');

const readFileAsync  = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read(){
        return readFileAsync('db/db.json', 'utf8')
    };
    write() {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    };
    getNotes() {
        return read().then(function(notes){
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes))

            } catch (error) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    } 
    addNotes(note) {
        const { title, text } = note;
        const newNote = { title, text, id: uuidv1()}
        console.log(newNote);
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() =>newNote)
    }
    removeNotes(id) {
        return this.getNotes().then(notes => notes.filter(note => note.id !== id))
        .then(filterNotes => this.write(filterNotes))
    }
}

module.exports = new Store;