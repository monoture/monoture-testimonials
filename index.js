module.exports = function(monoture) {
  monoture.registerApiRoutes('testimonials', require('./controller'));
  monoture.registerPropertyAlias('testimonial', {
    get : function() {
      return require('./controller/model')
    }
  });
  monoture.registerStaticDirectory('/dashboard', __dirname + '/public');
  monoture.registerAngularPlugin('testimonial');
}
