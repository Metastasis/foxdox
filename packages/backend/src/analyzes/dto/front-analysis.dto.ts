import { CreateAnalysisDto } from './create-analyze.dto';
import { AnalysisDocument } from '../entities/analysis.entity';
import { Uuidv4 } from '../types';

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
