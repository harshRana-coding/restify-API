const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
//const rjwt = require('restify-jwt-community');

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

//server.use(rjwt({secret : config.JWT_SECRET}).unless({path : ['/auth']}));

server.listen(config.PORT, () => {
    console.log("Server started");
    mongoose.connect(config.MONGODB_URI).then(()=> {
        console.log("Database connected!");
    }).catch(err => console.log(err.message));
});

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
  require('./routes/customers')(server);
  require('./routes/user')(server);
  console.log(`Server started on port ${config.PORT}`);
});

