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

    const jsonQuery = getPossibleUsers(sqlStatement, (result) => {
        let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Results!</title>
            <style>
            h1 {
                text-align: center;
                background-color: rgb(51,51,51);
                color: white;
                padding-top: 25px;
                padding-bottom: 25px;
                margin-block-end: 0px;
                margin-block-start: 0px;
            }

            body {
                font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                margin: 0;
            }

            #form {
                padding-left: 45%;
                padding-right: 55%;
                padding-top: 2%;
            }

            label {
                width: 20%;
            }

            #year-label, #project-label {
                height: 150% !important;
                width: 150% !important;
            }

            #submit {
                margin-top: 20px;
            }

            table {
                margin-left: 15%;
                margin-right: 18%;
            }

            tr, td {
                padding-left: 10px;
                padding-right: 10px;
            }
            </style>
        </head>
        <h1>Result</h1>
        <br>
        <div class="table">
            <table class="results" style="border: 1px solid black">
                <tr>
                    <th>Name</th>
                    <th>Experience</th>
                    <th>Qualifications</th>
                    <th>Year Joined</th>
                    <th>Location</th>
                    <th>OU</th>
                    <th>Contact</th>
                    <th>Grade</th>
                    <th>Skills</th>
                    <th>Current Project</th>
                    <th>Availability</th>
                </tr>
        `;

        if (result) {
            for (let i = 0; i < result.length; i++) {
                html += `
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

            html += `</table></div></body></html>`

            res.send(html);
        } else {
            res.status(404).send(`<style>body {margin: 0;}</style><h1 style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; margin: 0 !important; text-align: center; background-color: rgb(51,51,51); color: white; padding-top: 25px; padding-bottom: 25px; margin-block-end: 0px !important; margin-block-start: 0px !important;">No results found</h1>`);
        };
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