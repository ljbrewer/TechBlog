const User = require('./User');
const blog = require('./Blog');
const Comment = require('./comment');

User.hasMany(blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

blog.belongsTo(User, {
  foreignKey: 'user_id'
});

blog.hasMany(Comment,{
  foreignKey:'blog_id',
  onDelete: 'Cascade'
})

Comment.belongsTo(blog,{
  foreignKey: 'blog_id'
})

module.exports = { User, blog, Comment };
