const addNewUserServices = require('../../src/services/addNewUser.services');
const addNewUserController = require('../../src/controllers/userCreation.controller');

describe('User Creation Controller', () => {
    describe('addNewUser', () => {

        const mockReq = {
            body: {
                email: 'test',
                password: 'test'
            }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };


        it('should return 201 and user data when user is created', async () => {

            jest.spyOn(addNewUserServices, 'addNewUserInDB').mockResolvedValue({
                email: 'test',
                password: 'test'
            });

            await addNewUserController.addNewUser(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'User created successfully',
                data: {
                    email: 'test',
                    password: 'test'
                }
            });

        });

        it('should return 500 when error occurs', async () => {
                
            jest.spyOn(addNewUserServices, 'addNewUserInDB').mockRejectedValue(new Error('Error creating user'));
    
            await addNewUserController.addNewUser(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error creating user',
                error: new Error('Error creating user')
            });
        });
    });
});