import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuModal from 'components/Nav/Menu';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import SearchBar from 'material-ui-search-bar';
import './Header.css';
// import axios from 'axios';

export const SearchContainer = styled.div`
  align-items: flex-end;
  margin: 0 auto;
  max-width: 800px;
`;

const Header = () => {
  // 검색기능을 위한 상태
  const [search, setSearch] = useState('');

  // 검색 기능
  // const searchFilter = search.filter((p) => {
  //   return p.name
  //     .replace('', ' ')
  //     .toLocaleUpperCase()
  //     .includes(search.toLocaleUpperCase());
  // });

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  if (window.location.pathname === '/') return null;

  return (
    <>
      <header>
        <nav className='navbar'>
          <div className='nav-links nav-menu'>
            <MenuModal />
          </div>
          <div>
            <NavLink to='/' className='nav-links'>
              <Typography component='h1' variant='h3'>
                F3MS
              </Typography>
            </NavLink>
          </div>
          <div>
            <SearchBar
              value={search}
              onChange={() => console.log('onChange Event')}
              onRequestSearch={onChange}
            />
            <SearchContainer />
            {/* {searchFilter.map((name) => (
              <div>
                <span>{search.name}</span>
              </div>
            ))} */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
