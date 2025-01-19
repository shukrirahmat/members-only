const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const validateUser = [
    body("firstname")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`First name is required`),
    body("lastname")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Last name is required`),
    body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Username is required`)
    .custom(value => {return !(value.includes(" "))})
    .withMessage(`Username is cannot have spaces`),
    body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage(`Password must be at least 6 characters long`),
];

const getSignUpPage = (req, res) => {
    res.render("signUpPage", {title: "Signing Up"});
}

const signUpNewMember = [
    validateUser,
    asyncHandler(async (req, res) => {
        const errorArray = validationResult(req).array();

        if (req.body.password !== req.body.password2) {
            errorArray.push({msg: "Password did not match"});
        }

        const usernameExists = await db.checkIfUserNameExists(req.body.username);
        if (usernameExists[0]) {
            errorArray.push({msg: `Username "${req.body.username}" already exists`});
        }

        if (errorArray.length > 0) {
            return res.status(400).render("signUpPage", {
                title: "Signing Up",
                errors: errorArray
            });
        }

        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) throw err;
            else await db.addUser(req.body, hashedPassword);
        })
        res.render("signUpSuccess", {username: req.body.username});
    })
]

module.exports = {
    getSignUpPage,
    signUpNewMember
}