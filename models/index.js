const User = require('./User');
const Animal = require('./Animal');
const Pet = require('./Pet');
const Interaction = require('./Interaction');

Pet.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
User.hasMany(Pet, {
    foreignKey: 'user_id'
})
Pet.belongsTo(Animal, {
    foreignKey: 'animal_id',
    onDelete: 'CASCADE'
});
Animal.hasMany(Pet, {
    foreignKey: 'animal_id'
})
Pet.belongsTo(Interaction, {
    foreignKey: 'interaction_id',
    onDelete: 'CASCADE'
});
Interaction.hasOne(Pet, {
    foreignKey: 'interaction_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Animal, Pet, Interaction };