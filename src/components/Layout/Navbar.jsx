import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, Button, Tooltip } from 'antd';
import { MenuOutlined, CloseOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import CartIcon from '../Cart/CartIcon';
import CartDrawer from '../Cart/CartDrawer';
import restaurant from '../../config/restaurant';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/order', label: 'Order Online' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/reservations', label: 'Reservations' },
];

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);



  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-icon">🍽</span>
            <span className="navbar__logo-text">{restaurant.name}</span>
          </Link>

          <nav className="navbar__links">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`navbar__link${location.pathname === l.path ? ' navbar__link--active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="navbar__actions">
            <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
              <Button
                type="text"
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleTheme}
                className="theme-toggle"
              />
            </Tooltip>
            <CartIcon onClick={() => setCartOpen(true)} />
            <Button
              className="navbar__hamburger"
              type="text"
              icon={<MenuOutlined style={{ fontSize: 22 }} />}
              onClick={() => setMobileOpen(true)}
            />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <Drawer
        placement="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        width={280}
        closeIcon={<CloseOutlined />}
        className="mobile-nav-drawer"
        title={
          <span style={{ fontWeight: 700, fontSize: 18 }}>
            <span style={{ marginRight: 8 }}>🍽</span>{restaurant.name}
          </span>
        }
      >
        <nav className="mobile-nav">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`mobile-nav__link${location.pathname === l.path ? ' mobile-nav__link--active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Drawer>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
