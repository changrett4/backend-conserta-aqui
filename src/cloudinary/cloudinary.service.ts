import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { cloudinaryConfig } from './schemes/cloudinary.config';
import { rejects } from 'assert';
const toStream = require('buffer-to-stream')




@Injectable()
export class CloudinaryService {

    constructor() {
        cloudinary.config(cloudinaryConfig)
        console.log(cloudinaryConfig)
    }

    async uploadFile(file: Express.Multer.File, folder: string): Promise<UploadApiResponse | UploadApiErrorResponse> {

        return new Promise<UploadApiResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ folder },(error,result)=>{
                if(error) return reject(error)
                resolve(result)
            });
            toStream(file.buffer).pipe(uploadStream);
            
        })
    
    }
}
