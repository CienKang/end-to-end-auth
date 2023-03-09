const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = 4000;

const tokenValidationRoutes = require('./src/routes/tokenValidation.routes');
const addNewUserRoutes = require('./src/routes/users.routes');
const loginUserRoutes = require('./src/routes/login.routes');
dotenv.config({ path: '.env' });

app.use(express.json());
app.use(addNewUserRoutes);
app.use(loginUserRoutes);
app.use(tokenValidationRoutes);
console.log(process.env.REDIS_HOST);
app.listen(PORT,process.env.HOST, () => console.log(`Server is listening on port ${PORT}`));
