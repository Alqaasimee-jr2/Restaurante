import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Tag } from 'antd';
import { ArrowRightOutlined, FireOutlined } from '@ant-design/icons';
import DishCard from '../components/Dishes/DishCard';
import dishes from '../data/dishes';
import restaurant from '../config/restaurant';
import './Home.css';

const featured = dishes.filter((d) => d.featured);
const popular = dishes.filter((d) => d.popular).slice(0, 6);
const todaysSpecials = dishes.filter((d) => d.featured).slice(0, 3);

const ROTATING_WORDS = ['Fine Dining', 'Authentic Soul', 'Modern Craft', 'True Excellence'];

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (p) => `₦${p.toLocaleString()}`;

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg-zoom" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <Tag color="#D4A017" className="hero__tag">{restaurant.tagline}</Tag>
          <h1 className="hero__title">
            Where Bold Flavours<br />
            Meet <span className="hero__rotating-word" key={ROTATING_WORDS[wordIndex]}>
              {ROTATING_WORDS[wordIndex]}
            </span>
          </h1>
          <p className="hero__subtitle">
            Experience the best of Nigerian and continental cuisine, crafted with passion
            and served with love in the heart of Lagos.
          </p>
          <div className="hero__cta">
            <Link to="/menu">
              <Button type="primary" size="large" className="hero__btn">
                View Menu
              </Button>
            </Link>
            <Link to="/order">
              <Button size="large" className="hero__btn hero__btn--outline">
                Order Online <ArrowRightOutlined />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Today's Specials ── */}
      <section className="section specials">
        <div className="section__inner">
          <div className="section__header">
            <FireOutlined className="section__icon" />
            <h2 className="section__title">Today's Specials</h2>
          </div>
          <div className="specials__grid">
            {todaysSpecials.map((dish) => (
              <div key={dish.id} className="special-card">
                <img src={dish.image} alt={dish.name} className="special-card__img" />
                <div className="special-card__info">
                  <h4>{dish.name}</h4>
                  <p>{dish.shortDescription}</p>
                  <span className="special-card__price">
                    From {formatPrice(dish.sizes[0].price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Dishes (horizontal scroll) ── */}
      <section className="section featured">
        <div className="section__inner">
          <h2 className="section__title">Featured Dishes</h2>
          <p className="section__subtitle">Chef-curated selections you shouldn't miss</p>
          <div className="featured__scroll">
            {featured.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Most Popular ── */}
      <section className="section popular">
        <div className="section__inner">
          <h2 className="section__title">Most Popular</h2>
          <p className="section__subtitle">What our guests order again and again</p>
          <div className="popular__grid">
            {popular.map((dish) => (
              <div key={dish.id} className="popular-card">
                <div className="popular-card__img">
                  <img src={dish.image} alt={dish.name} loading="lazy" />
                </div>
                <div className="popular-card__info">
                  <Tag color={dish.cuisineType === 'Nigerian' ? '#2db7f5' : '#87d068'} style={{ fontSize: 11 }}>
                    {dish.cuisineType}
                  </Tag>
                  <h3>{dish.name}</h3>
                  <p>{dish.shortDescription}</p>
                  <span className="popular-card__price">
                    From {formatPrice(dish.sizes[0].price)}
                  </span>
                  <Link to="/order" className="popular-card__link">
                    Order Now <ArrowRightOutlined />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story Block ── */}
      <section className="section story">
        <div className="section__inner story__inner">
          <div className="story__text">
            <h2>Our Story</h2>
            <p>
              {restaurant.name} was born from a simple idea: what happens when you pair the smoky, 
              rich depth of Nigerian cuisine with the refined techniques of continental cooking?
            </p>
            <p>
              The result is a menu that surprises and delights — from our signature Jollof Rice Royale
              to slow-cooked tenderloin steaks with a West African spice rub. Every dish is a
              conversation between two culinary worlds.
            </p>
            <Link to="/about">
              <Button type="link" size="large" style={{ paddingLeft: 0, fontWeight: 600 }}>
                Read More About Us <ArrowRightOutlined />
              </Button>
            </Link>
          </div>
          <div className="story__img">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
              alt="Restaurant interior"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
