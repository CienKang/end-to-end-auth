const addNewUserServices = require('../services/addNewUser.services');

const addNewUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await addNewUserServices.addNewUserInDB(email, password);
        res.status(201).json({
            message: 'User created successfully',
            data: result
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating user',
            error: error
        });
    }
};

module.exports = { addNewUser };
