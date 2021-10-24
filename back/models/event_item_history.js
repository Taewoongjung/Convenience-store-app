const Sequelize = require('sequelize');

module.exports = class EventItemHistory extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            event_item_history_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            item_name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            status: {
                type: Sequelize.STRING(1),
                defaultValue: 'T'
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: 'EventItemHistory',
            tableName: 'event_item_histories',
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.EventItemHistory.belongsTo(db.EventItem);
        db.EventItemHistory.belongsTo(db.User);
    }
};