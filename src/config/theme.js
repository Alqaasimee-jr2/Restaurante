import { theme as antdTheme } from 'antd';

// Common tokens for both themes
export const commonTokens = {
  colorPrimary: '#D4A017',      // warm gold
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#f5222d',
  colorInfo: '#D4A017',
  borderRadius: 10,
  fontFamily: "'Inter', 'Segoe UI', sans-serif",
  fontSize: 15,
};

// Ant Design theme configurations
const themeConfig = (isDarkMode) => ({
  algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  token: {
    ...commonTokens,
    colorBgContainer: isDarkMode ? '#1a1a2e' : '#ffffff',
    colorText: isDarkMode ? '#f4f4f8' : '#1a1a2e',
    colorTextSecondary: isDarkMode ? '#aaa' : '#555770',
  },
  components: {
    Button: {
      controlHeight: 44,
      borderRadius: 10,
    },
    Card: {
      borderRadiusLG: 14,
    },
    Menu: {
      itemColor: isDarkMode ? '#f4f4f8' : '#1a1a2e',
      itemHoverColor: '#D4A017',
      itemSelectedColor: '#D4A017',
    },
  },
});

export const colors = {
  gold: '#D4A017',
  goldLight: '#f5e6b8',
  dark: '#1a1a2e',
  darkSoft: '#16213e',
  cream: '#faf7f0',
  grey: '#f4f4f8',
  textPrimary: '#1a1a2e',
  textSecondary: '#555770',
  white: '#ffffff',
  accent: '#e74c3c',
};

export default themeConfig;
