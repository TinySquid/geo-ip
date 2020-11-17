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
  height: 150px;

  margin: 50px auto;

  background: white;
  border-radius: 15px;
  box-shadow: 0 0 6px 3px rgba(70, 70, 70, 0.2);
`;

const PanelItem = styled.div`
  width: 25%;
  text-align: left;

  margin: 35px 0;
  padding-left: 30px;

  border-right: 1px solid #cccccc;

  &:last-child {
    border: none;
  }
`;

const PanelItemHeader = styled.h2`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.4px;
  color: #969696;
  margin: 0 0 10px 0;
`;

const PanelItemText = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: #2b2b2b;
  margin: 0;
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
