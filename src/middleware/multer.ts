import { Request } from 'express';
import multer from 'multer';
require('dotenv').config();

const storageCourse = multer.diskStorage({
    destination: function (req: Request, file, cb) {
        return cb(null, './src/public/products');
    },
    filename: function (req: Request, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    },
});

export const uploadImage = multer({
    storage: storageCourse,
    // limits: { fileSize: 1000 * 1000 },
});
