import { useState, useEffect, useCallback } from "react";

export function useSearchHistory(initialValue) {
  /*
    A hook to manage search history from the app with localstorage
    Using 'cache' as the item key. Any changes are sync'd with browser localstorage.
  */

  const [state, setState] = useState(
    JSON.parse(localStorage.getItem("cache")) || initialValue
  );

  useEffect(() => {
    // Sync changes to localstorage
    _updateLocalStorage(state);
  });

  const findItem = useCallback(
    (ip) => {
      // Will return a search result if found, or null
      const result = state.filter((item) => item.ip === ip);

      if (result.length > 0) {
        return result[0];
      }

      return null;
    },
    [state]
  );

  const addItem = useCallback((item) => {
    setState((prevState) => [...prevState, item]);
  }, []);

  const deleteItem = useCallback((timestamp) => {
    // Removes search result from state by timestamp
    setState((prevState) =>
      prevState.filter((item) => Number(item.timestamp) !== Number(timestamp))
    );
  }, []);

  function _updateLocalStorage(state) {
    localStorage.setItem("cache", JSON.stringify(state));
  }

  return [findItem, addItem, deleteItem, state];
}
