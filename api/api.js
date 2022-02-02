const router = require('express').Router();
const path = require('path');
const { readFile } = require('fs').promises;
const { 
    getStatement,
    getPossibleUsers
} = require('../src/builder/builder.js');

router.get('/', async (req, res, next) => {
    res.send(await readFile(path.join('./index.html'), 'utf-8'));
});

router.post('/', async (req, res, next) => {
    const sqlStatement = getStatement(req.body);

    const jsonQuery = await getPossibleUsers(sqlStatement, (result) => {
        res.send(JSON.stringify(result));
    });
});

module.exports = { router };