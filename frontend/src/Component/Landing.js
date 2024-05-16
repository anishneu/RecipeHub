import React from 'react';
import mainCookImage from '../images/cook.png'; 
import biryani from '../images/biriyani.jpg';
import burger from '../images/burger.avif';
import pizza from '../images/pizza.avif';
import leafImage from '../images/maple.png';
import { Link } from 'react-router-dom';
import { Fade, Typography, Button, Box, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  backgroundColor: '#7c4dff',
  color: 'white',
  marginTop: '20px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    backgroundColor: '#5d2eaa',
    transform: 'scale(1.1)',
  },
});

const Card = styled('div')({
  position: 'relative',
  width: '300px',
  margin: '10px',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const renderLeaves = () => {
  const leaves = [];
  for (let i = 0; i < 20; i++) {
    const size = `${Math.random() * 40 + 20}px`; // Increased size range
    const style = {
      left: `${Math.random() * 100}vw`,
      width: size,
      height: size,
      position: 'absolute',
      top: '-20px',
      pointerEvents: 'none',
      animation: `float ${Math.random() * 5 + 5}s linear ${Math.random() * 2}s infinite`,
      opacity: 0.8,
      background: `url(${leafImage}) no-repeat center/contain`,
    };
    leaves.push(<Box key={i} sx={style} />);
  }
  return leaves;
};

const Landing = () => {
  const items = [
    { title: 'Biryani', chef: 'Sanjeev Kapoor', rating: '4.4', image: biryani },
    { title: 'Burger', chef: 'Burger King', rating: '4.0', image: burger },
    { title: 'Pizza', chef: 'Dominos', rating: '4.1', image: pizza },
  ];

  return (
    <div>
      {/* Background Image Section */}
      <section style={{ textAlign: 'center', position: 'relative', color: 'orange' }}>
        <img src={mainCookImage} alt="Chefs cooking" style={{ width: '100%', height: '100vh', display: 'block' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textShadow: '2px 2px 4px #000000' }}>
          <Fade in={true} timeout={2500}>
            <Typography variant="h2">Good Cooks Know How</Typography>
          </Fade>
          <Fade in={true} timeout={2500} style={{ transitionDelay: '500ms' }}>
            <Typography variant="h2" style={{ color: '#b388ff' }}>Great Cooks Know Why</Typography>
          </Fade>
          <StyledButton
            component={Link}
            to="/Home"
            variant="contained"
            size="large"
            sx={{ borderRadius: '10px' }}
          >
            Get Started
          </StyledButton>
        </div>
        {renderLeaves()}
      </section>

      {/* Cards Section */}
      <section style={{ backgroundColor: 'rgb(255, 201, 100)', textAlign: 'center', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {items.map((item, index) => (
          <Card key={index}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px 0', position: 'absolute', top: '0', left: '0', width: '100%', textAlign: 'center', color: 'white' }}>
              <h5 style={{ margin: '0', fontWeight: 'bold' }}>{item.title}</h5>
              <p style={{ margin: '0', color: 'white' }}>{item.chef}</p>
            </div>
            <img src={item.image} alt={item.title} style={{ width: '100%', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', backgroundColor: 'green', color: 'white', padding: '5px 0', textAlign: 'center' }}>
              <b>Rating: {item.rating}</b>
            </div>
          </Card>
        ))}
      </section>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: '#000', color: '#fff', py: 4 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Follow us on:
        </Typography>
        <Grid container justifyContent="center" alignItems="center">
          <a href="https://www.facebook.com">
            <FacebookIcon sx={{ fontSize: 30, mr: 2 }} />
          </a>
          <a href="https://www.twitter.com">
            <TwitterIcon sx={{ fontSize: 30, mr: 2 }} />
          </a>
          <a href="https://www.instagram.com">
            <InstagramIcon sx={{ fontSize: 30 }} />
          </a>
        </Grid>
      </Box>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;

