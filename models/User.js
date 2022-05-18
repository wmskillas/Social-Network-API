const {model, Schema, default: mongoose} = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            require: true,
            unique: true,
            validate:
                [validateEmail, 'Please fill a valid email address'],
        },

        thoughts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],

        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: true,
    }
);


const User = model('user', userSchema);

module.exports = User;