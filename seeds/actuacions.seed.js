

// To insert in "seeds/movies.seed.js"

const actuacions = [
    {
      diada: "Pati del Mnactec",
      address: "Rambla d'Egara, 270, Terrassa",
      date: '2023-03-04T23:00:00.000+00:00',
      castells: "3de7p, 4de7, 5de7, Pde5",
      colles: "",
      photo: '../public/images/castell-tipus.jpg',
      user: '6578ebd3cdf4e0f92d36e950'
    },
    {
      diada: "Festes de la Magdalena",
      address: "Castello de la plana",
      date: '2023-03-17T23:00:00.000+00:00',
      castells: "3de7, 4de7p, 5de7, Pde5",
      colles: "Conlloga Muixeranga de Castello",
      photo: '../public/images/castell-tipus.jpg',
      user: '6578ebd3cdf4e0f92d36e950'
    },
    {
      diada: "Diada de Sant Pere Nord",
      address: "Plaça del primer de maig",
      date: '2023-03-25T23:00:00.000+00:00',
      castells: "3de8, 4de8, 5de7, Pde5",
      colles: "Castellers d'Esparraguera",
      photo: '../public/images/castell-tipus.jpg',
      user: '6578ebd3cdf4e0f92d36e950'
    },
    {
      diada: "Culturassa",
      address: "Plaça Lluis Companys, Terrassa",
      date: '2023-04-14T22:00:00.000+00:00',
      castells: "4de8, 3de8, 5de7, Pde5",
      colles: "Castellers de Terrassa",
      photo: '../public/images/castell-tipus.jpg',
      user: '6578ebd3cdf4e0f92d36e950'
    },
    {
      diada: "Can Jorba",
      address: "Portal de l'Angel, Barcelona",
      date: '2023-04-15T22:00:00.000+00:00',
      castells: "3de8, 4de8, 5de7, Pde6",
      colles: "Castellers de Barcelona, Nens del Vendrell",
      photo: '../public/images/castell-tipus.jpg',
      user: '6578ebd3cdf4e0f92d36e950'
    },
    {
      diada: "Sant Jordi",
      address: "Plaça Vella, Terrassa",
      date: '2023-04-22T22:00:00.000+00:00',
      castells: "5de8, 3de9f, 4de8 (c), Pde5",
      colles: "Castellers de Terrassa",
      photo: '../public/images/castell-tipus.jpg',
      user: '6578ebd3cdf4e0f92d36e950'
    },
  ];
  
  // Add here the script that will be run to actually seed the database (feel free to refer to the previous lesson)
  
  // ... your code here

const mongoose = require('mongoose');
const Actuacio = require('../models/Actuacio.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/les-meves-actuacions-castelleres';

  mongoose
  .connect(MONGO_URI)
  .then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
  })
  .then(() => {
    return Actuacio.deleteMany();
  })
  .then(()=> {
    // Create new documents in the movies collection
    return Actuacio.create(actuacions);
  })
  .then(actuacionsFromDB => {
    console.log(`Created ${actuacionsFromDB.length} actuacions`);

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