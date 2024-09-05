import httpStatus from 'http-status';
import { ResponseHandler } from '~/utils/Response';

class UserService {
    async testService() {
        try {
            if (false) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'User already exists');
            }

            return ResponseHandler(httpStatus.OK, null, 'User create successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }
}

export default new UserService();
