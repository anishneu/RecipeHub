import { Typography, Fade } from '@mui/material';
import { useEffect } from 'react';

const User = () => {
  useEffect(() => {

    document.body.style.backgroundColor = '#ffb74d';
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
          color: '#ef6c00',
        }}
      >
        Greetings User!
      </Typography>
    </Fade>
  );
};

export default User;

