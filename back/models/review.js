const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            review_id: {
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
            item_star_score: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            cs_brand: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            category: {
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
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Review.belongsTo(db.User);
        db.Review.hasMany(db.ReviewHistory);
        db.Review.hasMany(db.ReviewImage);
    }
};