module.exports = (sequelize, dataTypes) => {

    const alias = 'Value'

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        type : {
            type : dataTypes.STRING(45),
            allowNull : false
        }
    }

    const config = {
        tableName : 'values',
        timestamps : false
    }

    const Value = sequelize.define(alias, cols, config)

    Value.associate = function(models){
        Value.hasMany(models.Operation, {
            as : 'operation',
            foreignKey : 'valueid'
        })
    }
    
    return Value
}