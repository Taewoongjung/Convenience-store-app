const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const EventItem = require('./event_item');
const EventItemHistory = require('./event_item_history');
// const Domain = require('./domain');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.EventItem = EventItem;
db.EventItemHistory = EventItemHistory;
// db.Domain = Domain;

User.init(sequelize);
EventItem.init(sequelize);
EventItemHistory.init(sequelize);
// Domain.init(sequelize);

User.associate(db);
EventItem.associate(db);
EventItemHistory.associate(db);
// Domain.associate(db);

module.exports = db;
