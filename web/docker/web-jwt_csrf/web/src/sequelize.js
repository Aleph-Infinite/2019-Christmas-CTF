const Sequelize = require('sequelize');

const CONF = require('./config.js');

const S = new Sequelize(CONF.db.database, CONF.db.user, CONF.db.password, {
  host: CONF.db.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,
  timezone: '+09:00',
});

S.UserBruth = S.define('userBruth', {
  id: { type: Sequelize.INTEGER(10).UNSIGNED, primaryKey: true, autoIncrement: true },
  username: { type: Sequelize.TEXT, allowNull: false },
  password: { type: Sequelize.TEXT, allowNull: false },
});

S.UserCsrf = S.define('userCsrf', {
  id: { type: Sequelize.INTEGER(10).UNSIGNED, primaryKey: true, autoIncrement: true },
  username: { type: Sequelize.TEXT, allowNull: false },
  password: { type: Sequelize.TEXT, allowNull: false },
});

S.BoardBruth = S.define('boardBruth', {
  id: { type: Sequelize.INTEGER(10).UNSIGNED, primaryKey: true, autoIncrement: true },
  uid: { type: Sequelize.INTEGER(10).UNSIGNED, allowNull: false },
  title: { type: Sequelize.TEXT, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
});

S.BoardCsrf = S.define('boardCsrf', {
  id: { type: Sequelize.INTEGER(10).UNSIGNED, primaryKey: true, autoIncrement: true },
  uid: { type: Sequelize.INTEGER(10).UNSIGNED, allowNull: false },
  title: { type: Sequelize.TEXT, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
});

S.sync()

module.exports = S;
