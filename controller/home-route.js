const router = require('express').Router();
const { Pet } = require('../models');

router.get('/pets', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.id, {
      include: [
        {
          model: Pet
        },
      ],
    });

    if (!userData) {
      console.log('No User');
      return res.status(404).json
    }
    const user = userData.get({ plain: true });

    res.render('pets', {
      ...user,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err)
  }
});