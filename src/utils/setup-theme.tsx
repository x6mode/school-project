import { ThemeStorageKey } from '@/constant';

export const setupTheme = () => {
  const theme = localStorage.getItem(ThemeStorageKey);
  if (theme && theme === 'light') {
    document.body.classList.toggle('dark');
  } else {
    localStorage.setItem(ThemeStorageKey, 'dark');
  }
};
