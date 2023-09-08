const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// All user's posts in dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User
        },
      ], 
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one post to edit
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      where: {
        id: req.params.id
      },
    });

    const post = postData.get({ plain: true });

    res.render('edit-post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get new post
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    logged_in: req.session.logged_in
  });
});

module.exports = router;