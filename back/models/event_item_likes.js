const Sequelize = require('sequelize');

module.exports = class EventItemLike extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            event_item_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
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
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
        // EventItemLike.removeAttribute('id');
    }
    static associate(db) {
        db.EventItemLike.belongsTo(db.User);
    }
};