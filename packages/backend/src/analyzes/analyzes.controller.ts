import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnalyzesService } from './analyzes.service';
import { CreateAnalysisDto } from './dto/create-analyze.dto';
import { UpdateAnalysisDto } from './dto/update-analyze.dto';
import { SearchDto } from './dto/search.dto';
import { Uuidv4 } from './entities/analysis.entity';

@Controller('/api/analysis')
export class AnalyzesController {
  constructor(private readonly analyzesService: AnalyzesService) {}

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
}