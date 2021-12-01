const config = require('../config');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-errors');

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, config.SECRET_KEY);
                return user;
            } catch (err) {
                throw new AuthenticationError(err);
            }
        }
    }
    // TODO: return better value
    return null;
};