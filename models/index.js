const User = require('./User');
const blog = require('./blog');
const Comment = require('./comment');

User.hasMany(blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

blog.belongsTo(User, {
  foreignKey: 'user_id'
});

blog.hasMany(Comment,{
  foreignKey:'comment_id',
  onDelete: 'Cascade'
})

Comment.belongsTo(User,{
  foreignKey: 'user_id'
})

module.exports = { User, blog };
