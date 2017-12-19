const express = require('express');
const session = require ('express-session');
const bodyParser = require ('body-parser');
require('dotenv').config();
const checkForSession = require ('./middlewares/checkForSession');
const swag = require ('./controllers/swag_controllers');
const auth_controller = require ('./controllers/auth_controller');
const cart_controller = require ('./controllers/cart_controller');
const search_controller = require ('./controllers/search_controller');
const port = 3001;

const app = express();

app.use( bodyParser.json() );
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     maxAge: 10000
    // }
}))

app.use(checkForSession)
app.use( express.static ('/../build'))

app.get('/api/swag',swag.read);

app.post('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)
app.get('/api/user', auth_controller.getUser)

app.post('/api/cart', cart_controller.add)
app.post('/api/cart/checkout', cart_controller.checkout)
app.delete('/api/cart', cart_controller.delete)

app.get('/api/search', search_controller.search)




app.listen(port, () => {
    console.log(`I'm Listening... on port: ${port}`)
})