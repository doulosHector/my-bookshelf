import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "../services/storage";

/**
 * useState backed by localStorage. The initial value is read synchronously,
 * so there is no flash of empty content on the first render.
 * @param {string} key
 * @param {*} initialValue used when nothing is stored yet
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readJSON(key, initialValue));

  useEffect(() => {
    writeJSON(key, value);
  }, [key, value]);

  return [value, setValue];
}
