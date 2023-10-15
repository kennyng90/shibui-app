import { useCallback } from 'react';

export function useEnterKey(
  callback: () => void,
  isDisabled: boolean
): (e: React.KeyboardEvent<HTMLInputElement>) => void {
  return useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !isDisabled) {
        callback();
      }
    },
    [callback, isDisabled]
  );
}
