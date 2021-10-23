const Sequelize = require('sequelize');

module.exports = class ReviewHistory extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            review_history_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            status: {
                type: Sequelize.STRING(1),
                defaultValue: 'T'
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: 'ReviewHistory',
            tableName: 'review_histories',
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
        // ReviewHistory.removeAttribute('id');
    }
    static associate(db) {
        db.ReviewHistory.belongsTo(db.User);
        db.ReviewHistory.belongsTo(db.Review);
    }
};