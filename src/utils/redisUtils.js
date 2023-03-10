/* istanbul ignore file */
const { createClient } = require('redis');

const config = {
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
};

const client = createClient(config);
client.connect().then(() => {
    console.log('Redis connected');
});

const storeToken = async (token, email) => {
    await client.set(token, email, 'EX', process.env.TOKEN_EXPIRY);
};

const getToken = async (email) => {
    const token = await client.get(email);
    return token;
};

module.exports = {
    storeToken,
    getToken
};