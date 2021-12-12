import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { CreateAnalysisDto } from './dto/create-analyze.dto';

describe('AnalyzesController', () => {
  let controller: AnalysisController;
  let service: AnalysisService;
  const createAnalysisDto: CreateAnalysisDto = {
    title: 'The analysis',
    bioMaterialExtractionDate: new Date(Date.UTC(2021, 2, 10, 13, 0, 0, 0)),
    files: [],
  };
  const mockAnalysis = {
    id: '1',
    title: 'The analysis',
    bioMaterialExtractionDate: new Date(Date.UTC(2021, 2, 10, 13, 0, 0, 0)),
    files: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalysisController],
      providers: [
        {
          provide: AnalysisService,
          useValue: {
            create: jest.fn().mockResolvedValue(createAnalysisDto),
          },
        },
      ],
    }).compile();

    controller = module.get<AnalysisController>(AnalysisController);
    service = module.get<AnalysisService>(AnalysisService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('Should create analysis', async () => {
      const spy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockAnalysis);
      await controller.create(createAnalysisDto);
      expect(spy).toHaveBeenCalledWith(createAnalysisDto);
    });
  });
});
