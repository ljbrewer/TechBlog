const sequelize = require('../config/connection');
const { User, blog} = require('../models');

const Comment = require('../models/comment.js')

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log(users)


  const blogs = await blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  console.log(blogs)


  const comments= await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  console.log(comments)
  
  process.exit(0);
};

seedDatabase();
