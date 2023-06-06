const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "harryisagoodb$boy";

// sgMail.setApiKey('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');


// Create a User using: POST "/api/auth/createuser". No login required

// ...

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async(req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
        let success = false;
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ success, error: "Sorry, a user with this email already exists" });
        }
        // Create a new user

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            numberOfNotes: 1
        });

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        console.log(authToken);
        success = true;

        const sendGridUrl = 'https://api.sendgrid.com/v3/mail/send';
        const sendGridApiKey = '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';

        const sendGridData = {
            personalizations: [{
                to: [{
                    email: req.body.email,
                    name: req.body.name
                }],
                subject: 'Registration Confirmation'
            }],
            content: [{
                type: 'text/plain',
                value: 'Thank you for registering on our website!'
            }],
            from: {
                email: 'Shauryan100@gmail.com',
                name: 'Sender'
            },
            reply_to: {
                email: 'sender@example.com',
                name: 'Sender'
            }
        };

        const sendGridOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sendGridApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendGridData)
        };

        fetch(sendGridUrl, sendGridOptions)
            .then(() => {
                console.log('Email sent');
            })
            .catch((error) => {
                console.error(error);
            });

        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
});



router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async(req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {

        let success = false;
        const { email, password } = req.body;
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: "Please login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please login with correct credentials" })
        }

        const data = {

            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        return res.json({ success, authToken });



    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/getuser', fetchUser, async(req, res) => {

    try {

        let user_id = req.user.id;
        const user = await User.findById(user_id).select('-password');
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router