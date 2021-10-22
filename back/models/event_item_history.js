const Sequelize = require('sequelize');

module.exports = class EventItemHistory extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
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
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.EventItemHistory.belongsTo(db.EventItem);
        db.EventItemHistory.belongsTo(db.User);
    }
};