const { Post } = require('../models');

const postData = [{
        title: 'NASAs Ingenuity Mars Helicopter',
        content:'became the first aircraft in history to make a powered, controlled flight on another planet.',
        user_id: 1
},
{
        title: 'Tesla is making a humanoid named optimus',
        content:'Elon is going to test the bots in his factories, doing various diffrent tasks.',  
        user_id: 2
},
{
        title: 'The new iPhone 14',
        content:'I heard the new camera is amazing.',
        user_id: 3
},
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;