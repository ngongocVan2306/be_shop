import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CraetecateDto } from '~/dto/cateSto/createCate.dto';
import cateService from '~/service/cateService';
import { ResponseHandler } from '~/utils/Response';
import { validateData } from '~/utils/validate';

class CateController {
    async handleCreateCate(req: Request, res: Response) {
        try {
            const isValid = await validateData(CraetecateDto, req.body, res);
            if (!isValid) return;
            const data = await cateService.createCateService(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleGeCate(req: Request, res: Response) {
        try {
            const data = await cateService.getCateService();
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }

    async handleDeleteCate(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id);
            const data = await cateService.deleteCateService(id);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }
}

const cateController = new CateController();
export default cateController;
//
