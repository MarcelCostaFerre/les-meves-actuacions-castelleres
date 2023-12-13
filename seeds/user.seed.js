

// To insert in "seeds/movies.seed.js"

const users = [
    {
      username: "Minyons",
      email: "minyons@minyons.cat",
      password: 'minyons',
    }
  ];
  
  // Add here the script that will be run to actually seed the database (feel free to refer to the previous lesson)
  
  // ... your code here

const mongoose = require('mongoose');
const Actuacio = require('../models/User.model');
const User = require('../models/User.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/les-meves-actuacions-castelleres';

  mongoose
  .connect(MONGO_URI)
  .then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
  })
  .then(() => {
    return User.deleteMany();
  })
  .then(()=> {
    // Create new documents in the movies collection
    return User.create(users);
  })
  .then(usersFromDB => {
    console.log(`Created ${usersFromDB.length} user`);

    // Once the documents are created, close the DB connection
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log('DB connection closed!');
  })
  .catch(err => {
    console.log(`An error occurred while creating actuacions from the DB: ${err}`);
  });