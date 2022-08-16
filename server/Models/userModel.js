const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(str){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    picture: {
        type: Array,
        default: [],
    },
    description: {
        type: String,
        default: '',
    },
    recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
},{minimize: false})

userSchema.statics.findByCredentials = async function(userName, password){
    const user = await User.findOne({userName})
    if(!user) throw new Error('invalid credentials');
    const isSamePassword = bcrypt.compareSync(password, user.password);
    if(isSamePassword) return user;
    throw new Error('invalid credentials');
}

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}

//before saving

userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next()
        })
    })
})

userSchema.pre('remove', function(next){
    this.model('Recipe').remove({poster: this._id}, next)
})

const User = mongoose.model('User', userSchema)

module.exports = User