import React from 'react';
import useSwr from 'swr';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import {search} from '../api';


interface Props {
  id?: string;
}


export default function AnalysisView(props: Props) {
  const {id} = props;
  const searchApi = useSwr(['analysis-view', id], () => search({id}));
  if (!searchApi.data && !searchApi.error) {
    return (
      <>
        <Typography variant="h3">
          Анализ
        </Typography>
        <Typography>
          Загружаем анализ...
        </Typography>
      </>
    );
  }
  if (searchApi.error || !searchApi.data) {
    return (
      <>
        <Typography variant="h3">
          Анализ
        </Typography>
        <Typography>
          Произошла ошибка, попробуйте позже
        </Typography>
      </>
    );
  }
  const analysis = Array.isArray(searchApi.data) ? searchApi.data[0] : searchApi.data;
  return (
    <>
      <Typography variant="h3">
        {analysis.title}
      </Typography>
      <Typography>
        Дата изъятия материала: {formatDate(analysis.bioMaterialExtractionDate)}
      </Typography>
      <Typography variant="h5">
        Файлы
      </Typography>
      {analysis.files.map((f, idx) => (
        <div key={f.fileId}>
          <Link href={`/analysis/download/${f.fileId}`}>
            {f.fileName || `Файл ${idx}`}
          </Link>
        </div>
      ))}
    </>
  );
}

function formatDate(date?: Date) {
  if (!date) return '';
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth()).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${dd}.${mm}.${yyyy}`;
}
