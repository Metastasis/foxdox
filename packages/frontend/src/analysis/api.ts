import axios from 'axios';
import {analysisItemsSchema, SearchParams} from './schema';


export function search(params: SearchParams) {
  return axios.post('/analysis/search', params)
    .then(res => {
      return analysisItemsSchema.parse((res.data as any).items);
    });
}
