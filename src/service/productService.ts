import httpStatus from 'http-status';
import { Op, where } from 'sequelize';
import { CreateProductDto } from '~/dto/productDto/createProduct.dto';
import { ProductAddCartDto } from '~/dto/productDto/productAddCart.dto';
import Image from '~/models/Image';
import Product from '~/models/Product';
import Product_User from '~/models/Product_User';
import { IProduct } from '~/utils/interface';
import { ResponseHandler } from '~/utils/Response';

class ProductService {
    async createProductService(data: CreateProductDto, listFileName: string[]) {
        try {
            const product = (await Product.create({
                ...data,
                inventory: data.total,
            })) as Partial<IProduct>;

            if (!product) {
                return Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
            }

            await Image.bulkCreate(
                listFileName.map((item: string) => {
                    return {
                        img_url: item,
                        product_id: product.id,
                    };
                }),
            );
            return ResponseHandler(httpStatus.OK, null, 'Product Add successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async getProductService(data: CreateProductDto, page: number, pageSize: number, type: number) {
        try {
            if (!page || !pageSize) {
                return ResponseHandler(httpStatus.BAD_REQUEST, null, 'Cần nhập đủ các trường');
            }

            const query: any = {};

            if (type) {
                query.type = type;
            }

            const offset = (page - 1) * pageSize;
            const { count, rows } = await Product.findAndCountAll({
                where: { ...query },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                include: [
                    {
                        model: Image,
                        as: 'imageData',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                    },
                ],
                offset: offset,
                limit: pageSize,
                distinct: true,
            });

            let data = {
                items: rows,
                meta: {
                    currentPage: page,
                    totalIteams: count,
                    totalPages: Math.ceil(count / pageSize),
                },
            };
            return ResponseHandler(httpStatus.OK, data, 'Products');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async searchProductService(textSearch: string) {
        try {
            const { count, rows } = await Product.findAndCountAll({
                where: {
                    [Op.or]: [{ name: { [Op.like]: `%${textSearch}%` } }],
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                include: [
                    {
                        model: Image,
                        as: 'imageData',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                    },
                ],
                offset: 0,
                limit: 10,
            });

            return ResponseHandler(httpStatus.OK, rows, 'Products');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async deleteProductService(id: number) {
        try {
            await Image.destroy({
                where: {
                    product_id: id,
                },
            });

            const res = await Promise.all([
                await Image.destroy({
                    where: {
                        product_id: id,
                    },
                }),
                await Product_User.destroy({
                    where: { product_id: id },
                }),
            ]);
            console.log('res>>>>', res);

            await Product.destroy({
                where: {
                    id: id,
                },
            });

            return ResponseHandler(httpStatus.OK, null, 'Product deleted successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async getDetailProductService(id: number) {
        if (!id) {
            return Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
        try {
            const product = await Product.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: Image,
                        as: 'imageData',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                    },
                ],
            });

            return ResponseHandler(httpStatus.OK, product, 'Product deleted successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async addProductToCartSErvice(data: ProductAddCartDto) {
        try {
            // const product = (await Product.findOne({
            //     where: {
            //         id: data.product_id,
            //     },
            // })) as IProduct | null;

            // if (!product) {
            //     return Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
            // }

            console.log(data);

            await Product_User.create({
                ...data,
            });

            // await Product.update(
            //     { inventory: product.inventory - data.count },
            //     {
            //         where: {
            //             id: data.product_id,
            //         },
            //     },
            // );

            return ResponseHandler(httpStatus.OK, null, 'Đã thêm sản phẩm vào giỏ hàng');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async getCartService(userId: number, page: number, pageSize: number) {
        try {
            if (!userId || !page || !pageSize) {
                return Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
            }

            const offset = (page - 1) * pageSize;
            const { count, rows } = await Product_User.findAndCountAll({
                where: {
                    user_id: userId,
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                include: [
                    {
                        model: Product,
                        as: 'productData',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                        include: [
                            {
                                model: Image,
                                as: 'imageData',
                                attributes: {
                                    exclude: ['createdAt', 'updatedAt'],
                                },
                            },
                        ],
                    },
                ],
                offset: offset,
                limit: pageSize,
                distinct: true,
            });

            let data = {
                items: rows,
                meta: {
                    currentPage: page,
                    totalIteams: count,
                    totalPages: Math.ceil(count / pageSize),
                },
            };

            return ResponseHandler(httpStatus.OK, data, 'Product deleted successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async deleteCartService(id: number) {
        try {
            if (!id) {
                return Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
            }
            await Product_User.destroy({
                where: { id: id },
            });
            return ResponseHandler(httpStatus.OK, null, 'Product deleted successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }

    async countCartService(id: number) {
        try {
            if (!id) {
                return Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
            }
            const count = await Product_User.findAll({
                where: { user_id: id },
            });
            return ResponseHandler(httpStatus.OK, count.length, 'Product deleted successfully');
        } catch (err) {
            console.log(err);
            Promise.reject(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'có lỗi xảy ra!'));
        }
    }
}

export default new ProductService();
