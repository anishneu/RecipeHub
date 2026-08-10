import { Fade } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import currybg from '../images/currybg.jpg';
import kitchen from '../images/kitchen.png';
import cookart from '../images/cookart.png';

const Admin = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#c5e1a5';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="rh-page rh-page--admin">
      <div className="rh-page__inner rh-hub">
        <Fade in timeout={900}>
          <div className="rh-hub__hero">
            <div>
              <h1 className="rh-hub__title" style={{ color: '#33691e' }}>
                Admin dashboard
              </h1>
              <p className="rh-hub__lead">
                Manage users and recipes, and publish news for the Recipe Hub community.
              </p>
              <Link to="/AllPages" className="rh-btn rh-btn--admin">
                Open manage panel
              </Link>
            </div>
            <img
              src={currybg}
              alt="Kitchen atmosphere"
              style={{ width: '100%', borderRadius: '14px', boxShadow: '0 8px 28px rgba(0,0,0,0.08)', maxHeight: 320, objectFit: 'cover' }}
            />
          </div>
        </Fade>

        <div className="rh-hub__actions">
          <Link to="/AllPages" className="rh-hub-card">
            <img src={kitchen} alt="Manage pages" />
            <div className="rh-hub-card__overlay">
              <p className="rh-hub-card__label">Manage</p>
              <p className="rh-hub-card__hint">Users, recipes, and roles</p>
            </div>
          </Link>
          <Link to="/News" className="rh-hub-card">
            <img src={cookart} alt="News" />
            <div className="rh-hub-card__overlay">
              <p className="rh-hub-card__label">News</p>
              <p className="rh-hub-card__hint">Post updates and events</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
