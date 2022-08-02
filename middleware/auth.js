require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.token; 


exports.userAuth = (req, res, next) => {
    //setting a token variable and setting it to the token from the cookie
    const token = req.cookies.jwt
    //if the token exists, then verify
    if(token){
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) res.status(401).json({message: "3not authorized"})
            else{
                req.user = decodedToken.username
                    next()
                }
            })
        }
    }