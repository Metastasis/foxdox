import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Analysis, AnalysisSchema } from './entities/analysis.entity';
import { File, FileSchema } from './entities/file.entity';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { FileService } from './file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Analysis.name, schema: AnalysisSchema },
      { name: File.name, schema: FileSchema },
    ]),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService, FileService],
})
export class AnalyzesModule {}
