const router = require('express').Router();
const { User, Pet, Animal } = require('../models');
const withAuth = require('../utils/auth');

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
router.get('/pets', withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id)
    const userData = await User.findByPk(req.session.user_id, {
      /* attributes: { exclude: ['password'] }, */
      include: [
        {
          model: Pet
        }, /* {
          model: Animal
        }, */
      ],
    });
    console.log(userData)
    if (!userData) {
      console.log('No User');
      return res.status(404).json
    }
    const user = userData.get({ plain: true });

    if (!user.pet) {
      res.redirect('/adopt');
      return;
    }

    res.render('userpets', {
      ...user,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err)
  }
});

//Specific Pet
router.get('/pets/:id', withAuth, async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id, {
      include: [
        {
          model: Animal
        }
      ]
    })

    const pet = petData.get({ plain: true });

    res.render('pet', {
      ...pet,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

//Adopt pet
router.get('/adopt', withAuth, async (req, res) => {
  try {
    const animalData = Animal.findAll()

    const animals = animalData.get({ plain: true });
    res.render('adoption', {
      ...animals,
      logged_in: req.resssion.logged_in,
    })
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