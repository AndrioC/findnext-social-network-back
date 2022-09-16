import { Stream } from 'stream';

export class UploadFileDTO {
  Bucket: string;
  Key: string;
  Body: Stream;
  ContentType: string;
}
