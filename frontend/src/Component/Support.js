import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import supimg from '../images/masterpiece.jpg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });

  useEffect(() => {
    document.body.style.backgroundColor = '#80deea';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/email/send', {
        recipientEmail: 'cyberzerox27@gmail.com',
        subject: 'Contact Us Form Submission',
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nDescription: ${formData.description}`
      });
      console.log('Email sent successfully!');
      setFormData({
        name: '',
        email: '',
        description: '',
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20, borderRadius: 15 }}>
            <Typography variant="poster" component="h2" align="center" gutterBottom>
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<EmailIcon />}
                style={{ marginTop: 20, backgroundColor: 'green', transition: 'background-color 0.3s, transform 0.3s', transform: 'scale(1.1)', '&:hover': { backgroundColor: 'darkgreen', transform: 'scale(1.1)' } }}
              >
                Send
              </Button>
            </form>
          </Paper>
        </Grid>
        
        {/* Image */}
        <Grid item xs={12} md={6}>
          <img src={supimg} alt="Support" style={{ width: '100%', maxHeight: '63vh', borderRadius: 15 }} />
        </Grid>
        
        {/* Call Me Box */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20, borderRadius: 15 }}>
            <Typography variant="poster" component="h2" align="center" gutterBottom>
              Call
            </Typography>
            <Typography variant="body1" align="center">
              Phone Number: +(617)765-4321 {/* Replace with a random phone number */}
            </Typography>
          </Paper>
        </Grid>
        
        {/* FAQ */}
        <Grid item xs={12}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="poster" component="h2" align="center" gutterBottom>
              FAQ
            </Typography>
            <Accordion style={{ marginBottom: 20, backgroundColor: '#00acc1', color: 'white' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">Why choose us?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  Choose Recipe Hub for its diverse, quality recipes, user-friendly interface, and vibrant community. With personalized experiences and constant 
                  updates, Recipe Hub is your ultimate destination for culinary exploration.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: '#00acc1', color: 'white' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography variant="h6">How do I get started?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                    Getting started with Recipe Hub is effortless. Simply sign up, explore our diverse collection of recipes, and save your favorites for later. 
                    You can even contribute your own recipes and engage with a vibrant community of food enthusiasts. Choose Recipe Hub for its user-friendly interface, 
                    quality recipes, and personalized experience. With constant updates and a commitment to culinary excellence, Recipe Hub is your go-to destination for 
                    all things food.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Support;
