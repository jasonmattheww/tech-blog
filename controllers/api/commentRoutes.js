const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all comments
router.get('/', async (req, res) =>{
  try {
    const allComents = await Comment.findAll({});

    res.status(200).json(allComents);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all comments from one post
router.get('/:id', withAuth, async (req, res) => {
  try {
    const getComment = await Comment.findAll(
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!getComment[0]) {
      res
        .status(400)
        .json({ message: 'No comment found with this id'});
        return;
    }

    res.status(200).json(getComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteComment) {
      res.status(404).json({ message: 'No comment found with this id'});
      return;
    }

    res.status(200).json(deleteComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;