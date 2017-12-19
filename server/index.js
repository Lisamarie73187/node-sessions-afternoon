const express = require('express');
const session = require ('express-session');
const bodyParser = require ('body-parser');
require('dotenv').config();
const checkForSession = require ('./middlewares/checkForSession');
const swag = require ('./controllers/swag_controllers');
const port = 3001;

const app = express();

app.use( bodyParser.json() );
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000
    }
}))

app.use(checkForSession)

app.get('/api/swag',swag.read);






app.listen(port, () => {
    console.log(`I'm Listening... on port: ${port}`)
})