import { FC, useState, createContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';
import { string } from 'yup';

// export const ThemeContext = createContext((_themeName: string): void => {},themeName:string);
export const ThemeContext = createContext({
  setThemeName: (_themeName: string) => {}, // Placeholder function
  themeName: '', // Default theme name
});
const ThemeProviderWrapper: FC = (props) => {
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('appTheme') || 'DarkSpacesTheme';
    }
    // Default value if window is not defined (for server-side rendering, for example)
    return 'DarkSpacesTheme';
  };
  // const coco =
  // window.localStorage.getItem('appTheme') || 'DarkSpacesTheme';
  const [themeName, _setThemeName] = useState('DarkSpacesTheme');

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'GreenFieldsTheme'
      : 'DarkSpacesTheme';
    // const curThemeName =
    //   window.localStorage.getItem('appTheme') || 'DarkSpacesTheme';
      //GreenFieldsTheme
    _setThemeName(systemTheme);
  }, []);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    // window.localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={{setThemeName,themeName}}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
