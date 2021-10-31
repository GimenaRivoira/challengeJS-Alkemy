module.exports = (sequelize, dataTypes) => {
    const alias = 'User'

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        email : {
            type : dataTypes.STRING(45),
            allowNull : false,
            unique : true,
            validate : {
                notNull : {
                    msg : 'user.email can not be null'
                },
                notEmpty : {
                    msg : 'user.email can not be empty'
                },
                isEmail : {
                    msh : 'user.email has to be a valid email'
                }
            }
        },
        password : {
            type : dataTypes.STRING(70),
            allowNull : false,
            validate : {
                notNull : {
                    msg : 'user.password can not be null'
                },
                notEmpty : {
                    msg : 'user.password can not be empty'
                }
            }
        }
    }

    const config = {
        tableName : 'users',
        timestamps : false
    }

    const User = sequelize.define(alias, cols, config)

    return User
}