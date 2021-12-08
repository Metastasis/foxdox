import { CreateFileDto } from './create-file.dto';
import { FileDocument } from '../entities/file.entity';
import { Uuidv4 } from '../types';

export class FrontFileDto {
  fileId: Uuidv4;
  fileName: CreateFileDto['fileName'];
  fileType: CreateFileDto['fileType'];

  static toFront(file: FileDocument) {
    return {
      fileId: file._id,
      fileName: file.fileName,
      fileType: file.fileType,
    };
  }
}
