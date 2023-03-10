const jwtUtils = require('../utils/jwtUtils');
const redisUtils = require('../utils/redisUtils');

const validateJWTToken = async (token) => {

    const result = await jwtUtils.verifyJWT(token);
    const redisToken = await redisUtils.getToken(result.email);

    if (redisToken != token) {
        throw new Error('Token not found in redis');
    }
    return result;
};

module.exports = { validateJWTToken };