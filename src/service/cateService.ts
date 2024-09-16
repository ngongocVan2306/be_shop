import httpStatus from 'http-status';
import { CraetecateDto } from '~/dto/cateSto/createCate.dto';
import Cate from '~/models/Cate';
import Image from '~/models/Image';
import Product from '~/models/Product';
import Product_User from '~/models/Product_User';
import { IProduct } from '~/utils/interface';
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
            const products = (
                (await Product.findAll({
                    where: { type: id },
                })) as Partial<IProduct>[]
            ).map((item) => item.id);

            products.forEach(async (item) => {
                await Promise.all([
                    await Image.destroy({
                        where: { product_id: item },
                    }),
                    await Product_User.destroy({
                        where: { product_id: id },
                    }),
                ]);

                await Product.destroy({
                    where: { id: item },
                });
            });

            await Cate.destroy({
                where: {
                    id: id,
                },
            });
            return ResponseHandler(httpStatus.OK, null, 'Cate deleted successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }
}

export default new CateService();
