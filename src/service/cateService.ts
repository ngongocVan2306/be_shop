import httpStatus from 'http-status';
import { CraetecateDto } from '~/dto/cateSto/createCate.dto';
import Cate from '~/models/Cate';
import { ResponseHandler } from '~/utils/Response';

class CateService {
    async createCateService(data: CraetecateDto) {
        try {
            await Cate.create({
                ...data,
            });

            return ResponseHandler(httpStatus.OK, null, 'Cate create successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async getCateService() {
        try {
            const cates = await Cate.findAll({
                attributes: ['id', 'name'],
            });
            return ResponseHandler(httpStatus.OK, cates, 'Cate create successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async deleteCateService(id: number) {
        try {
            const cates = await Cate.destroy({
                where: {
                    id: id,
                },
            });
            return ResponseHandler(httpStatus.OK, cates, 'Cate deleted successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }
}

export default new CateService();
