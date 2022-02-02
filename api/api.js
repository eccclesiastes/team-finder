const router = require('express').Router();
const { 
    getStatement,
    getPossibleUsers
} = require('../src/builder/builder.js');

router.post('/', async (req, res, next) => {
    const sqlStatement = getStatement(req.body);

    const jsonQuery = await getPossibleUsers(sqlStatement, (result) => {
        res.send(JSON.stringify(result));
    });
});

module.exports = { router };