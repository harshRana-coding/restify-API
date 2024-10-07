const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../auth');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = server => {
    server.post('/register', (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;

        const newUser = new User({
            email: email,
            password: password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser.save().then(mssg => {
                    console.log("User is registered!");
                    res.send("New user registered!");
                    next();
                }).catch(err => {
                    console.log(err);
                })
            })
        })
    });
    //Auth user
    server.post('/auth',(req,res,next) => {
        const email = req.body.email;
        const password = req.body.password;
        auth.authenticate(email,password).then(user => {
            console.log(user);
            const token = jwt.sign(user.toJSON(),config.JWT_SECRET,{expiresIn : '10m'});
            const {iat,exp} = jwt.decode(token);

            res.send({iat,exp,token});
            next();
        }).catch(err => {
            res.send("Authentiation failed!!");
            console.log(err);
        })
    })
}