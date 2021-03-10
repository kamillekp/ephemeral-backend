require('./dataBase/dbConnection');
const session = require('express-session');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.listen(3333, () => console.log('Server is running'));