const { UserDetails } = require('../../database/models');
const hashedPasswordGenerator = require('../utils/bcryptUtils');

const addNewUserInDB = async (email, password) => {

    const hashedPassword = await  hashedPasswordGenerator.createHashedPassword(password);
    const newUser = await UserDetails.create({
        email: email,
        hashedPassword : hashedPassword
    },
    );

    if(!newUser) throw new Error('User could not be created');

    return newUser;

};

module.exports = { addNewUserInDB };