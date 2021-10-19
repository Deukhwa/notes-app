const fs = require('fs')
const { addNote } = require('./notes')

const getNotes = function () {
  return 'your note is...'
}

const addNote = function (title, body) {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => note.title === title)

  if (duplicateNotes.length === 0) {
    note.push()
  } else {
    console.log('Note title taken')
  }
}

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  getNotes: getNotes,
  addNotes: addNote,
  removeNotes: removeNote,
}
