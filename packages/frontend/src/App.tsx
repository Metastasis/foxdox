import React from 'react';
import {useHistory} from 'react-router-dom';
import {useQuery} from 'react-query';
import Container from '@mui/material/Container';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Layout from './components/Layout';
import Card from './components/Card';
import Autocomplete from './components/Autocomplete';
import {search, create} from './analysis';


const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Sidebar() {
  return <Item>xs=4</Item>;
}

function App() {
  const history = useHistory();
  const searchApi = useQuery('analysisItems', () => search({}));
  const onCreateAnalysis = React.useCallback(() => {
    create().then(analysis => {
      history.push(`/analysis/${analysis.id}`);
    })
  }, [history]);
  return (
    <Container
      fixed
      maxWidth="lg"
      sx={{
        marginTop: (theme) => theme.spacing(2)
      }}
    >
      <Layout sidebar={<Sidebar />}>
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
          {searchApi.status === 'success' && Array.isArray(searchApi.data) && searchApi.data.map(
            analysis => (
              <Card
                key={analysis.id}
                title={analysis.title}
                extractionDate={analysis.bioMaterialExtractionDate}
                files={analysis.files}
              />
            )
          )}
        </Box>
      </Layout>
    </Container>
  );
}

export default App;
