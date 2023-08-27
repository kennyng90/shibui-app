import { useCallback } from 'react';

function useEnterKey(
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

export default useEnterKey;
