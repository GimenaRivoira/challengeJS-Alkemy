const db = require('../database/models');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['token']

    if(!token){
        return res.status(401).json({
            auth : false,
            msg : 'Invalid token'
        })
    } try {
        const jwtDecoded = jwt.verify(token, process.env.SECRET_TOKEN)
        db.User.findByPk(jwtDecoded.id)
        .then(user => {
            if(!user){
                return res.status(401).json({msg : 'This user does not exist'})
            } else {
                next()
            }
        })
    } catch (error) {
        return res.status(401).json({
            msg : 'Invalid token'
        })
    }
}