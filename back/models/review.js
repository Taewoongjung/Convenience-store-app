const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            item_name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            item_price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            item_star_score: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            cs_brand: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            status: {
                type: Sequelize.STRING(1),
                defaultValue: 'T'
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Review',
            tableName: 'reviews',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.Review.belongsTo(db.User);
    }
};