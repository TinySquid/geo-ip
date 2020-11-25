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

export { parseFromSearchHistory };
