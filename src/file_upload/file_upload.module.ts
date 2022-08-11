import { Module } from '@nestjs/common';
import { FileUploadService } from './file_upload.service';

@Module({
  providers: [FileUploadService]
})
export class FileUploadModule {}
