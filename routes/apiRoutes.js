const path = require('path');
const router = require('express').Router();
const fs = require('fs');
const {v4: uuidv4 } = require("uuid");
const { route } = require('./htmlRoutes');

router.get('/notes', (req, res) => {
let db = fs.readFileSync("db/db.json")
db = JSON.parse(db);
res.json(db);
});

router.post('/notes', (req, res) => {
let newNote = {
    id:uuidv4(),
    title: req.body.title,
    text: req.body.text
};
let db = fs.readFileSync("db/db.json")
db = JSON.parse(db);
db.push(newNote)
fs.writeFileSync("db/db.json", JSON.stringify(db));
res.json(db);
})

router.delete('/notes/:id', (req, res) => {
let db = fs.readFileSync("db/db.json")
db = JSON.parse(db);
db = db.filter(note => note.id !== req.params.id);
fs.writeFileSync("db/db.json", JSON.stringify(db));
res.json(db);
});

module.exports = router