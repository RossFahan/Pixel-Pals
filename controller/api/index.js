const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const interactRoutes = require('./interactRoutes')

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/',interactRoutes)


module.exports = router;