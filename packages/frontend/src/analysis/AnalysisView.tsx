import React from 'react';
import {useQuery} from 'react-query';
import {useParams, Link} from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Layout from '../components/Layout';
import {search} from './api';


interface UrlParams {
  id?: string;
}


export default function AnalysisView() {
  const params = useParams<UrlParams>();
  const searchApi = useQuery(['analysis-view', params.id], () => search({id: params.id}));
  if (searchApi.status === 'loading') {
    return (
      <Container
        fixed
        maxWidth="lg"
        sx={{
          marginTop: (theme) => theme.spacing(1)
        }}
      >
        <Layout>
          <Typography variant="h3">
            Анализ
          </Typography>
          <Typography>
            Загружаем анализ...
          </Typography>
        </Layout>
      </Container>
    );
  }
  if (searchApi.status === 'error' || !searchApi.data) {
    return (
      <Container
        fixed
        maxWidth="lg"
        sx={{
          marginTop: (theme) => theme.spacing(1)
        }}
      >
        <Layout>
          <Typography variant="h3">
            Анализ
          </Typography>
          <Typography>
            Произошла ошибка, попробуйте позже
          </Typography>
        </Layout>
      </Container>
    );
  }
  const analysis = Array.isArray(searchApi.data) ? searchApi.data[0] : searchApi.data;
  return (
    <Container
      fixed
      maxWidth="lg"
      sx={{
        marginTop: (theme) => theme.spacing(1)
      }}
    >
      <Layout>
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
            <Link to={`/analysis/download/${f.fileId}`} target="_blank">
              {f.fileName || `Файл ${idx}`}
            </Link>
          </div>
        ))}
      </Layout>
    </Container>
  );
}

function formatDate(date?: Date) {
  if (!date) return '';
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth()).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${dd}.${mm}.${yyyy}`;
}
