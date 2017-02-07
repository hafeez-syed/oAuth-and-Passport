var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next) {
    if(!req.user) {
        res.redirect('/');
    }
    next();
});

/* GET users listing. */
router.get('/', function(req, res) {
    var name = "Hafeez Syed",
        image = "",
        google = {}, twitter = {}, facebook = {};

    if(req.user) {
        name = req.user.displayName;
        image = req.user.image;
        google = req.user.google;
        twitter = req.user.twitter;
        facebook = req.user.facebook;
    }

  res.render('users', {
      user: {
          name: name,
          image: image,
          google: google,
          twitter: twitter,
          facebook: facebook
      }
  });
});

module.exports = router;
