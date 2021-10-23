import React from 'react';
import {useQuery} from 'react-query';
import Container from '@mui/material/Container';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Layout from './components/Layout';
import Card from './components/Card';
import Autocomplete from './components/Autocomplete';
import {search} from './analysis';


const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const searchApi = useQuery('analysisItems', () => search({}));
  return (
    <Container
      fixed
      maxWidth="lg"
      sx={{
        marginTop: (theme) => theme.spacing(2)
      }}
    >
      <Layout sidebar={<Item>xs=4</Item>}>
        <Autocomplete />
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(1),
            '& > *': {
              marginRight: (theme) => theme.spacing(1)
            }
          }}
        >
          {searchApi.status === 'success' && searchApi.data.map(
            analysis => <Card key={analysis.id} title={analysis.title} />
          )}
        </Box>
      </Layout>
    </Container>
  );
}

export default App;
