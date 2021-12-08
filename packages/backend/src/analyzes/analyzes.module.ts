import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Analysis, AnalysisSchema } from './entities/analysis.entity';
import { File, FileSchema } from './entities/file.entity';
import { AnalyzesController } from './analyzes.controller';
import { AnalyzesService } from './analyzes.service';
import { FileService } from './file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Analysis.name, schema: AnalysisSchema },
      { name: File.name, schema: FileSchema },
    ]),
  ],
  controllers: [AnalyzesController],
  providers: [AnalyzesService, FileService],
})
export class AnalyzesModule {}
