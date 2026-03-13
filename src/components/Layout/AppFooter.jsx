import { Link } from 'react-router-dom';
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import restaurant from '../../config/restaurant';
import './AppFooter.css';

export default function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <h3 className="footer__logo">
            <span>🍽</span> {restaurant.name}
          </h3>
          <p className="footer__tagline">{restaurant.tagline}</p>
        </div>

        <div className="footer__links">
          <h4>Quick Links</h4>
          <Link to="/menu">Menu</Link>
          <Link to="/order">Order Online</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/reservations">Reservations</Link>
        </div>

        <div className="footer__contact">
          <h4>Contact</h4>
          <p><EnvironmentOutlined /> {restaurant.address}</p>
          <p><PhoneOutlined /> {restaurant.phone}</p>
          <p><MailOutlined /> {restaurant.email}</p>
        </div>

        <div className="footer__social">
          <h4>Follow Us</h4>
          <div className="footer__social-icons">
            <a href={restaurant.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramOutlined />
            </a>
            <a href={restaurant.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookOutlined />
            </a>
            <a href={restaurant.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
              <TwitterOutlined />
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>{restaurant.copyright}</p>
      </div>
    </footer>
  );
}
