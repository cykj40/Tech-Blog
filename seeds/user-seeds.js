const { User } = require('../models');

const userData = [{
        username: 'Homer123',
        password:'password12345'
},
{
        username: 'Marge123',
        password:'password54321'
},
{
        username: 'Bart123',
        password:'password109876'
},
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;