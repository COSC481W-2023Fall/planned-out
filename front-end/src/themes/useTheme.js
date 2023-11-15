import { useEffect, useState } from 'react';
import { setToLS, getFromLS } from '../utils/storage';

export const useTheme = () => {
  const [theme, setTheme] = useState({
    "id": "T_002",
    "name": "Blue",
    "colors": {
      "accent": "#0962E6"
    }
  });
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = mode => {
    setToLS('theme', mode)
    setTheme(mode);
  };

  useEffect(() =>{
    const localTheme = getFromLS('theme');
    if (localTheme != null) {
      setTheme(localTheme);
    }
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded, setMode };
};