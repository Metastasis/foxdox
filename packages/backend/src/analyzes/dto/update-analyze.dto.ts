import { PartialType } from '@nestjs/mapped-types';
import { CreateAnalysisDto } from './create-analyze.dto';

export class UpdateAnalysisDto extends PartialType(CreateAnalysisDto) {}
