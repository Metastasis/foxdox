import React, {ReactElement} from 'react';
import Grid from '@mui/material/Grid';


interface Props {
  children?: ReactElement
}

export default function Sidebar(props: Props) {
  const {children} = props;
  return (
    <Grid item xs={12} sm={4}>
      {children}
    </Grid>
  );
}
