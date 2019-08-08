'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
    title: DataTypes.STRING
  }, {});
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};