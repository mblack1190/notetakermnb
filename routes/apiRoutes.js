const router = require("express").Router();
const store = require("../db/store");

//GET "/api/notes" sends all notes from database
router.get("/notes", (req, res) => {
    store
        .getNotes().then((notes) => res.json(notes))
        .catch((err) => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
    store
        .addNotes(req.body).then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

//delete "/api/notes" deletes note with id equal to req.params.id
router.delete("/notes/:id", (req, res) => {
    store
        .removeNotes(req.params.id).then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;