import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateUserDto } from '~/dto/userDto/createUser.dto';
import { LoginUserDto } from '~/dto/userDto/loginUser.dto';
import userService from '~/service/userService';
import { ResponseHandler } from '~/utils/Response';
import { validateData } from '~/utils/validate';

class UserController {
    async handleRegister(req: Request, res: Response) {
        try {
            const isValid = await validateData(CreateUserDto, req.body, res);
            if (!isValid) return;

            const data = await userService.register(req.body);

            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleLogin(req: Request, res: Response) {
        try {
            const isValid = await validateData(LoginUserDto, req.body, res);
            if (!isValid) return;
            const data = await userService.login(req.body);
            if (data?.code === httpStatus.OK) {
                res.cookie('access_token', data.data?.tokens.access_token, {
                    maxAge: 10 * 1000,
                    // httpOnly: true,
                });
                res.cookie('refresh_token', data.data?.tokens.refresh_token, {
                    maxAge: 365 * 24 * 60 * 60 * 1000,
                    // httpOnly: true,
                });
            }
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleLogout(req: Request, res: Response) {
        try {
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            const data = await userService.Logout();
            return res.status(httpStatus.OK).json(ResponseHandler(httpStatus.OK, data, 'Logout success'));
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleRefreshToken(req: Request, res: Response) {
        try {
            const data = await userService.refreshTokenService(req);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleCreateAdmin(req: Request, res: Response) {
        try {
            const id: number = +req.params.id;
            const data = await userService.CreateAdminService(id);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }
}

const userController = new UserController();
export default userController;
