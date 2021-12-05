export class CreateAnalysisDto {
  title: string;
  bioMaterialExtractionDate: Date;
  files: Array<{ fileId: string }>;
}
