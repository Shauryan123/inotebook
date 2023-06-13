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
router.post('/resetpassword',async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    console.log("HII")
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log("HIII")
        let success = false;
      const { email, newPassword } = req.body;
      console.log(req.body.newPassword)

      // Check if the user with the provided email exists
      let user = await User.findOne({ email });
      console.log(email);
      console.log(user);
      if (!user) {
        return res.status(400).json({success: false, error: "No user found with this email" });
      }

      // Generate a new hashed password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });


  router.post('/createuser', [
    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('firstName', 'Enter a valid first name').isLength({ min: 1 }),
    body('lastName', 'Enter a valid last name').isLength({ min: 1 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, firstName, lastName, email, password, profileImg, designation } = req.body;

      // Check whether the user with this email exists already
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, error: "Sorry, a user with this email already exists" });
      }

      // Create a new user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = await User.create({
        firstName,
        lastName,
        title,
        email,
        password: hashedPassword,
        profileImg,
        designation
      });

      console.log(user);

      const data = {
        user: {
          id: user.id,
          username: user.email,
          email: user.email,
          profileImg: user.profileImg,
          name: user.name,
          designation: user.designation
        }
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authToken });
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

        console.log("LOGINNNNNNN")
        let success = false;
        const { email, password } = req.body;
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: "Please login with correct credentials" })
        }

        console.log("HHIII")
        console.log(user);

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