const express = require(`express`);
const {body, validationResult} = require(`express-validator`);
const router = express.Router();
const Entry = require(`../models/entry`);
const fetchUser = require(`../middleware/fetchuser`);

//Get Method
router.get(`fetchAllEntries`, fetchUser, async(req, res) => {
    try{
        const users = await Entry.find({user: req.user.id});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Internal server error`);
    }
});

//Post Method
router.post(`/addEntries`, fetchUser, [
    body(`title`).isLength({min: 3}),
    body(`description`).isLength({min: 5}),
], async(req, res) => {
    try{
        const {title, description, tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        const ent = new Entry({
            title, 
            description, 
            tag,
            user: req.user.id,
        });

        const saveNote = await ent.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Internal Server Error`);
    }
});

//Update Method
router.put(`/updateEntry/:id`, fetchUser, async(req, res) => {
    try{
        const {title, description, tag} = req.body;
        const newEntry = {};
        if (title)  newEntry.title = title;
        if (description)    newEntry.description = description;
        if (tag)    newEntry.tag = tag;

        let ent = await Entry.findById(req.params.id);
        if (!ent)   return res.status(404).send(`Not Found`);
        if (ent.user.toString() !== req.user.id)    return res.status(401).send(`Not allowed`);

        ent = await Entry.findOneAndUpdate(
            req.params.id, 
            {$set: newEntry},
            {new : true}
        );
        res.json({ent});
    }catch(error){
        console.error(error);
        res.status(500).send(`Internal server error`);
    }
});

//Delete Method
router.delete(`/deleteEntry/:id`, fetchUser, async(req, res) => {
    try{
        let ent = await Entry.findById(req.params.id);
        if (!ent)   return res.status(404).send(`Not Found`);
        if (ent.user.toString() !== req.params.id)  return res.status(401).send(`Not Allowed`);

        ent = await Entry.findOneAndDelete(req.params.id);
        res.json({Success: `deleted successfully`, ent: ent});
    }catch(error){
        console.error(error);
        res.status(500).send(`Internal Server Error`);
    }
});

module.exports = router;