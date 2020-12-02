import { useCallback } from "react";

import axios from "axios";

import { useSearchHistory } from "./useSearchHistory";

// Utils
import { daysBetween } from "../utility/dateRange";
import { parseFromSearchHistory, parseFromAPI } from "../utility/parse";

export function useSearch() {
  // This hook works with localstorage to save prev requests and manages it accordingly
  const [findSearchItem, addSearchItem, deleteSearchItem] = useSearchHistory(
    []
  );

  const search = useCallback(
    /* There are 3 scenarios for searching
      1. Search IP is already in localstorage AND data is not stale
      2. Search IP is already in localstorage AND data IS stale
      3. Search IP is NOT in localstorage

      The caller doesn't care about this and just expects a promise return
      with location info in an object.
    */
    async (ip) => {
      const searchItem = findSearchItem(ip);

      if (searchItem) {
        // Verify date
        const today = new Date().setHours(0, 0, 0, 0);

        if (daysBetween(new Date(searchItem.timestamp), today) < 7) {
          // Use existing location information from history
          const result = parseFromSearchHistory(searchItem);

          return Promise.resolve({ searchIp: ip, searchResult: result });
        } else {
          // Search is stale, retrieve from API
          return axios
            .get(`${process.env.GATSBY_GET_IP_LOCATION_ENDPOINT}?host=${ip}`)
            .then((response) => {
              const result = parseFromAPI(response.data);

              // Add new search, delete old
              addSearchItem(result.storageObject);

              deleteSearchItem(searchItem.timestamp);

              return { searchIp: ip, searchResult: result.pageObject };
            });
        }
      } else {
        // Search doesn't exist, retrieve from API
        return axios
          .get(`${process.env.GATSBY_GET_IP_LOCATION_ENDPOINT}?host=${ip}`)
          .then((response) => {
            const result = parseFromAPI(response.data);

            addSearchItem(result.storageObject);

            return { searchIp: ip, searchResult: result.pageObject };
          });
      }
    },
    [findSearchItem, addSearchItem, deleteSearchItem]
  );

  return search;
}
