module.exports = function(req, res, next) {
  // Sanitize param
  req.sanitizeParams('testimonial').escape();

  // Validate params
  req.checkParams('testimonial').isAlphanumeric();

  next(req.validationErrors(true));
}
