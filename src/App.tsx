import React from 'react';
import Container from '@mui/material/Container';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Layout from './Layout';
import Card from './Card';
import Autocomplete from './Autocomplete';


const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const analysisItems = [
  {
    id: '1',
    title: 'Биохимические исследования',
    bioMaterialExtractionDate: new Date('2020-09-08')
  },
  {
    id: '2',
    title: 'Метаболиты',
    bioMaterialExtractionDate: new Date('2020-09-08')
  },
  {
    id: '3',
    title: 'Гормоны, метаболиты, специфические белки',
    bioMaterialExtractionDate: new Date('2020-09-08')
  }
];

function App() {
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
          {analysisItems.map(
            analysis => <Card key={analysis.id} title={analysis.title} />
          )}
        </Box>
      </Layout>
    </Container>
  );
}

export default App;
