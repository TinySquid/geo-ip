// React
import React from "react";

// Global Layout
import Layout from "../components/Layout/Layout";

// SC
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

export default function Home() {
  return (
    <Layout>
      <Container>
        <p>Hello World!</p>
      </Container>
    </Layout>
  );
}
