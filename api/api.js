const router = require('express').Router();
const path = require('path');
const { readFile } = require('fs').promises;
const { 
    getStatement,
    getPossibleUsers,
    createUser,
    getUpdateStatement,
    updateUser
} = require('../src/builder/builder.js');

router.get('/', async (req, res, next) => {
    const sqlStatement = getStatement(req.body);

    const jsonQuery = getPossibleUsers(sqlStatement, (result) => {
        res.send(JSON.stringify(result));
    });
});

router.post('/create', async (req, res, next) => {
    createUser(req.body, (result) => {
         if (result) {
            res.status(201).send(JSON.stringify(result));
        } else {
            res.status(400).send();
        };
    });
});

router.post('/update', async (req, res, next) => {
    const sqlStatement = getUpdateStatement(req.body);
    
    if (sqlStatement === 1) {
        res.status(400).send();
    } else {
        updateUser(sqlStatement, (result) => {
            if (result.affectedRows > 0) {
                res.send(JSON.stringify(result));
            } else {
                res.status(400).send();
            }
        });
    };
});

module.exports = { router };