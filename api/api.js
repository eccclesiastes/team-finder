const router = require('express').Router();
const path = require('path');
const { readFile } = require('fs').promises;
const { 
    getStatement,
    getPossibleUsers,
    createUser,
    getUpdateStatement,
    updateUser,
    getCorrectPassword,
    getCreateStatementLogging,
    logAction
} = require('../src/builder/builder.js');

router.get('/', async (req, res, next) => {
    res.send(await readFile('./home.html', 'utf-8'));
});

router.get('/search', async (req, res, next) => {
    res.send(await readFile('./index.html', 'utf-8'));
});

router.get('/login', async (req, res, next) => {
    res.send(await readFile('./login.html', 'utf-8'));
});

router.get('/shortlist', async (req, res, next) => {
    res.send(await readFile('./shortlist.html', 'utf-8'));
});

router.post('/search', async (req, res, next) => {
    const sqlStatement = getStatement(req.body);

    const jsonQuery = getPossibleUsers(sqlStatement, async (result) => {
        const html = await readFile('./result.html', 'utf-8');
        let script = '';

        if (result) {
        
        script += `const data = ${JSON.stringify(result)}`;

        const replacedHtml = html.replace('script-placeholder', script);
        
        res.send(replacedHtml);
        } else {
            res.status(404).send(`<style>body {margin: 0; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;}</style><h1 style="margin: 0 !important; text-align: center; background-color: rgb(51,51,51); color: white; padding-top: 25px; padding-bottom: 25px; margin-block-end: 0px !important; margin-block-start: 0px !important;">No results found</h1><h4 style="text-align: center;"><a href="/">Back to home</a></h4>`);
        };
    });
});

router.post('/login', async (req, res, next) => {
    const inputtedUsername = req.body.usernameLogin;
    const inputtedPassword = req.body.passwordLogin;

    if (inputtedUsername && inputtedPassword) {
        getCorrectPassword(inputtedUsername, async (result) => {
            if (result) {
                if (result.length > 0 && result[0].password === inputtedPassword) {
                    const html = await readFile('./create.html', 'utf-8');
                    res.send(html);
                } else {
                    const html = await readFile('./login.html', 'utf-8');
                    const replacedHtml = html.replace(`hidden="true"`, '');
                    res.send(replacedHtml);
                };
            } else {
                const html = await readFile('./login.html', 'utf-8');
                const replacedHtml = html.replace(`hidden="true"`, '');
                res.send(replacedHtml);
            };
        });
    };

    /* ---------------------------------------------------------------------------------- */

    const createName = req.body.createName;
    const updateName = req.body.updateName;

    if (createName) {

        if (!req.body.username || !req.body.password) {
            const html = await readFile('./create.html', 'utf-8');
            const replacedHtml = html.replace(`hidden="error"`, '');
            return res.send(replacedHtml);
        };

        getCorrectPassword(req.body.username, async (result) => {

            const resultPassword = result[0].password;

            if (result.length > 0 && resultPassword === req.body.password) {
                logAction(req.body.username, getCreateStatementLogging(req.body), async (result) => {
                    if (result) {
                        createUser(req.body, async (result) => {
                            if (result) {
                                const html = await readFile('./create.html', 'utf-8');
                                const replacedHtml = html.replace(`hidden="yes"`, '');
                                res.send(replacedHtml);
                            } else {
                                const html = await readFile('./create.html', 'utf-8');
                                const replacedHtml = html.replace(`hidden="true"`, '');
                                res.send(replacedHtml);
                            };
                        });
                    } else {
                        const html = await readFile('./create.html', 'utf-8');
                        const replacedHtml = html.replace(`hidden="log-error"`, '');
                        res.send(replacedHtml);
                    };
                });
            } else {
                const html = await readFile('./create', 'utf-8');
                const replacedHtml = html.replace(`hidden="true"`, '');
                res.send(replacedHtml);
            };
        });
    } else if (updateName) {

        if (!req.body.username || !req.body.password) {
            const html = await readFile('./create.html', 'utf-8');
            const replacedHtml = html.replace(`hidden="error"`, '');
            return res.send(replacedHtml);
        };

        getCorrectPassword(req.body.username, async (result) => {

            const resultPassword = result[0].password;

            if (result.length > 0 && resultPassword === req.body.password) {
                const sqlStatement = getUpdateStatement(req.body);

                if (sqlStatement === 1) {
                    const html = await readFile('./create.html', 'utf-8');
                    const replacedHtml = html.replace(`hidden="true"`, '');
                    res.send(replacedHtml);
                } else {
                    logAction(req.body.username, sqlStatement, async (result) => {
                        if (result) {
                            updateUser(sqlStatement, async (result) => {
                                if (result.affectedRows > 0) {
                                    const html = await readFile('./create.html', 'utf-8');
                                    const replacedHtml = html.replace(`hidden="yes"`, '');
                                    res.send(replacedHtml);
                                } else {
                                    const html = await readFile('./create.html', 'utf-8');
                                    const replacedHtml = html.replace(`hidden="true"`, '');
                                    res.send(replacedHtml);
                                };
                            });
                        } else {
                            const html = await readFile('./create.html', 'utf-8');
                            const replacedHtml = html.replace(`hidden="log-error"`, '');
                            res.send(replacedHtml);
                        };
                    });
                };
            } else {
                const html = await readFile('./create.html', 'utf-8');
                const replacedHtml = html.replace(`hidden="error"`, '');
                res.send(replacedHtml);
            };
        });
    };
});

module.exports = { router };