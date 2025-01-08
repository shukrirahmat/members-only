const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateUser = [
    body("user_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`First name is required`),
    body("last_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Last name is required`),
    body("user_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Username is required`),
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
    async (req, res) => {
        const errorArray = validationResult(req).array();

        if (req.body.password !== req.body.password2) {
            errorArray.push({msg: "Password did not match"});
        }

        const existingUsername = await db.checkIfUserNameExists(req.body.user_name);
        if (existingUsername[0]) {
            errorArray.push({msg: `Username "${req.body.user_name}" already exists`});
        }

        if (errorArray.length > 0) {
            return res.status(400).render("signUpPage", {
                title: "Signing Up",
                errors: errorArray
            });
        }

        await db.addUser(req.body);
        res.redirect("/");
    }
]

module.exports = {
    getSignUpPage,
    signUpNewMember
}