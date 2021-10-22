const Sequelize = require('sequelize');

module.exports = class EventItemLike extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            is_like: {
                type: Sequelize.STRING(1),
                allowNull: false
            },
            status: {
                type: Sequelize.STRING(1),
                defaultValue: 'T'
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: 'EventItemLike',
            tableName: 'event_item_likes',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.EventItemLike.belongsTo(db.User);
    }
};