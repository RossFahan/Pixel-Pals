const router = require('express').Router();
const { User, Pet } = require('../models');

//Homeroute
router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/pets')
    return;
  } else {
    res.redirect('/login');
    return;
  }
});

//User pets
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

//Specific Pet
router.get('/pets/:id', async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id)

    const pet = petData.get({ plain: true });
    res.render('placeholder-for-specific-pet', {
      ...pet,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

//login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/pets')
    return;
  }
  res.render('login');

});


module.exports = router;