import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import foodHero from '../images/food.webp';

const AboutPage = () => {
  const { loggedIn } = useSelector((state) => state.auth);

  return (
    <div className="about">
      <section className="about-hero">
        <div className="about-hero__media" style={{ backgroundImage: `url(${foodHero})` }} />
        <div className="about-hero__veil" />
        <div className="site-wrap about-hero__content">
          <p className="eyebrow" style={{ color: '#ffab40' }}>Our story</p>
          <h1>About Recipe Hub</h1>
          <p>
            A home for cooks who care about craft — discover recipes, follow chefs,
            and share plates worth making again.
          </p>
        </div>
      </section>

      <section className="about-main">
        <div className="site-wrap about-main__panel">
          <div className="about-main__intro">
            <h2>Built for every kitchen</h2>
            <p>
              Recipe Hub is the culinary companion for discovering recipes that spark creativity.
              With dishes spanning cuisines from around the globe, it caters to every palate and
              dietary preference — whether you are a seasoned chef or just getting started.
            </p>
            <p>
              From quick weekday dinners to weekend feasts, Recipe Hub helps you explore,
              experiment, and share. Detailed instructions, practical tips, and real food
              photography make every recipe a journey worth cooking.
            </p>
          </div>

          <div className="about-points">
            <div className="about-point">
              <h3>Discover</h3>
              <p>Browse recipes across cuisines and find dishes that match your taste.</p>
            </div>
            <div className="about-point">
              <h3>Create</h3>
              <p>Chefs can publish recipes with images, ingredients, and clear steps.</p>
            </div>
            <div className="about-point">
              <h3>Share</h3>
              <p>Save favourites, follow updates, and cook with a growing community.</p>
            </div>
          </div>

          <div className="about-main__actions">
            <Link to="/Home" className="rh-btn rh-btn--home">
              Back to Home
            </Link>
            {!loggedIn && (
              <Link to="/Register" className="rh-btn about-main__join">
                Join the hub
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
