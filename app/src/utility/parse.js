/*
  My reasoning for making these functions is to provide a single place 
  for converting the API response object and search history object into 
  the correct shape to be consumed by the page etc.
*/

function parseFromSearchHistory(data) {
  /*
    data should be an object that matches this:
    {
      ip: "8.8.8.8"​,
      isp: "Google LLC",
      latlon: [37.4224, -122.08421],
      location: "Mountain View, California 94043-1351",
      timezone: "UTC -8"
    }

    Parse entry from search history into object for the map and info panel component:
    {
      data: [
        { header: "ip address", text: "8.8.8.8" },
        { header: "location", text: "Mountain View, California 94043-1351" },
        { header: "timezone", text: "UTC -08:00" },
        { header: "isp", text: "Google LLC" },
      ],
      latlon: [37.4224, -122.08421],
    }
  */

  return {
    data: [
      { header: "ip address", text: data.ip },
      { header: "location", text: data.location },
      { header: "timezone", text: data.timezone },
      { header: "isp", text: data.isp },
    ],
    latlon: data.latlon,
  };
}

function parseFromAPI(data) {
  /*
    data should be an object that matches this (from the API):
      {
        success: true,
        ip: "8.8.8.8"​,
        isp: "Google LLC",
        latlon: [37.4224, -122.08421],
        location: "Mountain View, California 94043-1351",
        timezone: "UTC -8",
        timestamp: 1606867200000
      }

    We want 2 objects as a result - one for the map and info panel, and the other for storing into browser localstorage.
    The API already provides a response that fits the map + infopanel requirements, so we need to just make another object for localstorage
  */

  // To be consumed by page components
  const pageObject = parseFromSearchHistory(data);

  // For storing search into localstorage with the right shape
  const storageObject = {
    ip: data.ip,
    isp: data.isp,
    latlon: data.latlon,
    location: data.location,
    timezone: data.timezone,
    timestamp: data.timestamp,
  };

  return {
    pageObject,
    storageObject,
  };
}

export { parseFromSearchHistory, parseFromAPI };
