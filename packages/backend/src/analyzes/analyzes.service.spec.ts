import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzesService } from './analyzes.service';
import { Analysis, AnalysisDocument } from './entities/analysis.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const mockAnalysis: Partial<AnalysisDocument> = {
  title: 'The analysis',
  bioMaterialExtractionDate: new Date(Date.UTC(2021, 2, 10, 13, 0, 0, 0)),
  files: [],
};

describe('AnalyzesService', () => {
  let service: AnalyzesService;
  let model: Model<AnalysisDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyzesService,
        {
          provide: getModelToken(Analysis.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockAnalysis),
            constructor: jest.fn().mockResolvedValue(mockAnalysis),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AnalyzesService>(AnalyzesService);
    model = module.get<Model<AnalysisDocument>>(getModelToken(Analysis.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert new analyis', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        title: 'The analysis',
        bioMaterialExtractionDate: new Date(Date.UTC(2021, 2, 10, 13, 0, 0, 0)),
        files: [],
      }),
    );
    const newAnalysis = await service.create({
      title: 'The analysis',
      bioMaterialExtractionDate: new Date(Date.UTC(2021, 2, 10, 13, 0, 0, 0)),
      files: [],
    });
    expect(newAnalysis).toEqual(mockAnalysis);
  });
});
