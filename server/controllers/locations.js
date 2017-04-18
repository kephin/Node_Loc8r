module.exports = {
  index(req, res, next) {
    res.render('index', { title: 'Home' });
  },
  review(req, res, next) {
    res.render('location-info', { title: 'Review location' });
  },
  createComment(req, res, next) {
    res.render('location-review-form', { title: 'Create comment' });
  },
};
