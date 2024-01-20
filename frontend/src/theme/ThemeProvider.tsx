import { FC, useState, createContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';


// export const ThemeContext = createContext((_themeName: string): void => {},themeName:string);
export const ThemeContext = createContext({
  setThemeName: (_themeName: string) => {}, // Placeholder function
  themeName: '', // Default theme name
});
const ThemeProviderWrapper: FC = (props) => {

  const [themeName, _setThemeName] = useState('DarkSpacesTheme');

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'GreenFieldsTheme'
      : 'DarkSpacesTheme';
    _setThemeName(systemTheme);
  }, []);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
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
