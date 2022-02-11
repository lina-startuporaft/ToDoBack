const router = require('express').Router()
const { body } = require('express-validator');
const checkError = require('../checkErrorValidation/checkError.js');
const db = require('../models/index.js');
const bcrypt = require('bcryptjs');

router.route('/regist').post(
    body('name').isLength({ min: 1, max: 20}).withMessage('login must be between 1 and 20 characters'),
    body('password').isLength({ min: 6, max: 10}).withMessage('password must be between 6 and 10 characters'),
    checkError,
    async (req, res, next) => {
        try {
            const { name, password } = req.body;
            const checkingUser = await db.User.findOne({
                where: {
                    name: name,
                }
            });
            if (checkingUser) {
                throw new Error('there is already such a user');
            };
            const hashPassword = bcrypt.hashSync(password, 7);
            const newUser = await db.User.create({name, password: hashPassword});
            res.status(200).send(newUser);
        } catch(err) {
            if (err.message === 'there is already such a user') {
                res.status(422).send(err);
            } else {
                res.status(404).send(err);
            }
        }
    }
)

module.exports = router;