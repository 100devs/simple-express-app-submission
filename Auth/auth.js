const User = require('../model/User');
const bcrypt = require('bcryptjs');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.token; //token from env, generated with node, then require('crypto').randomBytes(number of chars).toString('hex')

exports.register = async (req, res, next) => {
    const {
        username,
        password,
        email
    } = req.body;

    if (password.length < 6) {
        return res.status(400).json({
            message: "password less than 6 characters"
        });
    }

    bcrypt.hash(password, 10).then(async (hash) => {
            await User.create({
                username,
                password: hash,
                email
            })

        .then(user => {
            const maxTokenAge = 3 * 60 * 60;
            const token = jwt.sign({
                    id: user._id,
                    username,
                    role: user.role
                },
                jwtSecret, {
                    expiresIn: maxTokenAge
                }
            )
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxTokenAge * 1000,
            });
            res.status(201).json({
                message: "user successfully created",
                user: user._id,
                role: user.role
            })
        })
        .catch((err) => {
            res.status(401).json({
                message: "User creation not successful",
                error: err.message
            });
        });
    })
}

exports.login = async (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: "Username or password is empty"
        });
    }
    try {
        const user = await User.findOne({
            username
        })
        if (!user) {
            res.status(401).json({
                message: "Login unsuccessful",
                error: "user not found"
            });
        } else {
            bcrypt.compare(password, user.password)
                .then((result) => {
                    if(result){
                        const maxTokenAge = 3 * 60 * 60;
                        const token = jwt.sign({
                                id: user._id,
                                username,
                                role: user.role
                            },
                            jwtSecret, {
                                expiresIn: maxTokenAge
                            }
                        )
                        res.cookie('jwt', token, {
                            httpOnly: true,
                            maxAge: maxTokenAge * 1000,
                        });
                        res.status(201).json({
                            message: "user successfully logged in",
                            user: user._id,
                            role: user.role,
                        });
                    }
                    else {
                        res.status(400).json({message: "login failed"})
                    }
                })

        }
    } catch(error) {
        res.status(400).json({
            message: "Error happened...",
            error: error.message
        });
    }


}

exports.getUsers = async (req, res, next) => {
    //this will return all users in the DB
    await User.find({})
    .then(users => {
        const userFunction = users.map( user => {
            const container = {}
            container.username = user.username
            container.role = user.role
            container.id = user._id
            return container
        });
        res.status(200).json({user: userFunction})
    })
    .catch(err => {
        res.status(401).json({message: "not successful", error: err.message})
    });
}