import { Analysis } from '../entities/analysis.entity';

export class SearchDto {
  id?: Analysis['_id'];
  title?: Analysis['title'];
}
