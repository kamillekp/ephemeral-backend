require('./dataBase/dbConnection');
require('dotenv');
const session = require('express-session');
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(routes);

app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
)

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.listen(process.env.PORT || 3333, () => console.log('Server is running'));