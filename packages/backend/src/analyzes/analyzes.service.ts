import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAnalysisDto } from './dto/create-analyze.dto';
import { UpdateAnalysisDto } from './dto/update-analyze.dto';
import { Analysis, AnalysisDocument, Uuidv4 } from './entities/analysis.entity';

@Injectable()
export class AnalyzesService {
  constructor(
    @InjectModel(Analysis.name) private analysisModel: Model<AnalysisDocument>,
  ) {}

  create(createAnalysisDto: CreateAnalysisDto): Promise<Analysis> {
    return this.analysisModel.create(createAnalysisDto);
  }

  findAll() {
    return this.analysisModel.find().limit(20);
  }

  async findOne(id: Uuidv4): Promise<Analysis | null> {
    const analysis = await this.analysisModel.findById(id);
    return analysis || null;
  }

  async update(
    id: Uuidv4,
    updateAnalysisDto: UpdateAnalysisDto,
  ): Promise<Analysis | null> {
    const analysis = await this.analysisModel.findOneAndUpdate(
      { _id: id },
      { $set: updateAnalysisDto },
    );
    if (!analysis) return null;
    return analysis;
  }

  remove(_id: Uuidv4): Promise<null> {
    return Promise.resolve(null);
  }
}
