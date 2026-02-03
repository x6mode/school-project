import type { ReactNode } from 'react';

import { useLocalStorage } from '@/hooks/use-local-storage';

import { Button } from '@/components/shared/button';
import { Toggle } from '@/components/shared/toggle';

import { Moon, Sun } from 'lucide-react';

import { ThemeStorageKey } from '@/constant';

const ThemeToggler = (): ReactNode => {
  const [theme, setTheme] = useLocalStorage(ThemeStorageKey);

  const isDarkTheme = theme === 'dark';

  return (
    <Toggle asChild>
      <Button
        size='icon'
        variant='outline'
        onClick={() => {
          const isToggleNow = document.body.classList.toggle('dark');
          setTheme(isToggleNow ? 'dark' : 'light');
        }}
      >
        {isDarkTheme ? <Sun /> : <Moon />}
      </Button>
    </Toggle>
  );
};

export default ThemeToggler;
