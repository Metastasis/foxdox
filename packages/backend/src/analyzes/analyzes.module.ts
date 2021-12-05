import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Analysis, AnalysisSchema } from './entities/analysis.entity';
import { AnalyzesController } from './analyzes.controller';
import { AnalyzesService } from './analyzes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Analysis.name, schema: AnalysisSchema },
    ]),
  ],
  controllers: [AnalyzesController],
  providers: [AnalyzesService],
})
export class AnalyzesModule {}
