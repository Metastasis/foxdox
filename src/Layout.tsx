import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

interface Props {
  children: JSX.Element | JSX.Element[],
  sidebar?: JSX.Element | null | undefined
}

export default function BasicGrid(props: Props) {
  const {children, sidebar} = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          {children}
        </Grid>
        {sidebar && (
          <Grid item xs={12} sm={4}>
            {sidebar}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
