import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import Layout from '../components/Layout';


export default function Analysis() {
  const [value, setValue] = React.useState(null);
  return (
    <Container
      fixed
      maxWidth="lg"
      sx={{
        marginTop: (theme) => theme.spacing(1)
      }}
    >
      <Layout>
        <Typography variant="h3">
          Новый анализ
        </Typography>
        <FormControl
          fullWidth
        >
          <TextField
            required
            name="title"
            label="Анализ"
            size="medium"
            sx={{
              marginTop: (theme) => theme.spacing(2)
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <DatePicker
              label="Дата сдачи"
              mask="__.__.____"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  size="medium"
                  sx={{
                    marginTop: (theme) => theme.spacing(2)
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            sx={{
              maxWidth: '200px',
              marginTop: (theme) => theme.spacing(2),
              marginLeft: 'auto'
            }}
          >
            Создать
          </Button>
        </FormControl>
      </Layout>
    </Container>
  );
}
