import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import supimg from '../images/support.webp';
import food from '../images/food.webp';
import API_BASE from '../api';

const Support = () => {
  const [formData, setFormData] = useState({ name: '', email: '', description: '' });

  useEffect(() => {
    document.body.style.backgroundColor = '#9fa8da';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/email/send`, {
        recipientEmail: 'cyberzerox27@gmail.com',
        subject: 'Recipe Hub - Contact Us',
        text: `Hello Recipe Hub Team,\nBelow is a message sent by ${formData.name} with email id - ${formData.email}\n\n**${formData.description}**`,
      });
      setFormData({ name: '', email: '', description: '' });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="rh-page rh-page--support">
      <div className="rh-page__inner">
        <h1 className="rh-section-title" style={{ color: '#283593' }}>Support</h1>
        <p className="rh-section-sub" style={{ color: 'rgba(0,0,0,0.65)' }}>
          Reach the team or browse quick answers
        </p>

        <div className="rh-support-grid">
          <div className="rh-auth-card" style={{ maxWidth: 'none' }}>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.6rem', margin: '0 0 1rem', textAlign: 'center' }}>
              Contact us
            </h2>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
              <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
              <TextField fullWidth label="Description" name="description" multiline rows={4} value={formData.description} onChange={handleChange} margin="normal" required sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
              <Button
                type="submit"
                variant="contained"
                startIcon={<EmailIcon />}
                sx={{
                  mt: 2,
                  backgroundColor: 'green',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 2.5,
                  '&:hover': { backgroundColor: 'darkgreen' },
                }}
              >
                Send message
              </Button>
            </form>
          </div>

          <div className="rh-support-media">
            <img src={supimg} alt="Support" />
            <img src={food} alt="Food" />
            <div className="rh-auth-card" style={{ maxWidth: 'none', padding: '1.25rem' }}>
              <Typography sx={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.2rem', mb: 0.5 }}>Call</Typography>
              <Typography color="text.secondary">+(617) 765-4321</Typography>
            </div>
          </div>
        </div>

        <div className="rh-auth-card" style={{ maxWidth: 'none', marginTop: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.6rem', margin: '0 0 1rem', textAlign: 'center' }}>
            FAQ
          </h2>
          <Accordion sx={{ backgroundColor: '#009688', color: 'white', borderRadius: '8px !important', mb: 1.5, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
              <Typography fontWeight={600}>Why choose us?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Choose Recipe Hub for diverse, quality recipes, a clear interface, and a vibrant community —
                with personalized experiences and continuous updates.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ backgroundColor: '#009688', color: 'white', borderRadius: '8px !important', '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
              <Typography fontWeight={600}>How do I get started?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Sign up, explore recipes, save favourites, and contribute your own dishes. Recipe Hub is built
                to make culinary exploration simple from day one.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Support;
