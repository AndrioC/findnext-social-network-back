import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

import { DeleteFileDTO } from '../dtos/delete-file.dto';
import { UploadFileDTO } from '../dtos/upload-file.dto';

@Injectable()
export class S3Service {
  constructor(private configService: ConfigService) {}

  AWS_ACCESS_KEY = this.configService.get<string>('AWS_ACCESS_KEY');
  AWS_SECRET_ACCESS_KEY = this.configService.get<string>(
    'AWS_SECRET_ACCESS_KEY',
  );
  s3 = new S3({
    accessKeyId: this.AWS_ACCESS_KEY,
    secretAccessKey: this.AWS_SECRET_ACCESS_KEY,
  });
  async uploadFile({ params }: { params: UploadFileDTO }): Promise<void> {
    const uploadFilePromise = this.s3.upload(params).promise();

    await uploadFilePromise;
  }

  async deleteFile({ filename, bucketName }: DeleteFileDTO): Promise<void> {
    const deleteFilePromise = this.s3
      .deleteObject({
        Key: filename,
        Bucket: bucketName,
      })
      .promise();

    await deleteFilePromise;
  }
}
