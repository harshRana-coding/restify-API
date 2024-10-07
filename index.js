const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

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
  console.log(`Server started on port ${config.PORT}`);
});

