import { CreateAnalysisDto } from './create-analyze.dto';
import { Uuidv4, AnalysisDocument } from '../entities/analysis.entity';

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
