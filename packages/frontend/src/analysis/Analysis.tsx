import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Layout from '../components/Layout';
import {search} from './api';
import {Analysis as TAnalysis} from './schema';


export default function Analysis() {
  const params = useParams<{id: string}>();
  const response = useQuery(['analysisItem', params.id], () => search(params));
  if (response.status !== 'success') return null;
  const analysis = (response.data as unknown) as TAnalysis;
  return (
    <Container
      fixed
      maxWidth="lg"
      sx={{
        marginTop: (theme) => theme.spacing(2)
      }}
    >
      <Layout>
        <Card
          variant="outlined"
        >
          <CardContent>
            <Typography gutterBottom noWrap variant="h5">
              {analysis.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Дата взятия материала: {formatDate(analysis.bioMaterialExtractionDate)}
            </Typography>
          </CardContent>
        </Card>
      </Layout>
    </Container>
  );
}

function formatDate(date?: Date) {
  if (!date) return '';
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth()).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
