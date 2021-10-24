const Sequelize = require('sequelize');

module.exports = class ReviewImage extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            review_image_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            image_src: {
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
            modelName: 'ReviewImage',
            tableName: 'review_images',
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.ReviewImage.belongsTo(db.Review);
    }
};