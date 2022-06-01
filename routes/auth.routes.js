// const res = require("express/lib/response");

const router = require("express").Router();
const User = require('../models/User.model')

//GET signup page
router.get('/signup', (req, res, next) => {
    res.render('auth/signup.ejs')
})


// auth.routes.js
// the setup code skipped
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

// POST route ==> to process form data
router.post('/signup', (req, res, next) => {
    // console.log("The form data: ", req.body);

    const { username, email, password } = req.body;

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            // console.log(`Password hash: ${hashedPassword}`);
            return User.create({
                // username: username
                username,
                email,
                // passwordHash => this is the key from the User model
                //     ^
                //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
                passwordHash: hashedPassword
            })
        })
        .then(userFromDB => {
            // console.log('Newly created user is: ', userFromDB)
            res.redirect('/userProfile')
        })
        .catch(error => next(error))
});

router.get('/userProfile', (req, res) => res.render('users/user-profile'))

module.exports = router;