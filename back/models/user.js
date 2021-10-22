const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(50),
                allowNULL: false,
            },
            nickname: {
                type:Sequelize.STRING(20),
                allowNULL: false,
            },
            password: {
                type: Sequelize.STRING(50),
                allowNULL: false,
            },
            provider: {
                type: Sequelize.STRING(10)
            },
            status: {
                type: Sequelize.BOOLEAN
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
};