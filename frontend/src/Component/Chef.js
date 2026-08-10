import { Fade } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import kitchen from '../images/kitchen.png';
import curry from '../images/chicken_curry.jpg';
import biryani from '../images/biriyani.jpg';
import springRolls from '../images/spring_rolls.jpg';

const Chef = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#b39ddb';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="rh-page rh-page--chef">
      <div className="rh-page__inner rh-hub">
        <Fade in timeout={900}>
          <div className="rh-hub__hero">
            <div>
              <h1 className="rh-hub__title" style={{ color: '#673ab7' }}>
                Chef workspace
              </h1>
              <p className="rh-hub__lead">
                Create new dishes, review your collection, and keep recipes up to date.
              </p>
              <Link to="/CreateRecipe" className="rh-btn rh-btn--chef">
                Create a recipe
              </Link>
            </div>
            <img
              src={kitchen}
              alt="Kitchen"
              style={{ width: '100%', borderRadius: '14px', boxShadow: '0 8px 28px rgba(0,0,0,0.08)', maxHeight: 320, objectFit: 'cover' }}
            />
          </div>
        </Fade>

        <div className="rh-hub__actions">
          <Link to="/CreateRecipe" className="rh-hub-card">
            <img src={curry} alt="Create recipe" />
            <div className="rh-hub-card__overlay">
              <p className="rh-hub-card__label">Create</p>
              <p className="rh-hub-card__hint">Share a new recipe</p>
            </div>
          </Link>
          <Link to="/ViewRecipes" className="rh-hub-card">
            <img src={biryani} alt="View recipes" />
            <div className="rh-hub-card__overlay">
              <p className="rh-hub-card__label">View</p>
              <p className="rh-hub-card__hint">See your published dishes</p>
            </div>
          </Link>
          <Link to="/UpdateRecipes" className="rh-hub-card">
            <img src={springRolls} alt="Manage recipes" />
            <div className="rh-hub-card__overlay">
              <p className="rh-hub-card__label">Manage</p>
              <p className="rh-hub-card__hint">Edit or remove recipes</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Chef;
