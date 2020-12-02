import { useState, useEffect } from "react";

import axios from "axios";

export function useLocalIp() {
  const [ip, setIp] = useState(null);

  useEffect(() => {
    if (!ip) {
      axios
        .get(`${process.env.GATSBY_GET_LOCAL_IP_ENDPOINT}`)
        .then((res) => {
          const { data } = res;

          if (data.success) {
            setIp(data.req);
          } else {
            throw new Error("Endpoint failure");
          }
        })
        .catch((error) => {
          console.log("Could not get local IP", error);
        });
    }
  });

  return ip;
}
