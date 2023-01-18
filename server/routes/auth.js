const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");
const JWT_SECRET = "thisIsTheEnd";
let success = true

//Start making routes of project
router.get("/", (req, res) => {
    console.log(req.body);
    res.send(req.body);
    const user = User(req.body);
    user.save();
});

//to set value of user
router.post("/createuser", [
    body("name").isLength({min: 3}),
    body("email").isEmail(),
    body("password").isLength({min: 3}),
],
    async(req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).json({success, errors: errors.array() });
        }

        try{
            let user = await User.findOne({email: req.body.email});

            if (user){
                success = false
                return res
                          .status(400)
                          .json({success, error: "The email already exists"});
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            const data = {
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(data, JWT_SECRET);

            res.json({success, authToken});
        }catch (error){
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
);

//router to get jwt token by validation
router.post(
    "/login",
    [body("email").isEmail(), body("password").exists()],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            success = false
            return res.status(400).json({success, errors: errors.array() });
        }

        const {email, password} = req.body;

        try{
            let user = await User.findOne({email: req.body.email});
            if (!user){
                return res
                    .status(400)
                    .json({error: "Enter correct information"});
            }

            const passCompare = await bcrypt.compare(password, user.password);

            if (!passCompare){
                return res
                    .status(400)
                    .json({error: "Enter correct information"});
            }

            const data = {
                user: {
                    id: user.id,
                },
            };

            const authToken = jwt.sign(data, JWT_SECRET);

            res.json({success: authToken});
        }catch (error){
            console.error(error);
            res.status(500).send("Internal server error");
        }
    }
);

router.post("/getuser", fetchUser, async(req, res) => {
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;