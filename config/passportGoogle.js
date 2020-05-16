const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleConfig = require('./googleConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Credito = require('../models/Credito')

passport.use(new GoogleStrategy({
    clientID: googleConfig.clientID,
    clientSecret: googleConfig.clientSecret,
    callbackURL: googleConfig.callbackURL // localhost:3000/google/redirect    
}, function(accessToken, refreshToken, profile, done){
    if(profile==null){
        done(null, false, {error: "Autentificación por Google Fallo"})
        return;
    }
    
    User.findOne({ email: profile._json.email })
        .then( user => {
            if(user){
                done(null, user);
                console.log("Google User found!");
                return;
            } else{
                User.count()
                .then( cnt => {
                    const newUser = new User({
                        id: cnt+1,
                        name: profile._json.name,
                        email: profile._json.email,
                        password: '12345',
                        direccion: 'No Direccion Specified',
                        city: 'No City Specified',
                        country: 'No Country Specified',
                        date: new Date,
                        token: ''
                    });
                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            // Save user
                            newUser.save()
                                .then(user => {
                                    Credito.count()
                                    .then( cntCredito => {
                                        const newCredito = new Credito({
                                            idCredito: cntCredito+1,
                                            idUsuario_fk: user.id,
                                            CantidadCredito: 0,
                                            moneda: 'MX',
                                            fechaAlta: new Date
                                        });
                                        newCredito.save()
                                        .then( credito => {
                                            done(null, user);
                                        })
                                        .catch( err => console.log(err) );
                                    })
                                })
                                .catch(err => console.log(err));
                    }))
                })
                .catch(err => console.log(err));
            }
        })
}

))

function googleLogin(req, res){
    console.log("Starting googleLogin...");
    passport.authenticate('google', (err, user, info) => {
        console.log("Starting Google Strategy");
        if(user){
            const body = { _id : user._id, email : user.email };
            let token = jwt.sign({ name: body }, 'PAE2020', {expiresIn:'1d'});
            User.collection.update({ email:user.email}, {$set: {"token":token}});
            res.status(200).send({token: token, email: user.email});
        } else {
            res.status(401).send({err, info});
        }
    })(req, res)
}

module.exports = {googleLogin};