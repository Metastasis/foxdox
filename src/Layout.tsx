import React, {ReactNode, ReactNodeArray} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


interface Props {
  children: ReactNode | ReactNodeArray,
  sidebar?: ReactNode | ReactNodeArray
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
