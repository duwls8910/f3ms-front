import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import teamDummy from 'static/teamDummy';
// import DropdownMenu from 'components/Nav/DropDownMenu';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import SearchBar from 'material-ui-search-bar';
// import axios from 'axios';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 100px;
  overflow: hidden;
  position: relative;
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

export const LogoStyle = styled(NavLink)`
  color: black;
  font-size: 20px;
  position: absolute;
  top: 20px;
  left: 50px;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
`;

const NumberLink = styled(NavLink)`
  position: relative;
  top: 30px;
  left: 400px;
  font-size: 30px;
  text-decoration: none;
  color: black;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
`;

const TeamLink = styled(NavLink)`
  position: relative;
  top: 30px;
  left: 500px;
  font-size: 30px;
  text-decoration: none;
  color: black;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
`;

const MemberLink = styled(NavLink)`
  position: relative;
  top: 30px;
  left: 600px;
  font-size: 30px;
  text-decoration: none;
  color: black;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
`;

export const SearchContainer = styled.div`
  position: absolute;
  top: 23px;
  right: 300px;
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
        <NumberLink to='/admin/management/number'>기수</NumberLink>
        <TeamLink to='/admin/management/number/detail'>팀</TeamLink>
        <MemberLink to='/admin/management/member'>팀원</MemberLink>
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
