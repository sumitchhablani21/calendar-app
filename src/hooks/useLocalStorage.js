import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const readStoredValue = () => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState(() => {
    return readStoredValue();
  });

  useEffect(() => {
    setValue(readStoredValue());
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
