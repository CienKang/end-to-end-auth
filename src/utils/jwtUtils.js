
const { UserDetails } = require('../../database/models');
const jwt = require('jsonwebtoken');

const generateJWT = (user) => {

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(user, jwtSecretKey, { expiresIn: '1h' });
    return token;
};

const verifyJWT = async (token) => {

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const decodedToken = jwt.verify(token, jwtSecretKey);

    const user = await UserDetails.findOne({
        where: {
            email: decodedToken.email,
        }
    });
    if (!user) {
        return {
            message: 'User not found'
        };
    }
    return {
        email: user.email,
        message: 'User verified',
    };
};



module.exports = {
    generateJWT,
    verifyJWT
};