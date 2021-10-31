module.exports = (sequelize, dataTypes) => {

    const alias = 'Operation'

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        concept : {
            type : dataTypes.STRING(45),
            allowNull : false,
            validate : {
                notNull : {
                    msg : 'operation.concept can not be null'
                },
                notEmpty : {
                    msg : 'operation.concept can not be empty'
                }
            }
        },
        amount : {
            type : dataTypes.INTEGER,
            allowNull : false,
            validate : {
                notNull : {
                    msg : 'operation.amount can not be null'
                },
                notEmpty : {
                    msg : 'operation.amount can not be empty'
                }
            }
        },
        date : {
            type : dataTypes.DATEONLY,
            allowNull : false,
            validate : {
                isDate : {
                    args : true,
                    msg : 'operation.date must match yyyy/mm/dd format'
                },
                notNull : {
                    msg : 'operation.date can not be null'
                },
                notEmpty : {
                    msg : 'operation.date can not be empty'
                }
            }
        },
        valueid : {
            type : dataTypes.INTEGER,
            allowNull : false,
            validate : {
                isIn : {
                    args : [[1, 2]],
                    msg : 'operation.valueid has to be 1(ingreso) or 2(egreso)'
                },
                notNull : {
                    msg : 'operation.valueid can not be null'
                },
                notEmpty : {
                    msg : 'operation.valueid can not be empty'
                }
            }
        }
    }

    const config = {
        tableName : 'operations',
        timestamps : false
    }

    const Operation = sequelize.define(alias, cols, config)

    Operation.associate = function(models){
        Operation.belongsTo(models.Value, {
            as : 'value',
            foreignKey : 'valueid'
        })
    }

    return Operation
}