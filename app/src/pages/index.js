import React from "react";

import Layout from "../components/global/Layout";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
