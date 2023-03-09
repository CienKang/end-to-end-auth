const validateTokenServices = require('../services/validateToken.services');
const validateToken = async (req, res,) => {
    const token = req.headers.authorization;
    try{
        const result = await validateTokenServices.validateJWTToken(token); 
        if (result.message === 'User not found') {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'User verified',
            email: result.email
        });
    }
    catch(err){
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
        

};

module.exports = {  validateToken};