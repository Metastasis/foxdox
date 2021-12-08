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
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnalyzesService } from './analyzes.service';
import { CreateAnalysisDto } from './dto/create-analyze.dto';
import { UpdateAnalysisDto } from './dto/update-analyze.dto';
import { SearchDto } from './dto/search.dto';
import { Uuidv4 } from './types';
import { FileService } from './file.service';

@Controller('/api/analysis')
export class AnalyzesController {
  constructor(
    private readonly analyzesService: AnalyzesService,
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

  @Post('upload')
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
}
