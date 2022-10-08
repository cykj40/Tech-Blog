const { Comment } = require('../models');

const commentData = [{
        comment_text: 'thats amazing!',
        user_id: 1,
        post_id: 1
},
{
        comment_text: 'I cant wait to see it!',
        user_id: 2,
        post_id: 2
},
{
        comment_text: 'I hope it has a good battery life.',
        user_id: 3,
        post_id: 3
},
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;