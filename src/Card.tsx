import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
  title: string
}

export default function ImgMediaCard(props: Props) {
  const {title} = props;
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 345,
        display: 'inline-block'
      }}
    >
      <CardMedia
        component="img"
        alt="placeholder"
        height="150"
        image="https://via.placeholder.com/350x150"
      />
      <CardContent>
        <Typography gutterBottom noWrap variant="h5">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
