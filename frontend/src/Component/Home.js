import React, { useEffect, useState, useRef } from 'react';
import { Typography, Grid, Box, Card, CardContent, Avatar } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import image1 from '../images/kitchen.png'; 
import image2 from '../images/currybg.jpg'; 
import image3 from '../images/genshin.jpg'; 
import image4 from '../images/cookart.png';
import rep1 from '../images/chicken_curry.jpg'; 
import rep2 from '../images/biriyani.jpg';  
import rep3 from '../images/pizza.avif'; 
import rep4 from '../images/burger.avif'; 
import rep5 from '../images/spring_rolls.jpg'; 
import rep6 from '../images/biriyani.jpg'; 
import pic1 from '../images/souma.jpg'; 
import pic2 from '../images/girl.avif'; 
import pic3 from '../images/chefl.webp'; 
import pic4 from '../images/sanji.webp'; 
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';

SwiperCore.use([Autoplay]); // Enable Swiper Autoplay

const Home = () => {
  const [isSectionInView, setIsSectionInView] = useState(false);
  const sectionRef = useRef(null);
  const [fadeInText, setFadeInText] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionInView(true);
          setTimeout(() => {
            setFadeInText(true);
          }, 1000); // Delay the text fade-in by 1000 milliseconds (1 second)
          observer.unobserve(sectionRef.current); // Remove the observer after fading once
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Change this value as needed
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  
  // Sample data for carousel
  const carouselItems = [
    { id: 1, image: image1, caption: '"Kitchens are hard environments and they form incredibly strong characters." - Gordon Ramsay' },
    { id: 2, image: image2, caption: 'New recipes added...' },
    { id: 3, image: image3, caption: 'Maintainence update: *Read patch note*' },
  ];

  // Sample data for trending recipes
  const trendingRecipes = [
    { id: 1, title: 'Chicken Curry', image: rep1 },
    { id: 2, title: 'Hyderabadi Biriyani', image: rep2 },
    { id: 3, title: 'Pacific Veggie Pizza', image: rep3 },
    { id: 4, title: 'Veg Burger', image: rep4 },
    { id: 5, title: 'Spring Rolls', image: rep5 },
    { id: 6, title: 'Calcutta Biriyani', image: rep6 },
  ];

  // Sample data for team members
  const teamMembers = [
    { id: 1, name: 'Atharva A W', email: 'waranashiwar.a@northeastern.edu', image: pic3 },
    { id: 2, name: 'Anish K', email: 'kuila.a@northeastern.edu', image: pic1 },
    { id: 3, name: 'Steffi G M', email: 'lnu.ste@northeastern.edu', image: pic2 },
    { id: 4, name: 'Manikanta P K', email: 'kapalavai.m@northeastern.edu', image: pic4 },
  ];

  return (
    <>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Section 1: Carousel */}
        <Grid item xs={12}>
          <Carousel>
            {carouselItems.map(item => (
              <Carousel.Item key={item.id}>
                <img style={{ height: '80vh' }} className="d-block w-100" src={item.image} alt={`Slide ${item.id}`} />
                <Carousel.Caption>
                  <h3>{item.caption}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Grid>

        {/* Section 2: Welcoming text */}
        <Grid item xs={12} ref={sectionRef} sx={{ backgroundColor: 'white', color: 'red', py: 4 }}>
          <Grid container justifyContent="center" alignItems="center">
            {/* Image box on the left */}
            <Grid item xs={12} sm={6} md={3} style={{ height: '100%', opacity: isSectionInView ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
              <img src={image4} alt="Image" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
            </Grid>
            {/* Text on the right */}
            <Grid item xs={12} sm={6} md={8} style={{ height: '100%', opacity: fadeInText ? 1 : 0, transition: 'opacity 2s ease-in-out' }}>
              <Typography
                variant="h2"
                gutterBottom
                fontWeight="bold"
                textAlign="center"
                sx={{
                  fontSize: '4rem',
                  color: '#e57373',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Welcome to Recipe Hub!
              </Typography>
              <Typography
                variant="subtitle1" // Adjust the variant and style as needed
                gutterBottom
                textAlign="center"
                sx={{
                  fontSize: '1.5rem',
                  color: '#555', // Change the color if needed
                }}
              >
                Your ultimate destination for culinary inspiration.
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Section 3: Trending recipes */}
        <Grid item xs={12} sx={{ backgroundColor: '#e57373', pb: 5 }}>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            textAlign="left"
            sx={{
              fontSize: '2rem',
              mt: 5,
              mb: 5,
              ml: 7,
              mr: 7,
              pl: 1,
              color: 'white',
              backgroundColor: '#ffab40',
            }}
          >
            Trending Recipes
          </Typography>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            slidesPerGroup={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loop={true}
            autoplay={{ delay: 1000, disableOnInteraction: false }} // Add autoplay settings
          >
            {trendingRecipes.map(recipe => (
              <SwiperSlide key={recipe.id} sx={{ mr: 2, ml: 2 }}>
                <Grid container justifyContent="center">
                  <Grid item xs={10} sm={6} sx={{ position: 'relative', overflow: 'hidden' }}>
                    <img src={recipe.image} alt={recipe.title} style={{ width: '100%', borderRadius: '20px', height: 'auto' }} />
                    <div style={{ position: 'absolute', borderRadius: '0px 0px 20px 20px', bottom: 0, left: 0, width: '100%', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '8px', textAlign: 'center' }}>
                      <Typography variant="h6" fontWeight="bold">
                        {recipe.title}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        {/* Section 4: Meet Our Team */}
        <Grid item xs={12} sx={{ backgroundColor: '#ef9a9a', py: 10 }}>
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            textAlign="center"
            sx={{
              fontSize: '2.5rem',
              mb: 5,
              mt: 3,
              color: '#c62828',
            }}
          >
            Meet Our Team
          </Typography>
          <Grid container justifyContent="center" spacing={4}>
            {teamMembers.map(member => (
              <Grid item key={member.id}>
                <Card
                  sx={{
                    width: 345,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '30px',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardContent style={{ backgroundColor: '#bdbdbd', flex: '1 0 auto' }}>
                    <Avatar alt={member.name} src={member.image} sx={{ width: 200, height: 200, margin: 'auto' }} />
                  </CardContent>
                  <CardContent style={{ textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>{member.name}</Typography>
                    <Typography variant="body1">{member.email}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Footer */}
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
    </>
  );
};

export default Home;
