import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(localStorage.getItem(key));

  useEffect(() => {
    if (!value) return;
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue] as const;
};
