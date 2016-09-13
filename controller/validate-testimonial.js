module.exports = function(req, res, next) {
  // Sanitize Input
  req.sanitizeBody('name').escape();

  // Validate Input
  req.checkBody('body', 'Invalid content').notEmpty();
  req.checkBody('name', 'Invalid name').notEmpty();

  next(req.validationErrors(true));
}
