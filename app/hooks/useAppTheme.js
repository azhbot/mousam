// hooks/useTheme.js
import { useSelector } from 'react-redux';
import {darkTheme,lightTheme } from '../constant/theme';

export const useAppTheme = () => {
  const mode = useSelector((state) => state.theme.mode);
  return mode === 'dark' ? darkTheme : lightTheme;
};
