export class CreateFileDto {
  fileName: string;
  fileType: string;
  fileSize: number;
  buffer: Buffer;
}
