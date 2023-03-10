const validateTokenController = require('../../src/controllers/validateToken.controller');
const validateTokenServices = require('../../src/services/validateToken.services');

jest.mock('redis', () => {
    return {
        createClient: jest.fn().mockReturnValue({
            connect: jest.fn().mockResolvedValue(),
            set: jest.fn().mockResolvedValue(),
            get: jest.fn().mockResolvedValue()
        })
    };
});

describe('Validate Token Controller', () => {
    describe('validateToken', () => {
        const mockReq = {
            headers: {
                authorization: 'test'
            }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };



        it('should return 200 and user data when token is valid', async () => {
            jest.spyOn(validateTokenServices, 'validateJWTToken').mockResolvedValue({
                email: 'test'
            });

            await validateTokenController.validateToken(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'User verified',
                email: 'test'
            });
        });

        it('should return 401 when token is invalid', async () => {
            jest.spyOn(validateTokenServices, 'validateJWTToken').mockRejectedValue(new Error('Invalid token'));

            await validateTokenController.validateToken(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Invalid token'
            });
        });

    });
});