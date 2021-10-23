const Sequelize = require('sequelize');

module.exports = class EventItem extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            event_item_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            item_name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            item_price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            item_actual_price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            item_image_src: {
                type: Sequelize.STRING(500)
            },
            item_category: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            cs_brand: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            item_event_type: {
                type: Sequelize.STRING(5),
                allowNull: false
            },
            status: {
                type: Sequelize.STRING(1),
                defaultValue: 'T'
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'EventItem',
            tableName: 'event_items',
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
        EventItem.removeAttribute('id');
    }
    static associate(db) {
        db.EventItem.hasMany(db.EventItemHistory);
    }
};