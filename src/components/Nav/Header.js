import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import teamDummy from 'static/teamDummy';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import SearchBar from 'material-ui-search-bar';

// export const HeaderContainer = styled.header`
//   width: 100%;
//   height: 100px;
//   overflow: hidden;
//   position: relative;
//   z-index: 1;
//   background-color: rgb(234, 211, 172);
// `;

export const HeaderContainer = styled.header`
  width: 100%;
  height: 100px;
  position: relative;
  z-index: 10;
  background-color: rgb(53, 62, 87);
`;

const NavBlock = styled.div`
  max-width: 1550px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const LogoStyle = styled(NavLink)`
  position: relative;
  bottom: 10px;
  color: white;
  font-size: 20px;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
`;

export const NavButton = styled(NavLink)`
  border: none;
  background: none;
  display: block;
  cursor: pointer;
  position: relative;
  bottom: 10px;
  h5 {
    color: white;
    font-size: 30px;
    font-weight: 500;
    text-decoration: none;
  }
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  bottom: 10px;
  max-width: 1440px;
  margin: 0 auto;
`;

const Header = () => {
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
        <NavBlock>
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
          <NavButton to='/admin/management/number'>
            <h5>기수</h5>
          </NavButton>
          <NavButton to='/admin/management/team'>
            <h5>팀</h5>
          </NavButton>
          <NavButton to='/admin/management/member'>
            <h5>수강생</h5>
          </NavButton>
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
        </NavBlock>
      </HeaderContainer>
    </>
  );
};

export default Header;
