import { Request } from 'express';
import httpStatus from 'http-status';
import { CreateUserDto } from '~/dto/userDto/createUser.dto';
import { LoginUserDto } from '~/dto/userDto/loginUser.dto';
import { comparePassword, endCodePassword } from '~/helpers/bcrypt';
import { handleCreateToken, handleVerifyToken } from '~/middleware/jwtActions';
import User from '~/models/User';
import { role } from '~/utils/enum';
import { IDataResLogin, IUser } from '~/utils/interface';
import { ResponseHandler } from '~/utils/Response';

class UserService {
    async checkUserExit(
        email: string,
        type: 'check' | 'query' = 'check',
    ): Promise<
        | boolean
        | {
              User: IUser | null;
              isValid: boolean;
          }
    > {
        let isValid = false;
        const user = (await User.findOne({
            where: {
                email,
            },
            raw: true,
            nest: true,
        })) as IUser | null;

        if (user) {
            isValid = true;
        }

        return type !== 'check'
            ? {
                  User: user,
                  isValid: isValid,
              }
            : isValid;
    }

    async register(data: CreateUserDto) {
        try {
            const isUserExits = await this.checkUserExit(data.email, 'check');
            if (isUserExits) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'User already exists');
            }

            const passwordHash = await endCodePassword(data.password);

            await User.create({
                ...data,
                password: passwordHash,
                role: 'user',
            });

            return ResponseHandler(httpStatus.OK, null, 'User create successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async login(data: LoginUserDto) {
        try {
            const dataCheck = await this.checkUserExit(data.email, 'query');
            if (typeof dataCheck !== 'object')
                return Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
            if (!dataCheck.User) {
                return Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
            }

            if (!dataCheck.isValid) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'User not exists');
            }

            const checkPassword = await comparePassword(data.password, dataCheck.User.password);
            if (!checkPassword) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'Wrong password');
            }

            const tokenAccess = handleCreateToken(
                {
                    id: dataCheck.User.id,
                    email: dataCheck.User.email,
                    role: dataCheck.User.role,
                },
                '10s',
            );

            const tokenRefresh = handleCreateToken(
                {
                    id: dataCheck.User.id,
                    email: dataCheck.User.email,
                    role: dataCheck.User.role,
                },
                '360day',
            );

            const user = {
                ...dataCheck.User,
            } as any;
            delete user.password;

            const dataBuider: IDataResLogin = {
                user: user,
                tokens: {
                    access_token: tokenAccess ? tokenAccess : '',
                    refresh_token: tokenRefresh ? tokenRefresh : '',
                },
            };

            return ResponseHandler<IDataResLogin>(
                httpStatus.OK,
                {
                    ...dataBuider,
                },
                'Login successfully',
            );
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async Logout() {
        try {
            return ResponseHandler(httpStatus.OK, null, 'Logout successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async refreshTokenService(req: Request) {
        try {
            if (!req.headers.authorization)
                return Promise.reject(ResponseHandler(httpStatus.UNAUTHORIZED, null, 'token not found!'));

            const token = req.headers.authorization?.replace('Bearer', '').trim();

            let decode = handleVerifyToken(token);

            if (!decode) return Promise.reject(ResponseHandler(httpStatus.FORBIDDEN, null, 'token can not decoded!'));

            if (decode.role !== role.ADMIN) {
                return Promise.reject(ResponseHandler(httpStatus.FORBIDDEN, null, 'your role aren not admin!'));
            }

            const access_token = handleCreateToken(
                {
                    id: decode.id,
                    email: decode.email,
                    role: decode.role,
                },
                '10s',
            );

            return ResponseHandler(httpStatus.OK, access_token, 'create token new successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async CreateAdminService(id: number) {
        try {
            if (!id) {
                return Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
            }
            await User.update(
                {
                    role: 'admin',
                },
                {
                    where: { id: id },
                },
            );
            return ResponseHandler(httpStatus.OK, null, 'create admin account successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }
}

export default new UserService();
