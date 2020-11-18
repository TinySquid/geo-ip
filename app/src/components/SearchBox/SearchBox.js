// React
import React from "react";

// SC
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center; // Fixes 2px height offset on submit button

  margin: 35px 0 50px 0;

  // Mobile
  @media (max-width: 760px) {
    margin: 25px 0;
  }
`;

const SearchInput = styled.input`
  height: 50px;
  width: 25%;

  font-size: 16px;
  color: #2b2b2b;

  padding-left: 20px;

  border: none;
  border-radius: 10px 0 0 10px;

  min-width: 350px;

  // Mobile
  @media (max-width: 760px) {
    min-width: 275px;
  }
`;

const SearchButton = styled.button`
  height: 50px;
  width: 50px;

  font-size: 18px;
  font-weight: 700;

  color: white;
  background: black;

  margin: 0;
  padding: 0;

  border: none;
  border-radius: 0 10px 10px 0;

  &:hover,
  :active {
    cursor: pointer;
    background: #3f3f3f;
  }

  &:active {
    background: black;
  }
`;

export default function SearchBox() {
  return (
    <SearchContainer>
      <SearchInput placeholder="Search for any IP address or domain" />
      <SearchButton aria-label="Submit">{">"}</SearchButton>
    </SearchContainer>
  );
}
