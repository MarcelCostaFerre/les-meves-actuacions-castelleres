const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Actuacio = require("../models/Actuacio.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

router.get('/', (req, res ) => {
    Actuacio.find()
    // .populate({
    //     path:'author',
    //     select: 'username -_id'
    // })
    .then((dbActuacions) => {
        // console.log(dbActuacions)
        // res.send(dbActuacions)
       res.render('actuacions/actuacions', { dbActuacions }) 
    })
    
});

router.get('/nova-actuacio', isLoggedIn, (req, res) => {
    User.find()
    .then((dbUsers) => {
        res.render('actuacions/nova-actuacio', { dbUsers })
    })
    .catch((err) => console.log(`Err while displaying actuació input page: ${err}`));
});

router.post('/nova-actuacio', (req, res, next) => {
    const { diada, address, date, castells, colles, photo, author } = req.body;
    Actuacio.create({ diada, address, date, castells, colles, photo, author })
    .then( novaActuacio => {
        return User.findByIdAndUpdate(author, { $push: { actuacions: novaActuacio._id } })
      })
    .then( () => {
        res.redirect('/actuacions')
        })
        .catch( err => {
            console.log(`Err while creating the actuació in the DB: ${err}`);
            next(err);
          });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Actuacio.findById(id)
    .populate({
        path:'author',
        select: 'nom -_id'
    })
    .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username -_id',
        }
      })
      .then( (actuacioFromDB) => {
        User.find()
            .then((usersFromDb) => {
                // res.json(actuacioFromDB);
                res.render('actuacions/detall-actuacio', { actuacioFromDB, usersFromDb }); 
            })
      });
});

router.get('/:id/edit', isLoggedIn, (req, res) => {
    const { id } = req.params;
    // const { diada, address, date, castells, colles, photo, author } = req.body;
    Actuacio.findById(id)
    .populate({
        path:'author',
        select: 'nom -_id'
    })
    // .populate({
    //     path: 'comments',
    //     populate: {
    //       path: 'author',
    //       select: 'username -_id',
    //     }
    //   })
    .then((actuacioFromDB) => {
       res.render('actuacions/edit', {actuacioFromDB}) 
    })
    
});

router.post('/:id/edit', isLoggedIn, (req, res) => {
    const { id } = req.params;
    const { diada, address, date, castells, colles, photo, author } = req.body;
  
    Actuacio.findByIdAndUpdate(id, { diada, address, date, castells, colles, photo, author }, { new: true })
        .then( (updatedActuacioFromDB) => {
            // res.send(updatedActuacioFromDB)
            res.redirect(`/actuacions/${id}`)
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

router.post('/:id/assistir', (req, res) => {
    const { id } = req.params;

});

module.exports = router;
