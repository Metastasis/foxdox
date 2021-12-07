import axios from 'axios';
import {
  Analysis,
  analysisCreateSchema,
  analysisItemsSchema,
  analysisSchema,
  DownloadLinkParams,
  fileParamsSchema,
  SearchParams
} from './schema';


export function search(params: SearchParams) {
  return axios.post('/api/analysis/search', params)
    .then(res => {
      return params.id
        ? analysisSchema.parse((res.data as any))
        : analysisItemsSchema.parse((res.data as any));
    });
}

export default function downloadViaPost(
  url: string,
  fields: any = {},
  {target}: any = {}
) {
  const form = global.document.createElement('form');
  Object.assign(
    form,
    {action: url, method: 'POST'}
  );
  if (target) form.target = target;
  Object.assign(
    form.style,
    {visibility: 'hidden', width: '0', height: '0'}
  );
  const keys = Object.keys(fields);
  for (let i = 0; i < keys.length; i++) {
    const hidden = global.document.createElement('input');
    Object.assign(
      hidden,
      {type: 'hidden', name: keys[i], value: fields[keys[i]]}
    );
    form.appendChild(hidden);
  }
  const body: HTMLElement = global.document.body;
  body.appendChild(form);
  form.submit();
  body.removeChild(form);
}

export function downloadViaFormFile(params: {[key: string]: any}) {
  downloadViaPost('/api/documents/download', params);
  return Promise.resolve();
}

export function downloadViaLink(params: DownloadLinkParams) {
  const payload = fileParamsSchema.parse(params);
  return axios.post('/api/analysis/download', payload, {responseType: 'blob'})
    .then(response => {
      const fileName = response.headers['content-disposition']?.split('"')[1] || `file-${Date.now()}`;
      const options = {type: response.headers['content-type'] || 'application/octet-stream'};
      const url = window.URL.createObjectURL(new File([response.data as Blob], fileName, options));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      // @ts-ignore
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
}

export function create(newAnalysis: any) {
  return axios.post('/api/analysis', newAnalysis)
    .then(res => {
      return analysisCreateSchema.parse(res.data as any);
    });
}

export function update(nextAnalysis: Analysis) {
  const updated = analysisSchema.parse(nextAnalysis);
  return axios.patch('/api/analysis', updated)
    .then(res => {
      return analysisSchema.parse(res.data as any);
    });
}

export function upload(file: any) {
  const headers = {
    'Content-Type': 'multipart/form-data'
  };
  const formData = new FormData();
  formData.append('file', file);
  return axios.post('/api/analysis/upload-file', formData, {headers})
    .then(r => r.data);
}
