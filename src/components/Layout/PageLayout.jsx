import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import AppFooter from './AppFooter';
import './PageLayout.css';

export default function PageLayout({ children, isDarkMode, toggleTheme }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="page-layout">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="page-layout__main">{children}</main>
      <AppFooter />
    </div>
  );
}
