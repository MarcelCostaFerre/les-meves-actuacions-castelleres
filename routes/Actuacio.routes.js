const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Actuacio = require("../models/Actuacio.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

router.get('/', (req, res ) => {
    Actuacio.find()
    .populate({
        path:'user',
        select: 'username -_id'
    })
    .then((dbActuacions) => {
        // res.send(dbActuacions)
       res.render('actuacions/actuacions', { dbActuacions }) 
    })
    
});

router.get('/nova-actuacio', isLoggedIn, (req, res) => {
    // User.find()
    // .then((dbUsers) => {
        
    // })
    res.render('actuacions/nova-actuacio')
});

router.post('/nova-actuacio', (req, res) => {
    const { diada, address, date, castells, colles, photo, user } = req.body;
    Actuacio.create({ diada, address, date, castells, colles, photo, user })
    .then( (novaActuacio) => {
        
        // res.json(novaActuacio)
        res.redirect('/actuacions')
        })
        .catch( res.render('actuacions/nova-actuacio') );
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Actuacio.findById(id)
    .populate({
        path:'user',
        select: 'username -_id'
    })
      .then( (actuacioFromDB) => {
        // res.json(actuacioFromDB);
        res.render('actuacions/detall-actuacio', { actuacioFromDB });
      });
});

router.get('/:id/edit', isLoggedIn, (req, res) => {
    const { id } = req.params;
    const { diada, address, date, castells, colles, photo, user } = req.body;
    Actuacio.findById(id)
    .populate({
        path:'user',
        select: 'username -_id'
    })
    .then((actuacioFromDB) => {
       res.render('actuacions/edit', {actuacioFromDB}) 
    })
    
});

router.post('/:id/edit', isLoggedIn, (req, res) => {
    const { id } = req.params;
    const { diada, address, date, castells, colles, photo, user } = req.body;
  
    Actuacio.findByIdAndUpdate(id, { diada, address, date, castells, colles, photo }, { new: true })
        .then( (updatedActuacioFromDB) => {
            // res.send(updatedActuacioFromDB)
            res.redirect('/actuacions/:id')
        });
});

router.post('/:id/delete', isLoggedIn, (req, res) => {
    const { id } = req.params;

    Actuacio.findByIdAndDelete(id)
      .then( () => {
        res.redirect('/actuacions')
        // res.send(`Actuacio ${id} has been deleted`);
      }).catch(err => next(err))
});

module.exports = router;
