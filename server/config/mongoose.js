const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let MONGODB_URI = 'mongodb://localhost:27017/Loc8r';
if (process.env.NODE_ENV === 'production') MONGODB_URI = process.env.MONGOLAB_URI;

mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${MONGODB_URI}`);
});
mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected.');
});