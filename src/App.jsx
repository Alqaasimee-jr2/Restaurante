import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import themeConfig from './config/theme';
import { CartProvider } from './components/Cart/CartContext';
import PageLayout from './components/Layout/PageLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import OrderOnline from './pages/OrderOnline';
import About from './pages/About';
import Contact from './pages/Contact';
import Reservations from './pages/Reservations';
import './styles/global.css';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ConfigProvider theme={themeConfig(isDarkMode)}>
      <CartProvider>
        <BrowserRouter>
          <PageLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/order" element={<OrderOnline />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reservations" element={<Reservations />} />
            </Routes>
          </PageLayout>
        </BrowserRouter>
      </CartProvider>
    </ConfigProvider>
  );
}
