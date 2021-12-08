import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFileDto } from './dto/create-file.dto';
import { FrontFileDto } from './dto/front-file.dto';
import { File, FileDocument } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  upload(uploadedFile: CreateFileDto): Promise<FrontFileDto> {
    return this.fileModel.create(uploadedFile).then(FrontFileDto.toFront);
  }
}
