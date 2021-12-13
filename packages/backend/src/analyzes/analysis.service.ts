import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  SearchDto,
  FrontAnalysisDto,
  UpdateAnalysisDto,
  CreateAnalysisDto,
} from './dto';
import { Uuidv4 } from './types';
import { Analysis, AnalysisDocument } from './entities/analysis.entity';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectModel(Analysis.name) private analysisModel: Model<AnalysisDocument>,
  ) {}

  create(createAnalysisDto: CreateAnalysisDto): Promise<FrontAnalysisDto> {
    return this.analysisModel
      .create(createAnalysisDto)
      .then(FrontAnalysisDto.toFront);
  }

  findAll(searchDto: SearchDto) {
    let params = {};
    if (searchDto.id) params = { _id: searchDto.id };
    else if (searchDto.title) params = { title: searchDto.title };
    return this.analysisModel
      .find(params)
      .limit(20)
      .sort({ createdAt: -1 })
      .then((results) => {
        if (searchDto.id && results.length === 1) {
          return FrontAnalysisDto.toFront(results[0]);
        }
        return results.map(FrontAnalysisDto.toFront);
      });
  }

  async findOne(id: Uuidv4): Promise<FrontAnalysisDto | null> {
    const analysis = await this.analysisModel.findById(id);
    return analysis ? FrontAnalysisDto.toFront(analysis) : null;
  }

  async update(
    id: Uuidv4,
    updateAnalysisDto: UpdateAnalysisDto,
  ): Promise<FrontAnalysisDto | null> {
    const analysis = await this.analysisModel.findOneAndUpdate(
      { _id: id },
      { $set: updateAnalysisDto },
    );
    if (!analysis) return null;
    return FrontAnalysisDto.toFront(analysis);
  }

  remove(_id: Uuidv4): Promise<null> {
    return Promise.resolve(null);
  }
}
