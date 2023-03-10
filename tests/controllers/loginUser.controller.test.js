const loginUserServices = require('../../src/services/loginUser.services');
const loginUserController = require('../../src/controllers/loginUser.controller');
const { NotFoundError } = require('../../src/utils/errors');

jest.mock('redis', () => {
    return {
        createClient: jest.fn().mockReturnValue({
            connect: jest.fn().mockResolvedValue(),
            set: jest.fn().mockResolvedValue(),
            get: jest.fn().mockResolvedValue()
        })
    };
});

describe('Login User Controller', () => {

    describe('handleLogin', () => {

        it('should return 200 and user data when user is logged in', async () => {

            const mockRequest = {
                body: {
                    email: 'test',
                    password: 'test'
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            jest.spyOn(loginUserServices, 'loginUserFromDB').mockResolvedValue({
                email: 'test',
                password: 'test'
            });

            await loginUserController.handleLogin(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'User Logged IN..',
                data: {
                    email: 'test',
                    password: 'test'
                }
            });

        });

        it('should return 401 when password is incorrect', async () => {

            const mockRequest = {
                body: {
                    email: 'test',
                    password: 'test'
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            jest.spyOn(loginUserServices, 'loginUserFromDB').mockRejectedValue(new NotFoundError('Password incorrect'));

            await loginUserController.handleLogin(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Password incorrect'
            });

        });

        it('should return 500 when internal server error occurs', async () => {

            const mockRequest = {
                body: {
                    email: 'test',
                    password: 'test'
                }
            };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            jest.spyOn(loginUserServices, 'loginUserFromDB').mockRejectedValue(new Error('Internal Server Error'));

            await loginUserController.handleLogin(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Internal server error'
            });


        });
    });
});