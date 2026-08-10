import { Fade } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import cookart from '../images/cookart.png';
import pizza from '../images/pizza.avif';
import burger from '../images/burger.avif';

const User = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#ffb74d';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="rh-page rh-page--user">
      <div className="rh-page__inner rh-hub">
        <Fade in timeout={900}>
          <div className="rh-hub__hero">
            <div>
              <h1 className="rh-hub__title" style={{ color: '#ef6c00' }}>
                Welcome back
              </h1>
              <p className="rh-hub__lead">
                Browse fresh recipes, save your favourites, and cook with confidence.
              </p>
              <Link to="/RecipeList" className="rh-btn rh-btn--user">
                Browse recipes
              </Link>
            </div>
            <img
              src={cookart}
              alt="Cooking"
              style={{ width: '100%', borderRadius: '14px', boxShadow: '0 8px 28px rgba(0,0,0,0.08)' }}
            />
          </div>
        </Fade>

        <div className="rh-hub__actions">
          <Link to="/RecipeList" className="rh-hub-card">
            <img src={pizza} alt="Recipes" />
            <div className="rh-hub-card__overlay">
              <p className="rh-hub-card__label">Recipe list</p>
              <p className="rh-hub-card__hint">Search and filter dishes</p>
            </div>
          </Link>
          <Link to="/SavedRecipes" className="rh-hub-card">
            <img src={burger} alt="Saved recipes" />
            <div className="rh-hub-card__overlay">
              <p className="rh-hub-card__label">Saved recipes</p>
              <p className="rh-hub-card__hint">Your favourites, ready to cook</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
