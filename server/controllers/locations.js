module.exports = {
  index(req, res, next) {
    res.render('index', { title: 'Home' });
  },
  review(req, res, next) {
    res.render('index', { title: 'Review location' });
  },
  createComment(req, res, next) {
    res.render('index', { title: 'Create comment' });
  },
};
