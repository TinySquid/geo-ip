// React
import React from "react";

// Global Layout
import Layout from "../components/Layout/Layout";

// Components
import SearchBox from "../components/SearchBox/SearchBox";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import MapBox from "../components/MapBox/MapBox";
import { Marker, Popup } from "react-leaflet";

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
`;

export default function Home() {
  return (
    <Layout>
      <Container>
        <Header>
          <Title>IP Address Tracker</Title>
          <SearchBox />
          <InfoPanel
            data={[
              { header: "ip address", text: "192.212.174.101" },
              { header: "location", text: "Brooklyn, NY 10001" },
              { header: "timezone", text: "UTC -05:00" },
              { header: "isp", text: "SpaceX Starlink" },
            ]}
          />
        </Header>
        <MapBox
          options={{
            style: { height: "calc(100vh - 300px)", width: "100vw" },
            center: [51.505, -0.09],
            zoom: 15,
            zoomControl: false,
            scrollWheelZoom: true,
          }}
        >
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapBox>
      </Container>
    </Layout>
  );
}
