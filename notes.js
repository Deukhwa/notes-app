const chalk = require('chalk')
const fs = require('fs')

const getNotes = () => {
  return `your note is...`
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    })
    saveNotes(notes)
    console.log(chalk.green.inverse(`New note added`))
  } else {
    console.log(chalk.red.inverse(`Note title taken!`))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)
  if (notes === notesToKeep) {
    console.log(chalk.bgGreen('No note found!'))
  } else {
    console.log(chalk.bgRed.inverse('Note removed!'))
    saveNotes(notesToKeep)
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.inverse('Your notes'))
  notes.forEach((note) => {
    console.log(chalk.bgMagenta(note.title))
  })
}

const readNotes = (title) => {
  const notes = loadNotes()
  const readNote = notes.find((note) => note.title === title)
  if (readNote) {
    console.log(chalk.bgGreen(readNote.title) + readNote.body)
  } else {
    console.log(chalk.red('Error. No Note Found'))
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
}
