const router = require('express').Router();
const { User, Pet, Animal } = require('../models');
const withAuth = require('../utils/auth');
const updateStatusBars = require('../public/js/statusbar');
const decrementStats = require('../utils/stats');

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
    // console.log(req.session.user_id)
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Pet,
          include: [
            {
              model: Animal,
              // attributes: ['types']
            }
          ],
        }, 
        // {
        //   model: Animal
        // },
      ],
    });
    // console.log(userData)
    if (!userData) {
      console.log('No User');
      return res.status(404).json
    }
    const user = userData.get({ plain: true });
    console.log(user);

    if (user.pets.length == 0) {
      res.redirect('/adopt');
      return;
    }

        // // Call the decrementStats function for each pet in the user's pets array
        // const updatedPets = user.pets.map(pet => decrementStats(pet));

    res.render('userpets', {
      ...user,
     // pets: updatedPets,  // pets with updated stats
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

        // Update pet stats and update display of status bars
        // decrementStats(pet);
        // updateStatusBars(pet);

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
    const animalData = await Animal.findAll()

    const animals = animalData.map(animal => animal.get({ plain: true }));
    res.render('adoption', {
      animals,
      logged_in: req.session.logged_in,
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