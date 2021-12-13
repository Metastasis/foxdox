import React, {ChangeEvent} from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import {create, upload} from '../api';


export default function AnalysisCreate() {
  const router = useRouter();
  const [date, setDate] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [files, setFiles] = React.useState<Array<{status: string}>>([]);
  const onUpload = React.useCallback((e: ChangeEvent) => {
    const files = Array.from((e.target as HTMLInputElement).files || []);
    const uploads = files.map(file => upload({file}));
    Promise.allSettled<{}>(uploads).then(res => res.map(result => {
      const response = result.status === 'fulfilled' ? result.value : {};
      const status = result.status === 'fulfilled' ? 'success' : 'error';
      return {...response, status};
    })).then(uploadedFiles => setFiles(uploadedFiles));
  }, []);
  const onSubmit = React.useCallback((e) => {
    e.preventDefault();
    return create({
      title,
      bioMaterialExtractionDate: date,
      files: files.map(({status, ...f}) => f)
    }).then((r) => {
      router.push(`/analysis/${r.id}`);
    });
  }, [date, files, title, router]);
  return (
    <>
      <Typography variant="h3">
        Добавление анализа
      </Typography>
      <FormControl
        fullWidth
      >
        <TextField
          required
          name="title"
          label="Название"
          placeholder="Биохимический анализ крови"
          size="medium"
          sx={{
            marginTop: (theme) => theme.spacing(2)
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
          <DatePicker
            label="Когда сдан"
            mask="__.__.____"
            value={date}
            onChange={setDate}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  placeholder: 'дд.мм.гггг'
                }}
                required
                size="medium"
                sx={{
                  marginTop: (theme) => theme.spacing(2)
                }}
              />
            )}
          />
        </LocalizationProvider>
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(2)
          }}
        >
          <input
            accept="image/jpg,image/jpeg,image/png,application/pdf"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={onUpload}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="outlined"
              component="span"
            >
              Загрузить файл
            </Button>
          </label>
        </Box>
        <Button
          variant="contained"
          sx={{
            maxWidth: '200px',
            marginTop: (theme) => theme.spacing(2),
            marginLeft: 'auto'
          }}
          onClick={onSubmit}
        >
          Создать
        </Button>
      </FormControl>
    </>
  );
}
