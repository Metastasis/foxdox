import React, {ReactElement, ReactNode} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function getLayout(page: ReactElement): ReactNode {
  return (
    <Container
      fixed
      maxWidth="lg"
      sx={{
        marginTop: (theme) => theme.spacing(1)
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            {page}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
