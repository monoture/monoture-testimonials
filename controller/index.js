var Testimonial = require('./model');
var router = require('express').Router();
var validateTestimonial = require('./validate-testimonial');
var validateTestimonialParam = require('./validate-testimonial-param');

router.get('/', function(req, res, next){
  Testimonial.find({}).then(function(testimonials) {
    res.json({
      meta : {},
      data : testimonials
    });
  }).catch(next);
});

router.get('/:testimonial', validateTestimonialParam, function(req, res, next){
  Testimonial.findOne({_id : req.params.testimonial}).then(function(testimonial){
    if (testimonial != null) {
      res.json({
        meta : {},
        data : testimonial
      });
    } else {
      next('Unable to find resource');
    }
  }).catch(next);
});

router.post('/', validateTestimonial, function(req, res, next){
  var testimonial = Testimonial.create({
    body  : req.body.body,
    name  : req.body.name,
    img   : req.body.img
  });

  testimonial.save().then(function(testimonial){
    res.json({
      meta : {},
      data : testimonial
    });
  }).catch(next);
});

router.put('/:testimonial', validateTestimonialParam, validateTestimonial, function(req, res, next){
  Testimonial.findOneAndUpdate({'_id' : req.params.testimonial}, {
    body  : req.body.body,
    name  : req.body.name,
    img   : req.body.img
  }).then(function(testimonial){
    if (testimonial != null) {
      res.json({
        meta : {},
        data : testimonial
      });
    } else {
      next('Unable to find resource');
    }
  }).catch(next);
});

router.delete('/:testimonial', validateTestimonialParam, function(req, res, next){
  Testimonial.findOneAndDelete({'_id' : req.params.testimonial}).then(function(rows){
    res.json({
      meta : {},
      data : {
        rows : rows
      }
    });
  }).catch(next);
});

module.exports = router;
