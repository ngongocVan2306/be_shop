import { Request, Response } from 'express';
import userService from '~/service/userService';

class UserController {
    async handleGet(req: Request, res: Response) {
        const data = await userService.testService();
        return res.status(200).json(data);
    }
}

const userController = new UserController();
export default userController;
