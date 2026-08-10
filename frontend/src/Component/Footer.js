import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => (
  <footer className="rh-footer">
    <p className="rh-footer__title">Follow us on</p>
    <div className="rh-footer__social">
      <a href="https://www.facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
        <FacebookIcon sx={{ fontSize: 28 }} />
      </a>
      <a href="https://www.twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer">
        <TwitterIcon sx={{ fontSize: 28 }} />
      </a>
      <a href="https://www.instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
        <InstagramIcon sx={{ fontSize: 28 }} />
      </a>
    </div>
  </footer>
);

export default Footer;
