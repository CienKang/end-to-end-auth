const { UserDetails } = require('../../database/models');
const { NotFoundError } = require('../utils/errors');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils');
const redisUtils = require('../utils/redisUtils');

const loginUserFromDB = async (email, password) => {
    const user = await UserDetails.findOne({
        where: {
            email: email
        }
    });

    if(user === null){
        throw new NotFoundError('User not found in database');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if(!isPasswordCorrect){
        throw new  NotFoundError('Password is incorrect');
    }

    const userData = {
        id: user.id,
        email: user.email,
    };

    const tokenGenerated = jwtUtils.generateJWT(userData);
    await redisUtils.storeToken(email,tokenGenerated);
    return tokenGenerated;
};





module.exports = { loginUserFromDB };