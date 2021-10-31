const db = require('../database/models')

const getUrl = (req) => req.protocol + '://' + req.get('host') + '/api'

module.exports = {
    getAll : (req, res) => {
        db.Operation.findAll({
            include : [
                {
                    association : 'value'
                }
        ]
        })
        .then(operation => {
           let response = {
               meta : {
                   status : 200,
                   length : operation.length,
                   endpoint :  getUrl(req)
               },
               data : operation
           }
           res.status(200).json(response)
        })
    },
    getOne : (req, res) => {
        db.Operation.findOne({
            where : {
                id : req.params.id
            },
            attributes : ['id', 'concept','amount', 'date'],
            include : [
                {
                    association : 'value'
                }
        ]
        })
        .then(element => {
            if(element){
            let response = {
                meta : {
                    status : 200,
                    length : element.length,
                    endpoint : getUrl(req) + `/${req.params.id}`
                },
                data : {
                    element
                }
            }
            res.status(200).json(response)
            } else {
                res.status(400).json({
                    status: 400,
                    msg : 'ID not found'
                })
            }
        })
    },
    getValues : (req, res) => {
        db.Value.findAll()
        .then(operation => {
            let response = {
                meta : {
                    status : 200,
                    length : operation.length,
                    endpoint :  getUrl(req) + '/values'
                },
                data : operation
            }
            res.status(200).json(response)
         })
    },
    create : (req, res) => {
        const {concept, amount, date, valueid} = req.body

        db.Operation.create({
            concept,
            amount,
            date,
            valueid
        })
        .then(element => {
           if(element){
               let response = {
                   meta : {
                       status : 200,
                       msg : `${element.concept} was added successfully`,
                       endpoint : getUrl(req) + '/' + element.id
                   }
               }
               res.status(200).json(response)
           }
        })
        .catch(error => {
            console.log(error)
            switch (error.name) {
                case "SequelizeValidationError":
                    let erroresMsg = [];
                    let erroresNotNull = [];
                    let erroresValidation = [];
                    error.errors.forEach(error => {
                        erroresMsg.push(error.message)
                        if (error.type == "notNull Violation") {
                            erroresNotNull.push(error.message)
                        }
                        if (error.type == "Validation error") {
                            erroresValidation.push(error.message)
                        }
                    });
                    let response = {
                        status: 400,
                        messages: "missing data",
                        errores: {
                            length: erroresMsg.length,
                            msg: erroresMsg,
                            notNull: erroresNotNull,
                            validation: erroresValidation
                        }
                    }
                    return res.status(400).json(response)
                    default:
                        return res.status(500).json({error})
                }
        });
    },
    edit : (req, res) => {
        const {concept, amount, date} = req.body

        db.Operation.update({
            concept,
            amount,
            date
        }, 
        {
            where : {
                id : req.params.id
            }
        })
        .then(element => {
            if(element[0]){
                let response = {
                    status : 200,
                    msg : `The operation was edited`,
                    endpoint : getUrl(req) + '/' + element.id 
                }
                res.status(200).json(response)
            } else {
                res.status(400).json({
                    status : 400,
                    msg : 'The id could not be found'
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    remove : (req, res) => {
        db.Operation.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(response => {
            if(response){
                res.status(200).json({
                    status : 200,
                    msg : 'The operation was successfully removed'
                })
            } else {
                res.status(400).json({
                    status : 400,
                    msg : 'Operation not found'
                })
            }
        })
    }
}