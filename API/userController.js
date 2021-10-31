require('dotenv').config();
const db = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    processRegister : (req, res) => {
        const {email, password} = req.body

        db.User.create({
            email,
            password : bcrypt.hashSync(password, 10)
        })
        .then(user => {
            const token = jwt.sign(
                {
                    id : user.id
                },
                process.env.SECRET_TOKEN,
                {
                    expiresIn : 60 * 10
                }
            )

            return res.status(200).json({
                auth : true,
                msg : 'The user has successfully registered',
                token
            })
        })
        .catch(error => res.status(500).json(error))
    },
    processLogin : (req, res) => {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(401).json({
                auth : false,
                msg : 'missing data'
            })
        }

        db.User.findOne({
            where : {
                email
            }
        })
        .then(user => {
            if(!user || !bcrypt.compareSync(password, user.password)){
                return res.status(400).json({
                    status : 400,
                    msg : 'Something went wrong. Check the username and password'
                })
            }

            const token = jwt.sign(
                {
                    id : user.id
                },
                process.env.SECRET_TOKEN,
                {
                    expiresIn : 60 * 10
                }
            )

            return res.status(200).json({
                auth : true,
                msg : 'the user has been logged in',
                token
            })
        })
        .catch(error => status(500).json(error))
    },
    getAllUsers : (req, res) => {

        db.User.findAll()
        .then(user => {
            if(user){
                return res.status(200).json({
                    msg : 'All users in our sistem',
                    user,
                })
            } else {
                return res.status(400).json({
                    msg : 'No user in our sistem',
                    token
                })
            }

        })
    }
}