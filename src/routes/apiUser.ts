import express, { Express } from 'express';
import userController from '~/controller/userController';

const router = express.Router();

const initApiUser = (app: Express) => {
    router.post('/register', userController.handleRegister);
    router.post('/login', userController.handleLogin);

    return app.use('/v1/user', router);
};

export default initApiUser;
