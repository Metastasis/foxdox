import React from 'react';
import Container from '@mui/material/Container';
import Layout from './Layout';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Card from './Card';
import Autocomplete from './Autocomplete';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
        <Card />
        <Card />
        <Card />
        <Card />
      </Layout>
    </Container>
  );
}

export default App;
