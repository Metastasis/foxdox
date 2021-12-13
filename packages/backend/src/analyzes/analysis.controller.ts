import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  HttpException,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AnalysisService } from './analysis.service';
import { SearchDto, UpdateAnalysisDto, CreateAnalysisDto } from './dto';
import { Uuidv4 } from './types';
import { FileService } from './file.service';

@Controller('/api/analysis')
export class AnalysisController {
  constructor(
    private readonly analyzesService: AnalysisService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  create(@Body() createAnalyzeDto: CreateAnalysisDto) {
    return this.analyzesService.create(createAnalyzeDto);
  }

  @Post('/search')
  findAll(@Body() searchDto: SearchDto) {
    return this.analyzesService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: Uuidv4) {
    return this.analyzesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: Uuidv4, @Body() updateAnalyzeDto: UpdateAnalysisDto) {
    return this.analyzesService.update(id, updateAnalyzeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Uuidv4) {
    return this.analyzesService.remove(id);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    if (file.mimetype !== 'application/pdf') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const mappedFile = {
      fileName: file.originalname,
      fileType: file.mimetype,
      buffer: file.buffer,
      fileSize: file.size,
    };
    return this.fileService.upload(mappedFile);
  }

  @Get('/download/:fileId')
  async download(
    @Param('fileId') fileId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const file = await this.fileService.download({ fileId });
    if (!file) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    res.set({
      'Content-Type': file.fileType,
      'Content-Disposition': `attachment; filename="${file.fileName}"`,
    });
    return new StreamableFile(file.buffer);
  }
}
