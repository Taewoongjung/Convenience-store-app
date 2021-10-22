const Sequelize = require('sequelize');

//https://www.youtube.com/watch?v=zug4VBcZOrI

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_id: {
                type: Sequelize.INTEGER,
                allowNULL: false,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: Sequelize.STRING(20),
                allowNULL: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(1000),
                allowNULL: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'User',
            tableName: 'users1',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};