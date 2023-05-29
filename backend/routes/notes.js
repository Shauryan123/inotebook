const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const User = require("../models/User");
const Notes = require("../models/Notes");

router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
});

router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      const foundUser = await User.findById(req.user.id);

      console.log("BEFORE: " + foundUser );
      foundUser.name ="shaun";
      foundUser.numberOfNotes = foundUser.numberOfNotes + 1;
      console.log("AFTER: " + foundUser );

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);
router.put(
    "/updateNote/:id",
    fetchUser,
    [
      body("title", "Enter a valid title").isLength({ min: 3 }),
      body("description", "Description must be atleast 5 characters").isLength({
        min: 5,
      }),
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.params;

        const {title, description, tag} = req.body;

        const newNote = {};
        if (title) {

            newNote.title = title;
        }
        if (description) {

            newNote.description = description;
        }
        if (tag) {

            newNote.tag = tag;
        }

        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ error: "Sorry no such note exists!" });
        }

        if (note.user.toString() !== req.user.id) {

            return res.status(401).send("Not Allowed!")
        }

        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true});

        res.json({note});
        // if (!foundNote) {

        //     return res.status(400).json({ error: "Sorry no such note exists!" });
        //  }

         //const {title, description, tag} = req.body;



        }

        // const { title, description, tag } = req.body;

        // const note = new Notes({
        //   title,
        //   description,
        //   tag,
        //   user: req.user.id,
        // });

        // const savedNote = await note.save();

        // res.json(savedNote);
      catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
      }

    });

    router.delete(
        "/deleteNote/:id",
        fetchUser,
        async (req, res) => {
          try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }

            const {id} = req.params;

            let note = await Notes.findById(req.params.id);

            if (!note) {
                return res.status(404).json({ error: "Sorry no such note exists!" });
            }

            if (note.user.toString() !== req.user.id) {

                return res.status(401).send("Not Allowed!")
            }

            note = await Notes.findByIdAndDelete(req.params.id);

            res.json({"Success" : "Note has been Deleted!", note: note});
            // if (!foundNote) {

            //     return res.status(400).json({ error: "Sorry no such note exists!" });
            //  }

             //const {title, description, tag} = req.body;



            }

            // const { title, description, tag } = req.body;

            // const note = new Notes({
            //   title,
            //   description,
            //   tag,
            //   user: req.user.id,
            // });

            // const savedNote = await note.save();

            // res.json(savedNote);
          catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
          }

        });

module.exports = router;
