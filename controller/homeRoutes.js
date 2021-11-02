const router = require('express').Router();
const { blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//blogs
router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await blog.findAll({
      include: [
        {
          model: User,
          attributes: ['email','name'],
        },
        {
          model: Comment,
          attributes: ['comment','date_created','user_id','blog_id']
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment', 'date_created', 'user_id', 'blog_id']
        },
      ],
    });

    const blogs = blogData.get({ plain: true });

    res.render('blog', {
    blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/blog/:id/comment', async (req, res) => {
  try {
    const blogData = await blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment', 'date_created', 'user_id', 'blog_id']
        },
      ],
    });
    const blogs = blogData.get({ plain: true });
    console.log(blogs)
    
    res.render('comment', {
      blog: blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//Comments
router.get('/comment', async (req, res) => {
  try {
    // Get all comments and JOIN with user data
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['email', 'name'],
        },
      
      ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
    comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/comment/:id', async (req, res) => {
  try {
    const commentData = await comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
       ],
    });

    const comments = commentData.get({ plain: true });

    res.render('comment', {
    comments,
      logged_in: req.session.logged_in
      
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//profile
// Use withAuth middleware to prevent access to route
router.get('/profile',  async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: blog }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
