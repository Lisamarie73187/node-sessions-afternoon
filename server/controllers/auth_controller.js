let users = require('../models/users');

let id = 1;

module.exports = {
    login: (req,res,next) => {
        const user = users.find( user => user.username === req.body.username && user.password === req.body.password);

        if( user ) {
            req.session.user.username = user.username;
            res.status(200).send(req.session.user);
        } else {
            res.status(500).send('Unauthorized');
        }
    },

    register: (req,res,next) => {
        const { session } = req;
        const { username, password } = req.body;

        users.push({ id, username, password });
        id++;

        session.user.username = username;

        res.status(200).send ( session.user );
    },

    signout: (req,res,next) => {
        const { session } = req;
        session.destroy();
        res.status(200).send( req.session );
    },

    getUser: (req,res,next) => {
        const { session } = req;
        res.status(200).send( session.user );
    }
};