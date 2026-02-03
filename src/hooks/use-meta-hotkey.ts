import { useCallback, useEffect } from 'react';

export const useMetaHotkey = (code: string, callback: () => void) => {
  const overrideMemoFunc = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === `Key${code.toUpperCase()}` && e.altKey) {
        e.preventDefault();
        callback();
      }
    },
    [callback, code]
  );

  useEffect(() => {
    document.addEventListener('keydown', overrideMemoFunc);
    return () => document.removeEventListener('keydown', overrideMemoFunc);
  });
};
