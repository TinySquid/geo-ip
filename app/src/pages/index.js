// React
import React, { useState, useEffect, useCallback } from "react";

// Global Layout
import Layout from "../components/Layout/Layout";

// Components
import { BeatLoader } from "react-spinners";
import SearchBox from "../components/SearchBox/SearchBox";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import MapBox from "../components/MapBox/MapBox";
import LiveMarker from "../components/MapBox/LiveMarker";

// Hooks
import { useLocalIp } from "../hooks/useLocalIp";
import { useSearch } from "../hooks/useSearch";

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
  const localIp = useLocalIp();

  const search = useSearch();

  const [state, setState] = useState({
    hasSearchedLocalIp: false,
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

  const searchWithUpdate = useCallback(
    (ip) => {
      // Combines search result with UI state updating
      search(ip)
        .then((data) => {
          setState((prevState) => ({ ...prevState, ...data }));
        })
        .catch((error) => {
          console.log("Could not get local ip information", error);
        });
    },
    [search]
  );

  //* We get local ip location on page load
  useEffect(() => {
    if (localIp && !state.hasSearchedLocalIp) {
      searchWithUpdate(localIp);

      setState((prevState) => ({ ...prevState, hasSearchedLocalIp: true }));
    }
  }, [localIp, state.hasSearchedLocalIp, searchWithUpdate]);

  if (!state.searchIp)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <BeatLoader color={"#0E71E4"} size={20} margin={6} />
      </div>
    );

  return (
    <Layout>
      <Container>
        <Header>
          <Title>IP Address Locator</Title>
          <SearchBox initialValue={state.searchIp} search={searchWithUpdate} />
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
