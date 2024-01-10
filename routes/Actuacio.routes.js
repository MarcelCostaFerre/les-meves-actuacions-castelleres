const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Actuacio = require("../models/Actuacio.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');

router.get('/', (req, res ) => {
    Actuacio.find()
    .populate({
        path:'author',
        select: 'nom userImage -_id'
    })
    .then((dbActuacions) => {
       res.render('actuacions/actuacions', { dbActuacions }) 
    })
    
});

router.get('/nova-actuacio', (req, res) => {
    User.find()
    .then((dbUsers) => {
        res.render('actuacions/nova-actuacio', { dbUsers })
    })
    .catch((err) => console.log(`Err while displaying actuació input page: ${err}`));
});

router.post('/nova-actuacio', fileUploader.single('actuacio-image'), (req, res, next) => {
    const { diada, address, date, castells, colles } = req.body;
    const actuacio = {
        diada: diada,
        address: address,
        date: date,
        castells: castells,
        colles: colles
      }
    const { _id } = req.session.currentUser

    if (req.hasOwnProperty('file') ) {
        actuacio.photo = req.file.path;
    }
    actuacio.author = _id
    Actuacio.create(actuacio)
    .then( novaActuacio => {
        return User.findByIdAndUpdate(_id, { $push: { actuacions: novaActuacio._id } })
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
        select: 'username -_id'
    })
    .populate({
        path: 'comments',
        select: 'content -_id',
        populate: {
          path: 'author',
          select: 'username -_id',
        }
    })
    .then( (actuacioFromDB) => {
       if(!req.session.currentUser){
            res.render('actuacions/detall-actuacio', { actuacioFromDB })
        
        }else{
            let canEdit = actuacioFromDB.author.username === req.session.currentUser.username
            res.render('actuacions/detall-actuacio', { actuacioFromDB, canEdit })
        }
    });
});

router.get('/user/:id', isLoggedIn, (req, res) => {
    const { id } = req.params;
  
    User.findById(id)
    .populate({
        path: 'actuacions',
    })
    .then((userFromDB) => {
        if(userFromDB.username === req.session.currentUser.username){
            res.render('actuacions/user-profile', {userFromDB});
            }else{res.redirect('/actuacions')}
    })
})

router.get('/:id/edit', isLoggedIn, (req, res) => {
    const { id } = req.params;

    Actuacio.findById(id)
    .populate({
        path:'author',
        select: 'username -_id'
    })
    .then((actuacioFromDB) => {
        if(actuacioFromDB.author.username === req.session.currentUser.username){
            res.render('actuacions/edit', {actuacioFromDB})
        }else{res.redirect(`/actuacions/${id}`)}
    })
    
});

router.post('/:id/edit', isLoggedIn, fileUploader.single('actuacio-image'), (req, res) => {
    const { id } = req.params;
    const { diada, address, date, castells, colles } = req.body;
    const updatedActuacio = {
        diada: diada,
        address: address,
        date: date,
        castells: castells,
        colles: colles
      }
    const { _id } = req.session.currentUser

    if (req.hasOwnProperty('file') ) {
        updatedActuacio.photo = req.file.path;
    }
    updatedActuacio.author = _id
  
    Actuacio.findByIdAndUpdate(id, updatedActuacio, { new: true })
        .then( (updatedActuacioFromDb) => {
            res.redirect(`/actuacions/${id}`)
        });
});

router.get('/:id/delete-image', (req, res) => {
  
    const { id } = req.params;
  
    Actuacio.findOneAndUpdate({ "_id": id }, { imageUrl: null } )
      .then( () => {
        res.redirect(`/actuacions/${id}/edit`);
      });
  
  });

router.post('/:id/delete', isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    Actuacio.findById(id)
    .populate({
        path:'author',
        select: 'username -_id'
    })
    .then((actuacioFromDB) => {
        if(actuacioFromDB.author.username === req.session.currentUser.username){
            Actuacio.findByIdAndDelete(id)
            .then( () => {
                res.redirect('/actuacions')
            }).catch(err => next(err)) 
        }else{res.redirect('/actuacions')}
    })
   
    
});

module.exports = router;
