const router = require('express').Router();
const { query } = require('express-validator');
const db = require('../../models/index.js');
const checkError = require('../../checkErrorValidation/checkError.js');

router.route('/tasks').delete(
        query('uuid').isUUID(),
        checkError,
    async (req, res) => {
        try {
            const { uuid } = req.query;
            await db.Task.destroy({ where: { uuid } });
            res.sendStatus(202);
        } catch(err) {
            res.status(400).send(err);
        }
    }
)

module.exports = router;