import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
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

const Home = () => {
  const { loggedIn, userType, token } = useSelector((state) => state.auth);
  const role = loggedIn ? userType || 'guest' : 'guest';

  const displayName = useMemo(() => {
    const authToken = token || localStorage.getItem('token');
    if (!authToken) return '';
    try {
      const decoded = jwtDecode(authToken);
      return decoded?.user?.fullName || '';
    } catch {
      return '';
    }
  }, [token]);

  const firstName = displayName.trim().split(/\s+/)[0] || '';

  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [activeTrend, setActiveTrend] = useState(1);
  const [paused, setPaused] = useState(false);
  const [trendingVisible, setTrendingVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);
  const welcomeRef = useRef(null);
  const trendingRef = useRef(null);
  const teamRef = useRef(null);

  const trending = useMemo(
    () => [
      {
        id: 1,
        title: 'Chicken Curry',
        image: rep1,
        blurb: 'Rich spices, tender chicken, and a sauce made for rice.',
        tag: 'Comfort',
      },
      {
        id: 2,
        title: 'Hyderabadi Biriyani',
        image: rep2,
        blurb: 'Layered rice, aromatic stock, and slow-cooked depth.',
        tag: 'Classic',
      },
      {
        id: 3,
        title: 'Pacific Veggie Pizza',
        image: rep3,
        blurb: 'Crisp crust with bright vegetables and balanced heat.',
        tag: 'Shareable',
      },
      {
        id: 4,
        title: 'Veg Burger',
        image: rep4,
        blurb: 'A hearty patty stacked with fresh toppings.',
        tag: 'Quick',
      },
      {
        id: 5,
        title: 'Spring Rolls',
        image: rep5,
        blurb: 'Crispy wraps filled with herbs and crunch.',
        tag: 'Starter',
      },
      {
        id: 6,
        title: 'Calcutta Biriyani',
        image: rep6,
        blurb: 'Subtle spice, potato, and fragrant basmati.',
        tag: 'Regional',
      },
    ],
    []
  );

  const experience = useMemo(() => {
    if (role === 'chef') {
      return {
        eyebrow: 'Chef desk',
        title: firstName ? `Welcome, ${firstName}!` : 'Welcome, Chef!',
        lead: 'Create dishes, refine your collection, and keep your kitchen board moving.',
        primary: { to: '/CreateRecipe', label: 'Create a recipe' },
        secondary: { to: '/ViewRecipes', label: 'My dishes' },
        cookLink: '/CreateRecipe',
        cookLabel: 'Craft something similar',
        welcomeTitle: 'Your recipes, your craft',
        welcomeBody:
          'Publish new plates, revisit what you have shared, and keep your cookbook sharp for the community.',
        welcomeCta: { to: '/UpdateRecipes', label: 'Manage recipes' },
        highlights: [
          { title: 'Create & publish', image: image2, to: '/CreateRecipe' },
          { title: 'Manage your board', image: image1, to: '/UpdateRecipes' },
          { title: 'Kitchen news', image: image3, to: '/ViewNews' },
        ],
      };
    }

    if (role === 'user') {
      return {
        eyebrow: 'Your kitchen',
        title: firstName ? `Welcome, ${firstName}!` : 'Welcome back!',
        lead: 'Browse chef recipes, save favourites, and cook with a list built around your taste.',
        primary: { to: '/RecipeList', label: 'Browse recipes' },
        secondary: { to: '/SavedRecipes', label: 'Favourites' },
        cookLink: '/RecipeList',
        cookLabel: 'Find this recipe',
        welcomeTitle: 'Cook with a list that remembers you',
        welcomeBody:
          'Explore the full recipe board, pin dishes you love, and jump back into favourites whenever hunger hits.',
        welcomeCta: { to: '/SavedRecipes', label: 'Open favourites' },
        highlights: [
          { title: 'Explore recipes', image: image2, to: '/RecipeList' },
          { title: 'Your saved list', image: image1, to: '/SavedRecipes' },
          { title: 'Hub news', image: image3, to: '/ViewNews' },
        ],
      };
    }

    if (role === 'admin') {
      return {
        eyebrow: 'Admin',
        title: firstName ? `Welcome, ${firstName}!` : 'Welcome, Admin!',
        lead: 'Review accounts, publish news, and keep Recipe Hub running smoothly.',
        primary: { to: '/AllPages', label: 'Manage content' },
        secondary: { to: '/News', label: 'Post news' },
        cookLink: '/AllPages',
        cookLabel: 'Open admin tools',
        welcomeTitle: 'Operations for the whole kitchen',
        welcomeBody:
          'Spot-check users and chefs, keep news fresh, and make sure the community stays tidy.',
        welcomeCta: { to: '/AllPages', label: 'Open manage' },
        highlights: [
          { title: 'Users & recipes', image: image1, to: '/AllPages' },
          { title: 'Publish news', image: image3, to: '/News' },
          { title: 'Community feed', image: image2, to: '/ViewNews' },
        ],
      };
    }

    return {
      eyebrow: 'Recipe Hub',
      title: 'Cook with intention.',
      lead: 'Discover chef-crafted recipes, save favourites, and find inspiration for every kitchen.',
      primary: { to: '/Login', label: 'Get started' },
      secondary: null,
      cookLink: '/Login',
      cookLabel: 'Cook this',
      welcomeTitle: 'Your place for culinary inspiration',
      welcomeBody:
        'Explore recipes from around the world, follow chefs, and cook with a community built for curiosity — from weeknight plates to weekend feasts.',
      welcomeCta: { to: '/About', label: 'Our story' },
      highlights: [
        { title: 'New recipes weekly', image: image2, to: '/Login' },
        { title: 'News & updates', image: image3, to: '/Login' },
        { title: 'Built for real kitchens', image: image1, to: '/About' },
      ],
    };
  }, [role, firstName]);

  useEffect(() => {
    const observe = (node, setter) => {
      if (!node) return () => {};
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
            observer.unobserve(node);
          }
        },
        { threshold: 0.18 }
      );
      observer.observe(node);
      return () => observer.unobserve(node);
    };

    const cleanWelcome = observe(welcomeRef.current, setWelcomeVisible);
    const cleanTrending = observe(trendingRef.current, setTrendingVisible);
    const cleanTeam = observe(teamRef.current, setTeamVisible);
    return () => {
      cleanWelcome();
      cleanTrending();
      cleanTeam();
    };
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => {
      setActiveTrend((current) => {
        const index = trending.findIndex((item) => item.id === current);
        const next = trending[(index + 1) % trending.length];
        return next.id;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [paused, trending]);

  const team = [
    { id: 1, name: 'Atharva A W', email: 'waranashiwar.a@northeastern.edu', image: pic3 },
    { id: 2, name: 'Anish K', email: 'kuila.a@northeastern.edu', image: pic1 },
    { id: 3, name: 'Steffi G M', email: 'lnu.ste@northeastern.edu', image: pic2 },
    { id: 4, name: 'Manikanta P K', email: 'kapalavai.m@northeastern.edu', image: pic4 },
  ];

  const selected = trending.find((item) => item.id === activeTrend) || trending[0];

  return (
    <div className={`hp hp--${role}`}>
      <section className="hp-hero" style={{ backgroundImage: `url(${image1})` }}>
        <div className="hp-hero__veil" />
        <div className="site-wrap">
          <div className="hp-hero__inner">
            <p className="eyebrow eyebrow--warm">{experience.eyebrow}</p>
            <h1>{experience.title}</h1>
            <p className="hp-hero__lead">{experience.lead}</p>
            <blockquote className="hp-hero__quote">
              <p>“Kitchens form incredibly strong characters.”</p>
              <cite>Gordon Ramsay</cite>
            </blockquote>
            <div className="hp-hero__actions">
              <Link to={experience.primary.to} className="rh-btn rh-btn--cta">
                {experience.primary.label}
              </Link>
              {experience.secondary && (
                <Link to={experience.secondary.to} className="rh-btn rh-btn--ghost">
                  {experience.secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="hp-highlights">
        <div className="site-wrap hp-highlights__grid">
          {experience.highlights.map((item) => (
            <Link key={item.title} to={item.to} className="hp-highlight">
              <img src={item.image} alt="" />
              <h3>{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section
        className={`hp-welcome ${welcomeVisible ? 'is-visible' : ''}`}
        ref={welcomeRef}
      >
        <div className="site-wrap hp-welcome__grid">
          <div className="hp-welcome__art">
            <img src={image4} alt="Cooking illustration" />
          </div>
          <div className="hp-welcome__copy">
            <p className="eyebrow eyebrow--coral">Welcome</p>
            <h2>{experience.welcomeTitle}</h2>
            <p>{experience.welcomeBody}</p>
            <Link to={experience.welcomeCta.to} className="rh-btn rh-btn--home">
              {experience.welcomeCta.label}
            </Link>
          </div>
        </div>
      </section>

      <section
        className={`hp-trending reveal ${trendingVisible ? 'is-visible' : ''}`}
        ref={trendingRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="site-wrap">
          <div className="section-head section-head--light hp-trending__head-row reveal-child">
            <div>
              <h2>Trending now</h2>
              <p>Click a dish to preview — auto-rotates until you interact</p>
            </div>
            <div className="hp-trending__dots" role="tablist" aria-label="Trending recipes">
              {trending.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTrend === item.id}
                  className={`hp-trending__dot ${activeTrend === item.id ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveTrend(item.id);
                    setPaused(true);
                  }}
                  aria-label={item.title}
                />
              ))}
            </div>
          </div>

          <div className="hp-trend-stage reveal-child" style={{ transitionDelay: '120ms' }}>
            <div className="hp-trend-feature">
              <img key={selected.id} src={selected.image} alt={selected.title} />
              <div className="hp-trend-feature__copy">
                <span className="hp-trend-feature__tag">{selected.tag}</span>
                <h3>{selected.title}</h3>
                <p>{selected.blurb}</p>
                <Link to={experience.cookLink} className="rh-btn rh-btn--ghost">
                  {experience.cookLabel}
                </Link>
              </div>
            </div>

            <div className="hp-trend-rail" role="list">
              {trending.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="listitem"
                  className={`hp-trend-thumb ${activeTrend === item.id ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveTrend(item.id);
                    setPaused(true);
                  }}
                  onFocus={() => setPaused(true)}
                >
                  <img src={item.image} alt="" />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`hp-team reveal ${teamVisible ? 'is-visible' : ''}`} ref={teamRef}>
        <div className="site-wrap">
          <div className="section-head reveal-child">
            <h2>Meet the team</h2>
            <p>The people behind Recipe Hub</p>
          </div>
          <div className="hp-team__row">
            {team.map((member, index) => (
              <div
                key={member.id}
                className="hp-team__person reveal-child"
                style={{ transitionDelay: `${100 + index * 80}ms` }}
              >
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p title={member.email}>{member.email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
