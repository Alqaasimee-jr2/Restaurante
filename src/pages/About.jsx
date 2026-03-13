import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import restaurant from '../config/restaurant';
import './About.css';

const team = [
  {
    name: 'Chef Adaeze Okonkwo',
    role: 'Head Chef — Nigerian Cuisine',
    bio: 'Trained in Lagos & London, Chef Adaeze brings 15 years of mastery in traditional Nigerian dishes, reimagined with contemporary flair.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80',
  },
  {
    name: 'Chef Marco Bellini',
    role: 'Head Chef — Continental',
    bio: 'With a Michelin-star background from Milan, Marco brings exquisite technique and plating artistry to our continental offerings.',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80',
  },
  {
    name: 'Salome Abiodun',
    role: 'Restaurant Manager',
    bio: 'Salome ensures every guest feels at home, orchestrating seamless dining experiences with warmth and precision.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
];

export default function About() {
  return (
    <div className="about">
      {/* Hero */}
      <section className="about__hero">
        <div className="about__hero-overlay" />
        <div className="about__hero-content">
          <h1>About {restaurant.name}</h1>
          <p>{restaurant.tagline}</p>
        </div>
      </section>

      {/* Concept */}
      <section className="about__section">
        <div className="about__inner">
          <div className="about__concept">
            <div className="about__concept-text">
              <h2>Our Concept</h2>
              <p>
                At {restaurant.name}, we believe great food transcends borders. Our menu is a 
                bold conversation between the smoky, vibrant soul of Nigerian cooking and the 
                refined elegance of continental technique.
              </p>
              <p>
                From hand-pounded yam served alongside béarnaise-drizzled steak, to our 
                signature Zobo Sangria that bridges two continents in a single glass — every 
                detail is designed to surprise, delight, and connect.
              </p>
              <p>
                We source locally wherever possible, partnering with Nigerian farms for our 
                produce and importing specialty ingredients to maintain authenticity on both 
                sides of the menu.
              </p>
            </div>
            <div className="about__concept-img">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
                alt="Restaurant ambience"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about__section about__section--alt">
        <div className="about__inner">
          <h2 className="about__section-title">Meet Our Team</h2>
          <p className="about__section-subtitle">
            The passionate people behind every plate
          </p>
          <div className="about__team">
            {team.map((person) => (
              <div key={person.name} className="team-card">
                <div className="team-card__img">
                  <img src={person.image} alt={person.name} loading="lazy" />
                </div>
                <div className="team-card__info">
                  <h3>{person.name}</h3>
                  <span className="team-card__role">{person.role}</span>
                  <p>{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about__section about__cta">
        <div className="about__inner" style={{ textAlign: 'center' }}>
          <h2>Ready to taste the difference?</h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
            <Link to="/menu">
              <Button type="primary" size="large">View Our Menu <ArrowRightOutlined /></Button>
            </Link>
            <Link to="/reservations">
              <Button size="large">Make a Reservation</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
