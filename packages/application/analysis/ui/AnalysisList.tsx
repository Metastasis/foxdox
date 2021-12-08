import React from 'react';
import {useRouter} from 'next/router';
import useSwr from 'swr';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '../../components/Card';
import Autocomplete from '../../components/Autocomplete';
import {search} from '../api';

export default function AnalysisList() {
  const router = useRouter();
  const searchApi = useSwr('analysisItems', () => search({}));
  const onCreateAnalysis = React.useCallback(() => {
    router.push(`/analysis/new`);
  }, [router]);
  const onRedirect = (itemId: string) => router.push(`/analysis/${itemId}`);
  return (
    <>
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(1)
        }}
      >
        <Button
          onClick={onCreateAnalysis}
          variant="contained"
        >
          Добавить анализ
        </Button>
      </Box>
      <Autocomplete />
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(1),
          '& > *': {
            marginRight: (theme) => theme.spacing(1)
          }
        }}
      >
        {searchApi.data && Array.isArray(searchApi.data) && searchApi.data.map(
          analysis => (
            <Card
              key={analysis.id}
              title={analysis.title}
              extractionDate={analysis.bioMaterialExtractionDate}
              files={analysis.files}
              onRedirect={() => onRedirect(analysis.id)}
            />
          )
        )}
      </Box>
    </>
  );
}
