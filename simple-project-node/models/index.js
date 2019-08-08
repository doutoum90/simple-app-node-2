'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};



let sequelize;

manageConnection();
async function manageConnection() {
  let retries = 5;
  while (retries > 0) {

    try {
      await createConnection();
      break;
    } catch (err) {
      console.log(err)
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}

function createConnection() {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {

    /*  sequelize = new Sequelize(config.database, config.username, config.password, {
       host: 'db',
       dialect: 'postgres',
       pool: {
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000
       }
       // process.env.POSTGRES_DIALECT
   
     }); */

    // sequelize = new Sequelize(`postgres://doutoum:doutoum@127.0.0.1/${config.database}`);
    sequelize = new Sequelize(process.env.DATABASE_URL);
    // sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
}
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
