const express = require('express');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const router = express.Router();

const createPasswordSchema = (min, max, uppercase, lowercase, digits, symbols) => {

    const schema = new passwordValidator();

    schema
        .is().min(min)
        .is().max(max)
        .has().uppercase(uppercase)
        .has().lowercase(lowercase)
        .has().digits(digits)
        .has().not().spaces()
    if (symbols) {
        schema.has().symbols(symbols);
    }

    return schema;
}

const passwordSchema1 = createPasswordSchema(8, 20, 1, 1, 1);
const passwordSchema2 = createPasswordSchema(8, 20, 1, 1, 1, 1);
const passwordSchema3 = createPasswordSchema(10, 20, 1, 1, 1, 1);

const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;


router.post('/api/register', async (req, res) => {

    try {

        // Check if required fields are present
        if (!req.body.name) {
            res.status(400).send({ errors: { message: 'Missing required fields !!!', field: 'name' } });
            return;
        }

        if (!req.body.email) {
            res.status(400).send({ errors: { message: 'Missing required fields !!!', field: 'email' } });
            return;
        }

        if (!req.body.password) {
            res.status(400).send({ errors: { message: 'Missing required fields !!!', field: 'password' } });
            return;
        }

        if (!nameRegex.test(req.body.name)) {
            res.status(400).send({ errors: { message: 'Invalid name format !!!', field: 'name' } });
            return;
        }

        // Check if email is in a valid format
        if (!emailValidator.validate(req.body.email)) {
            res.status(400).send({ errors: { message: 'Invalid email format !!!', field: 'email' } });
            return;
        }

        // check password is in valid format
        if (!passwordSchema1.validate(req.body.password) && !passwordSchema2.validate(req.body.password) && !passwordSchema3.validate(req.body.password)) {
            res.status(400).send({ errors: { message: 'Invalid Password format !!!', field: 'password' } });
            return;
        }

        // checking if user already exists or not
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(400).send({ errors: { message: 'User already exists !!!', field: 'email' } });
            return;
        }

        // if no user already exists save the users
        if (!existingUser) {
            const users = userModel(req.body);
            const data = await users.save();
            const token = jwt.sign({ _id: data._id }, process.env.JWT_TOKEN);
            res.status(201).send({ success: { data, token } });
        }

    } catch (error) {
        res.send(error);
    }

});

router.post('/api/login', async (req, res) => {

    try {

        if (!req.body.email) {
            res.status(400).send({ errors: { message: 'Missing required fields !!!', field: 'email' } });
            return;
        }

        if (!req.body.password) {
            res.status(400).send({ errors: { message: 'Missing required fields !!!', field: 'password' } });
            return;
        }

        // Check if email is in a valid format
        if (!emailValidator.validate(req.body.email)) {
            res.status(400).send({ errors: { message: 'Invalid email format !!!', field: 'email' } });
            return;
        }

        // check password is in valid format
        if (!passwordSchema1.validate(req.body.password) && !passwordSchema2.validate(req.body.password) && !passwordSchema3.validate(req.body.password)) {
            res.status(400).send({ errors: { message: 'Invalid Password format !!!', field: 'password' } });
            return;
        }

        const existingUser = await userModel.findOne({ email: req.body.email });
        if (!existingUser) {
            res.status(400).send({ errors: { message: 'User does not exists !!!', field: 'email' } });
            return;
        }

        if (existingUser.password !== req.body.password) {
            res.status(400).send({ errors: { message: 'Password is wrong !!!', field: 'password' } });
            return;
        }

        if (existingUser) {
            const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_TOKEN, { expiresIn: '12h' });
            res.status(200).send({ success: { token, existingUser } });
        }

    } catch (error) {
        res.send(error);
    }

})

module.exports = router;