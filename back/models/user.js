const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: Sequelize.STRING(50),
                allowNULL: false,
            },
            nickname: {
                type:Sequelize.STRING(20),
                allowNULL: false,
            },
            password: {
                type: Sequelize.STRING(1000),
                allowNULL: false,
            },
            provider: {
                type: Sequelize.STRING(10),
                defaultValue: 'local'
            },
            status: {
                type: Sequelize.STRING(1),
                defaultValue: 'T'
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'User',
            tableName: 'users',
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
        User.removeAttribute('id');
    }
    static associate(db) {
        db.User.hasMany(db.EventItemHistory);
        db.User.hasMany(db.EventItemLike);
        db.User.hasMany(db.Review);
    }
};