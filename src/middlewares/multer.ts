import path, { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

export const multerOptions = {
  storage: diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: any): void => {
      const uploadPath: string = path.join(
        __dirname,
        '../../public/upload/movies',
      );
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req: Request, file: Express.Multer.File, cb: any): void => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req: Request, file: Express.Multer.File, cb: any): void => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
};

// @UseInterceptors(FileInterceptor('file', multerOptions))
