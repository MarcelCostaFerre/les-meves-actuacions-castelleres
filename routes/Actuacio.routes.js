const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Actuacio = require("../models/Actuacio.model");
// const isLoggedOut = require("../middleware/isLoggedOut");
// const isLoggedIn = require("../middleware/isLoggedIn");

router.get('/', (req, res ) => {
    Actuacio.find()
    .then((dbActuacions) => {
        res.send(dbActuacions)
    //    res.render('actuacions/actuacions', { dbActuacions }) 
    })
    
});

router.get('/create', (req, res) => {
    // res.render('actuacions/nova-actuacio')
})

router.post('/nova-actuacio', (req, res) => {
    const { diada, address, date, castells, colles, photo, user } = req.body;
    Actuacio.create({ diada, address, date, castells, colles, photo, user })
    .then( (novaActuacio) => {
        res.send(novaActuacio)
        // res.redirect('/actuacions')
        }).catch( err => {
            res.json(err)
        });
        // .catch( res.render('actuacions/nova-actuacio') );
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Actuacio.findById(id)
      .then( (actuacioFromDB) => {
        res.json(actuacioFromDB);
      });
})

router.get('/:id/edit', (req, res) => {
    // res.render('actuacions/edit')
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params;
    const { diada, address, date, castells, colles, photo, user } = req.body;
  
    Actuacio.findByIdAndUpdate(id, { diada, address, date, castells, colles, photo, user }, { new: true })
      .then( (updatedActuacioFromDB) => {
        res.send(updatedActuacioFromDB)
      });
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params;

    Actuacio.findByIdAndDelete(id)
      .then( () => {
        res.send(`Actuacio ${id} has been deleted`);
      })
})

module.exports = router;
