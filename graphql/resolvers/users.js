const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const {
    validateRegisterInput,
    validateLoginInput,
} = require('../../utils/validators');

const User = require('../../models/User');
const { SECRET_KEY } = require('../../config.js');

function generateToken(user) {
    return jwt.sign({
            id: user.id,
            email: user.email,
            username: user.username,
        },
        SECRET_KEY, { expiresIn: '24h' }
    );
}

module.exports = {
    Mutation: {
        async register(
            _, { registerInput: { username, email, password, confirmPassword } }
        ) {
            const { errors, valid } = validateRegisterInput(
                username,
                email,
                password,
                confirmPassword
            );

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ username });

            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken',
                    },
                });
            }
            password = await bcrypt.hash(password, 12);
            const newUser = User({
                email,
                username,
                password,
                createdAt: new Date().toISOString(),
            });
            const res = await newUser.save();
            const token = generateToken(res);
            return {
                ...res._doc,
                id: res._id,
                token,
            };
        },

        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ username });
            if (!user) {
                throw new UserInputError('Username not found', {
                    errors: {
                        username: 'This username is taken',
                    },
                });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong crendetials';
                throw new UserInputError('Wrong crendetials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token,
            };
        },
    },
};