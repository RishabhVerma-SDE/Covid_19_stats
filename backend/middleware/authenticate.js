
require('dotenv').config();
const jwt  = require('jsonwebtoken');
const User = require("../model/Users");


const authenticate = async (req,res,next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        const user = await User.findOne({_id: decoded._id, username: decoded?.username});

        if (!user){
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch(error){
        console.log(error)
        res.status(401).send({
            error: 'Not Authenticated'
        })
    }
}

module.exports = authenticate;