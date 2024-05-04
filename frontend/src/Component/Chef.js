
import { Typography, Fade } from '@mui/material';
import { useEffect } from 'react';

const Chef = () => {

  useEffect(() => {

    document.body.style.backgroundColor = '#b39ddb';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <Fade in={true} timeout={2000}>
      <Typography
        variant="h2"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
        sx={{
          fontSize: '4rem',
          mt: 30,
          mb: 5,
          color: '#673ab7',
        }}
      >
        Greetings Chef!
      </Typography>
    </Fade>
  );
};

export default Chef;
