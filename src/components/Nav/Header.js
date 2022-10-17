import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import teamDummy from 'static/teamDummy';
// import Sidebar from 'components/Nav/Sidebar';
// import DropdownMenu from 'components/Nav/DropDownMenu';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import SearchBar from 'material-ui-search-bar';
// import axios from 'axios';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 100px;
  overflow: hidden;
  position: sticky;
  z-index: 1;
  background-color: rgb(234, 211, 172);
`;

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
`;

export const NavStyle = styled(NavLink)`
  color: black;
  font-size: 40px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 20px;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
`;

export const LogoStyle = styled(NavLink)`
  color: black;
  font-size: 20px;
  position: absolute;
  top: 10px;
  left: 50px;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
`;

export const SearchContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 100px;
  max-width: 1440px;
  margin: 0 auto;
`;

const Header = () => {
  // 검색기능을 위한 상태
  // const [search, setSearch] = useState('');

  // // 검색 기능
  // const searchFilter = teamDummy.filter((data) => {
  //   return data.team_name.toLowerCase().includes(search.toLowerCase());
  // });

  // const handleRequestSearch = (event) => {
  //   setSearch(event.target.value);
  // };

  const [data, setData] = useState(teamDummy);
  const [search, setSearch] = useState('');

  const requestSearch = (searchedVal) => {
    const filteredValue = teamDummy.filter((data) => {
      return data.team_name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setData(filteredValue);
  };

  const cancelSearch = () => {
    setSearch('');
    requestSearch(search);
  };

  if (window.location.pathname === '/') return null;

  return (
    <>
      <HeaderContainer>
        <div>
          <LogoStyle
            className={({ isActive }) => (isActive ? 'active' : '')}
            to='/'
          >
            <Typography component='h1' variant='h3'>
              F3MS
            </Typography>
          </LogoStyle>
        </div>
        {/* <DropdownMenu /> */}
        <div>
          <SearchContainer>
            <SearchBar
              value={search}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
            />
            {data.map((el) => (
              <div key={el.team_name} />
            ))}
          </SearchContainer>
        </div>
      </HeaderContainer>
    </>
  );
};

export default Header;
