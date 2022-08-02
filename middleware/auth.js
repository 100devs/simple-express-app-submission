const jwt = require('jsonwebtoken')
const jwtSecret = '9aa3d81883b53257db288f0138b4dd3a204f5184c81aadf0404142075c90945a560a07'
exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err){
                return res.status(401).json({message: "Not authorized"})
            } else{
                if(decodedToken.role !== 'admin'){
                    return res.status(401).json({message: "Not authorized"})
                } else{
                    next()
                }
            }
        })
    } else{
        return res
            .status(401)
            .json({message: 'Not authoriozed, token not available'})
    }
}
exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err){
                return res.status(401).json({message: "Not authorized"})
            } else{
                if(decodedToken.role !== 'Basic'){
                    return res.status(401).json({message: "Not authorized"})
                } else{
                    next()
                }
            }
        })
    } else{
        return res
            .status(401)
            .json({message: 'Not authoriozed, token not available'})
    }
}