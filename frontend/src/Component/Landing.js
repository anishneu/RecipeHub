import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import biryani from '../images/biriyani.jpg';
import burger from '../images/burger.avif';
import pizza from '../images/pizza.avif';
import chicken from '../images/chicken_curry.jpg';
import springRolls from '../images/spring_rolls.jpg';
import pasta from '../images/pasta.avif';
import cake from '../images/cake.avif';
import leafImage from '../images/maple.png';
import Footer from './Footer';

const COOKING_VIDEO = `${process.env.PUBLIC_URL}/videos/cooking.mp4`;

const dishes = [
  {
    id: 1,
    title: 'Biryani',
    chef: 'Sanjeev Kapoor',
    rating: '4.4',
    blurb: 'Layered rice, warm spice, and festival-level aroma.',
    image: biryani,
  },
  {
    id: 2,
    title: 'Burger',
    chef: 'Burger King',
    rating: '4.0',
    blurb: 'Stacked, juicy, and built for a satisfying bite.',
    image: burger,
  },
  {
    id: 3,
    title: 'Pizza',
    chef: 'Dominos',
    rating: '4.1',
    blurb: 'Crisp edges, melted cheese, and crowd-ready slices.',
    image: pizza,
  },
  {
    id: 4,
    title: 'Chicken Curry',
    chef: 'House Kitchen',
    rating: '4.6',
    blurb: 'Slow-simmered sauce with tender chicken and depth.',
    image: chicken,
  },
  {
    id: 5,
    title: 'Spring Rolls',
    chef: 'Street Table',
    rating: '4.3',
    blurb: 'Crispy wraps filled with herbs and crunch.',
    image: springRolls,
  },
  {
    id: 6,
    title: 'Pasta',
    chef: 'Nonna Desk',
    rating: '4.5',
    blurb: 'Silky noodles finished with a bright, rich sauce.',
    image: pasta,
  },
  {
    id: 7,
    title: 'Cake',
    chef: 'Bake Lab',
    rating: '4.7',
    blurb: 'Soft crumb, sweet finish — celebration ready.',
    image: cake,
  },
];

const Landing = () => {
  const videoRef = useRef(null);
  const trackRef = useRef(null);
  const menuSectionRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const userType = useSelector((state) => state.auth.userType);

  const dishPath = !isLoggedIn
    ? '/Login'
    : userType === 'user'
      ? '/RecipeList'
      : userType === 'chef'
        ? '/ViewRecipes'
        : '/Home';

  const leaves = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        key: i,
        left: `${12 + ((i * 11) % 76)}vw`,
        size: 14 + (i % 4) * 4,
        duration: 9 + (i % 3),
        delay: i * 0.55,
      })),
    []
  );

  const updateScrollState = () => {
    const node = trackRef.current;
    if (!node) return;
    const maxScroll = node.scrollWidth - node.clientWidth;
    setCanScrollPrev(node.scrollLeft > 4);
    setCanScrollNext(node.scrollLeft < maxScroll - 4);
  };

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return undefined;
    updateScrollState();
    node.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      node.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const tryPlay = async () => {
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        await video.play();
        setVideoReady(true);
      } catch (err) {
        // Autoplay can fail until interaction; keep retrying briefly.
        setTimeout(() => {
          video.play().then(() => setVideoReady(true)).catch(() => {});
        }, 300);
      }
    };

    const onCanPlay = () => {
      setVideoReady(true);
      tryPlay();
    };

    video.addEventListener('canplay', onCanPlay);
    video.load();
    tryPlay();

    return () => video.removeEventListener('canplay', onCanPlay);
  }, []);

  useEffect(() => {
    const node = menuSectionRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMenuVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.18 }
    );
    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  const scrollMenu = (direction) => {
    const node = trackRef.current;
    if (!node) return;
    const amount = Math.min(360, node.clientWidth * 0.75);
    node.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  const Chevron = ({ direction }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M15 5L8 12L15 19' : 'M9 5L16 12L9 19'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="lp">
      <header className={`lp-hero ${videoReady ? 'is-video-ready' : ''}`}>
        <video
          ref={videoRef}
          className="lp-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={COOKING_VIDEO} type="video/mp4" />
        </video>
        <div className="lp-hero__veil" />
        {leaves.map((leaf) => (
          <span
            key={leaf.key}
            className="rh-leaf"
            style={{
              left: leaf.left,
              width: leaf.size,
              height: leaf.size,
              backgroundImage: `url(${leafImage})`,
              animationDuration: `${leaf.duration}s`,
              animationDelay: `${leaf.delay}s`,
              opacity: 0.55,
            }}
          />
        ))}
        <div className="lp-hero__inner">
          <p className="lp-hero__eyebrow">Culinary community</p>
          <h1 className="lp-hero__brand">Recipe Hub</h1>
          <p className="lp-hero__tagline">
            Good cooks know how. <span>Great cooks know why.</span>
          </p>
          <div className="lp-hero__ctas">
            <Link to="/Login" className="rh-btn rh-btn--ghost">
              Sign in
            </Link>
          </div>
        </div>

        <Link to="/Home" className="lp-explore" aria-label="Explore Recipe Hub">
          Explore
          <span className="lp-explore__arrow" aria-hidden="true">→</span>
        </Link>
      </header>

      <section
        className={`lp-featured reveal ${menuVisible ? 'is-visible' : ''}`}
        ref={menuSectionRef}
      >
        <div className="site-wrap">
          <div className="lp-featured__top reveal-child">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <h2>On the menu</h2>
              <p>Slide through the collection — hover for a closer look.</p>
            </div>
          </div>

          <div className="lp-menu-shell reveal-child">
            <button
              type="button"
              className={`lp-menu-nav__btn lp-menu-nav__btn--prev ${canScrollPrev ? '' : 'is-disabled'}`}
              onClick={() => scrollMenu(-1)}
              aria-label="Previous dishes"
              disabled={!canScrollPrev}
            >
              <Chevron direction="left" />
            </button>

            <div className="lp-menu-track" ref={trackRef}>
              {dishes.map((dish, index) => (
                <article
                  key={dish.id}
                  className="lp-dish reveal-child"
                  style={{ transitionDelay: `${100 + index * 60}ms` }}
                >
                  <img src={dish.image} alt={dish.title} />
                  <div className="lp-dish__shade" />
                  <div className="lp-dish__body">
                    <div className="lp-dish__top">
                      <span>{dish.rating}</span>
                      <p>{dish.chef}</p>
                    </div>
                    <h3>{dish.title}</h3>
                    <div className="lp-dish__more">
                      <p>{dish.blurb}</p>
                      <Link to={dishPath}>View dish</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className={`lp-menu-nav__btn lp-menu-nav__btn--next ${canScrollNext ? '' : 'is-disabled'}`}
              onClick={() => scrollMenu(1)}
              aria-label="Next dishes"
              disabled={!canScrollNext}
            >
              <Chevron direction="right" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
