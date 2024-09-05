import httpStatus from 'http-status';
import { CreateProductDto } from '~/dto/productDto/createProduct.dto';
import { ResponseHandler } from '~/utils/Response';

class ProductService {
    async createProductService(data: CreateProductDto) {
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

export default new ProductService();
