// React
import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

// Global Layout
import Layout from "../components/Layout/Layout";

// Components
import SearchBox from "../components/SearchBox/SearchBox";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import MapBox from "../components/MapBox/MapBox";
import LiveMarker from "../components/MapBox/LiveMarker";

// Hooks
import { useSearchHistory } from "../hooks/useSearchHistory";

// Utils
import { daysBetween } from "../utility/dateRange";
import { parseFromSearchHistory } from "../utility/parse";

// SC
import styled from "styled-components";
import HeaderBackground from "../assets/pattern-bg.png";

const Container = styled.div`
  text-align: center;
  overflow-x: hidden; // Removes horiz scroll from background on resize
`;

const Header = styled.div`
  background-image: url(${HeaderBackground});
  background-color: #2f3fcf; // Fallback for no img
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  color: white;

  margin: 0;
  padding: 35px 0 0 0;

  // Mobile
  @media (max-width: 760px) {
    font-size: 26px;

    padding: 25px 0 0 0;
  }
`;

export default function Home() {
  const [findSearchItem, addSearchItem, deleteSearchItem] = useSearchHistory(
    []
  );

  const search = useCallback(
    (ip) => {
      // Will show ip location from cache or API if cache outdated or not found
      const searchItem = findSearchItem(ip);

      if (searchItem) {
        // Verify date
        const today = new Date().setHours(0, 0, 0, 0);

        if (daysBetween(new Date(searchItem.timestamp), today) < 7) {
          // Use existing location information from history
          const result = parseFromSearchHistory(searchItem);

          setState({ searchIp: ip, searchResult: result });
        } else {
          // Get fresh location information
          console.log("Need API data");
        }
      }
    },
    [findSearchItem]
  );

  const [state, setState] = useState({
    searchIp: null,
    searchResult: {
      data: [
        { header: "ip address", text: "8.8.8.8" },
        { header: "location", text: "Mountain View, California 94043-1351" },
        { header: "timezone", text: "UTC -08:00" },
        { header: "isp", text: "Google LLC" },
      ],
      latlon: [37.4224, -122.08421],
    },
  });

  useEffect(() => {
    // Will get our local IP on initial page visit
    axios.get(`${process.env.GATSBY_GET_LOCAL_IP_ENDPOINT}`).then((res) => {
      const { data } = res;

      if (data.success) {
        search(data.req);
      }
    });
  }, [search]);

  if (!state.searchIp) return null;

  return (
    <Layout>
      <Container>
        <Header>
          <Title>IP Address Locator</Title>
          <SearchBox initialValue={state.searchIp} />
          <InfoPanel data={state.searchResult.data} />
        </Header>
        <MapBox
          options={{
            style: { height: "calc(100vh - 300px)", width: "100vw" },
            center: state.searchResult.latlon,
            zoom: 15,
            zoomControl: false,
            scrollWheelZoom: true,
          }}
        >
          <LiveMarker position={state.searchResult.latlon} />
        </MapBox>
      </Container>
    </Layout>
  );
}
