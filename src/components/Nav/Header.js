import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import teamDummy from 'static/teamDummy';
import Sidebar from 'components/Nav/Sidebar';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import SearchBar from 'material-ui-search-bar';
// import axios from 'axios';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 30;
  background-color: rgb(234, 211, 172);
`;

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0 auto;
`;

export const NavStyle = styled(NavLink)`
  color: black;
  font-size: 20px;
  position: absolute;
  top: 10px;
  left: 600px;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
`;

export const SearchContainer = styled.div`
  align-items: flex-end;
  margin: 0 auto;
  max-width: 700px;
`;

const Header = () => {
  // 검색기능을 위한 상태
  const [search, setSearch] = useState('');

  // 검색 기능
  const searchFilter = teamDummy.filter((data) => {
    return data.team_name.toLowerCase().includes(search.toLowerCase());
  });

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (window.location.pathname === '/') return null;

  return (
    <>
      <HeaderContainer>
        <NavBar>
          <Sidebar />
          <div>
            <NavStyle
              className={({ isActive }) => (isActive ? 'active' : '')}
              to='/'
            >
              <Typography component='h1' variant='h3'>
                F3MS
              </Typography>
            </NavStyle>
          </div>
          <div>
            <SearchBar
              value={search}
              onChange={() => console.log('onChange Event')}
              onRequestSearch={onSearchChange}
            />
            {searchFilter.map((data) => {
              return <div key={data.team_name} {...data} />;
            })}
            <SearchContainer />
          </div>
        </NavBar>
      </HeaderContainer>
    </>
  );
};

export default Header;
