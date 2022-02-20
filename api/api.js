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
    res.send(await readFile('./home.html', 'utf-8'));
});

router.get('/search', async (req, res, next) => {
    res.send(await readFile('./index.html', 'utf-8'));
});

router.get('/login', async (req, res, next) => {
    res.send(await readFile('./login.html', 'utf-8'));
});

router.post('/search', async (req, res, next) => {
    const sqlStatement = getStatement(req.body);

    const jsonQuery = getPossibleUsers(sqlStatement, async (result) => {
        const html = await readFile('./result.html', 'utf-8');
        let results = '';

        if (result) {
            for (let i = 0; i < result.length; i++) {
                results += `
                <tr>
                    <td>${result[i].name}</td>
                    <td>${result[i].experience}</td>
                    <td>${result[i].qualifications}</td>
                    <td>${result[i].year_joined}</td>
                    <td>${result[i].location}</td>
                    <td>${result[i].ou}</td>
                    <td>${result[i].contact_info}</td>
                    <td>${result[i].grade}</td>
                    <td>${result[i].skills}</td>
                    <td>${result[i].current_project}</td>
                    <td>${result[i].availability}</td>
                </tr>
                `
            };
        
        const replacedHtml = html.replace('placeholder', results);
        
        res.send(replacedHtml);
        } else {
            res.status(404).send(`<style>body {margin: 0;}</style><h1 style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; margin: 0 !important; text-align: center; background-color: rgb(51,51,51); color: white; padding-top: 25px; padding-bottom: 25px; margin-block-end: 0px !important; margin-block-start: 0px !important;">No results found</h1>`);
        };
    });
});

router.post('/login', async (req, res, next) => {
    const correctUsername = 'admin';
    const correctPassword = 'admin';
    const inputtedUsername = req.body.username;
    const inputtedPassword = req.body.password;

    if (correctUsername === inputtedUsername && correctPassword === inputtedPassword) {
        res.send(await readFile('./create.html', 'utf-8'));
    } else if (inputtedUsername !== undefined && inputtedPassword !== undefined) {
        const html = await readFile('./login.html', 'utf-8');
        const replacedHtml = html.replace(`hidden="true"`, '');
        res.send(replacedHtml);
    };

    /* ---------------------------------------------------------------------------------- */

    const createName = req.body.createName;
    const updateName = req.body.updateName;

    if (createName) {
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
    } else if (updateName) {
        const sqlStatement = getUpdateStatement(req.body);

        if (sqlStatement === 1) {
            const html = await readFile('./create.html', 'utf-8');
            const replacedHtml = html.replace(`hidden="true"`, '');
            res.send(replacedHtml);
        } else {
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
        };
    };
});

module.exports = { router };