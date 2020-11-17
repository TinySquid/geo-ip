// React
import React from "react";

// SC
import styled from "styled-components";

const Panel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  position: relative;
  z-index: 9999;

  width: 80%;
  min-height: 150px;

  min-width: 750px;

  margin: 50px auto;

  background: white;
  border-radius: 15px;
  box-shadow: 0 0 6px 3px rgba(70, 70, 70, 0.2);

  // Mobile
  @media (max-width: 760px) {
    flex-direction: column;
    min-width: 325px;

    margin: 20px auto;
  }
`;

const PanelItem = styled.div`
  width: 25%;
  text-align: left;

  margin: 35px 0;
  padding: 0 20px 0 30px;

  border-right: 1px solid #cccccc;

  &:last-child {
    border: none;
  }

  // Mobile
  @media (max-width: 760px) {
    width: 100%;
    text-align: center;

    margin: 15px 0 0 0;
    padding: 0; // Clear padding for centering

    &:last-child {
      margin-bottom: 15px;
    }
  }
`;

const PanelItemHeader = styled.h2`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.4px;

  color: #969696;

  margin: 0 0 10px 0;

  // Mobile
  @media (max-width: 760px) {
    margin-bottom: 5px;

    // &:last-child {
    //   margin-bottom: 25px;
    // }
  }
`;

const PanelItemText = styled.p`
  font-size: 24px;
  font-weight: 500;

  color: #2b2b2b;

  margin: 0;

  // Keep layout clean til mobile layout switch
  @media (max-width: 1100px) {
    font-size: 20px;
  }
`;

export default function InfoPanel({ data }) {
  return (
    <Panel>
      {data.map((item, idx) => {
        return (
          <PanelItem key={idx}>
            <PanelItemHeader>{item.header.toUpperCase()}</PanelItemHeader>
            <PanelItemText>{item.text}</PanelItemText>
          </PanelItem>
        );
      })}
    </Panel>
  );
}
