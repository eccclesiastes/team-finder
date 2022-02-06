const router = require('express').Router();
const path = require('path');
const { readFile } = require('fs').promises;
const { 
    getStatement,
    getPossibleUsers,
    createUser
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

router.post('/create', async (req, res, next) => {
    createUser(req.body, (result) => {
         if (result) {
            res.status(201).send();
        } else {
            res.status(400).send();
        };
    });
});

module.exports = { router };