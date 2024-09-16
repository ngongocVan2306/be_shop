import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateProductDto } from '~/dto/productDto/createProduct.dto';
import { ProductAddCartDto } from '~/dto/productDto/productAddCart.dto';
import productService from '~/service/productService';
import { ResponseHandler } from '~/utils/Response';
import { validateData } from '~/utils/validate';

class ProductController {
    async handleCreateProduct(req: Request, res: Response) {
        try {
            // const isValid = await validateData(CreateProductDto, req.body, res);
            // if (!isValid) return;

            const files = req?.files as Express.Multer.File[];

            let listFileName = files.map((item) => {
                return item.filename;
            });

            const data = await productService.createProductService(req.body, listFileName);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetProduct(req: Request, res: Response) {
        try {
            const page: number = parseInt(req.query.page as string);
            const pageSize: number = parseInt(req.query.pageSize as string);
            const type: number = parseInt(req.query.type as string);
            const data = await productService.getProductService(req.body, page, pageSize, type);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleDeleteProduct(req: Request, res: Response) {
        try {
            const id: number = +req.params.id;
            const data = await productService.deleteProductService(id);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleSearchProduct(req: Request, res: Response) {
        try {
            const textSearch: string = req.query.textSearch as string;
            const data = await productService.searchProductService(textSearch);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetDetailProduct(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id);
            const data = await productService.getDetailProductService(id);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleAddProductTocart(req: Request, res: Response) {
        try {
            const isValid = await validateData(ProductAddCartDto, req.body, res);
            if (!isValid) return;
            const data = await productService.addProductToCartSErvice(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGetCart(req: Request, res: Response) {
        try {
            const page: number = parseInt(req.query.page as string);
            const pageSize: number = parseInt(req.query.pageSize as string);
            const userId: number = parseInt(req.query.userId as string);

            console.log(page, pageSize, userId);

            const data = await productService.getCartService(userId, page, pageSize);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleDeleteCart(req: Request, res: Response) {
        try {
            const id: number = +req.params.id;
            const data = await productService.deleteCartService(id);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleCountCart(req: Request, res: Response) {
        try {
            const id: number = +req.params.id;
            const data = await productService.countCartService(id);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }
}

const productController = new ProductController();
export default productController;
