const express = require('express')
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(express.static("dist"))
app.use(cors())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/', (req, res) => {
    res.send('hello world')
})
app.get('/api/notes', (req, res) => {
    res.json(notes)
})
app.post('/api/notes', (req, res) => {
    const note = req.body;
    console.log(note);
    res.json(note)
})

app.patch('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = req.body;
    console.log(note)
    let noteToUpdate = notes.find(n => n.id === id)
    noteToUpdate = {...noteToUpdate, ...note}
    notes.forEach(n => n.id === id ? noteToUpdate : n);
    res.json(noteToUpdate)
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter( note => note.id !== id)
    res.status(204).end();
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('lisnteing port', PORT)
})