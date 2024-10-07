const bcrypt = require('bcryptjs');
const User = require('./models/User');

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //find the user in collection
            const user = await User.findOne({ email });

            //match the passwords
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    resolve(user);
                } else {
                    reject("Authentication failed!");
                }
            })

        }catch (err) {
            reject("Authentication failed !!");
        }

    })
}