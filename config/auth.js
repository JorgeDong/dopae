const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.headers.authorization){
            var authHeader = req.headers.authorization;
            jwt.verify(authHeader, 'PAE2020', (err, decode) => {
                if(err) {
                    res.status(401).send({ message: 'Authentication failed, invalid token' })
                } else {
                    User.findOne({ email: decode.name.email })
                        .then( user => {
                            if(user.token == authHeader){
                                res.locals = user;
                                return next()
                            }
                            else{
                                res.status(401).send({ message: 'Authentication failed, token no longer valid' })
                            }
                        })
                        .catch( err => console.log(err) );
                }
            });
        } else {
            res.status(400).send({ message: 'Authentication failed, no token header found' })
        }
    }
}