import { useState, useEffect } from "react";

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

  function addItem(item) {
    setState([...state, item]);
  }

  function deleteItem(timestamp) {
    // Removes search result from state by timestamp
    setState(
      state.filter((item) => Number(item.timestamp) !== Number(timestamp))
    );
  }

  function _updateLocalStorage(state) {
    localStorage.setItem("cache", JSON.stringify(state));
  }

  return [state, addItem, deleteItem];
}
