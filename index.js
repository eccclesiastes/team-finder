const express = require('express');
const app = express();
const { router } = require('./api/api');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', router);
app.use('/img', express.static('img'));
app.use('/scripts', express.static('scripts'));

app.get('/', (req, res, next) => {
    res.send('Hello world!');
});

app.listen(8080, () => {
    console.log('Listening at port: http://localhost:8080');
});