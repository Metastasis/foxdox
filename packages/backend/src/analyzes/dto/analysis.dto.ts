import { PartialType } from '@nestjs/mapped-types';
import { Analysis, AnalysisDocument } from '../entities/analysis.entity';
import { Uuidv4 } from '../types';

export class CreateAnalysisDto {
  title: string;
  bioMaterialExtractionDate: Date;
  files: Array<{ fileId: string }>;
}

export class FrontAnalysisDto extends CreateAnalysisDto {
  id: Uuidv4;

  static toFront(analysis: AnalysisDocument): FrontAnalysisDto {
    return {
      id: analysis._id,
      title: analysis.title,
      bioMaterialExtractionDate: analysis.bioMaterialExtractionDate,
      files: analysis.files,
    };
  }
}

export class SearchDto {
  id?: Analysis['_id'];
  title?: Analysis['title'];
}

export class UpdateAnalysisDto extends PartialType(CreateAnalysisDto) {}
