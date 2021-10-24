import React from 'react';
import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface File {
  fileId: string,
  fileName: string
}
interface Props {
  title: string,
  extractionDate: Date,
  files: File[]
}

export default function ImgMediaCard(props: Props) {
  const {title, extractionDate, files} = props;
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
          Дата взятия материала: {formatDate(extractionDate)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Подробнее</Button>
        {files.map(file => (
          <Button
            component={Link}
            key={file.fileId}
            to={`/analysis/download/${file.fileId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {file.fileName}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
}

function formatDate(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth()).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
