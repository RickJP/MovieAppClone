const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');

const {Favorite} = require('../models/Favorite');

router.post('/favoriteNo', (req, res) => {
  Favorite.find({movieId: req.body.movieId}).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({success: true, subscriberNo: subscribe.length});
  });
});

router.post('/madeFavorite', (req, res) => {
  // find favorite info inside collection by movieId, userFrom
  Favorite.find({movieId: req.body.movieId, userFrom: req.body.userFrom}).exec(
    (err, subscribe) => {

      if (err) return res.status(400).send(err);

      console.log('SUBSCRIBE.LENGTH   '+ subscribe.length)
      let result = false;
      if (subscribe.length != 0) {
        result = true;
      }
      res.json({success: true, subscribed: result});
    }
  );
});

router.post('/addToFavorite', (req, res) => {
  // save the information about the user and userId inside favorites collection

  console.log('ADD TO FAV');
  const favorite = new Favorite(req.body);

  favorite.save((err, data) => {
    if (err) return res.json({success: false, err});

    return res.json({success: true});
  });
});

router.post('/removeFromFavorite', (req, res) => {
  // save the information about the user and userId inside favorites collection

  Favorite
    .findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err, data) => {
      if (err) return res.status(400).json({success: false, err});

      return res.json({success: true, data});
    });
});

module.exports = router;
