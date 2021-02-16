import React from "react";

export const useSessionStorage = <T>(
  sessionStorageKey: string,
  defaultState: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const storageValue = sessionStorage.getItem(sessionStorageKey);
  const [value, setValue] = React.useState<T>(
    storageValue ? JSON.parse(storageValue) : defaultState
  );

  React.useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
