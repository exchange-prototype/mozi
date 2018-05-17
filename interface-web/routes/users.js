

var express = require('express');

var router = express.Router();

router.get('/',function(req,res,next){
    res.send('users');
});
router.get('/about',function(req,res,next){
    res.render('about');
});
router.get('/buy',function(req,res,next){
    res.render('buy');
});
module.exports = router;