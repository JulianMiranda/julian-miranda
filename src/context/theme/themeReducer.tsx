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
/*
--primary-color: #fcdd00;
	--secondary-color: #fcf2ae;
	--accent-color: #edeff4;
	--text-color: #54648e;
	--error-color: #dc3545;
	--success-color: #28a745;
	--white-color: #fff;
	--black-color: #000;
	--border-color: #ddd;
	--table-head-color: #fafbfc;
	--table-line-color: #f3f3f3;
	--text-input-color: #626262;
	--icon-background-color: #a1a2a6;
	--image-background-color: #cacfdc;
	--input-background-color: rgba(237, 239, 244, 0.6);
	--shadow-color: rgba(98, 98, 98, 0.6);
	--white-shadow-color: rgba(255, 255, 255, 0.9);
	--modal-backdrop-color: rgba(0, 0, 0, 0.7);*/
