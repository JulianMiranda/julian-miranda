import {Theme} from '@react-navigation/native';

export interface ThemeState extends Theme {}
export const lightTheme: ThemeState = {
  dark: false,
  colors: {
    background: '#ffffff',
    text: '#54648e',
    primary: '#fcdd00',
    border: '#edeff4',
    notification: 'light',
    card: '#f3f3f3',
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    background: '#ffffff',
    text: '#333333',
    primary: '#007BFF',
    border: '#DDDDDD',
    notification: 'light',
    card: '#333333',
  },
};
