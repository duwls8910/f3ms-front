import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import teamDummy from 'static/teamDummy';
import Loading from 'utils/LoadingIndicator';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import SearchBar from 'material-ui-search-bar';

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
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [complete, setComplete] = useState(false);
  const [date, setDate] = useState(new Date());

  let { id } = useParams();

  if (window.location.pathname === '/') return null;

  const searchFilter = (searchedVal) => {
    const filteredValue = teamDummy.filter((data) => {
      return data.team_name
        .toLocaleLowerCase()
        .includes(searchedVal.toLocaleLowerCase());
    });
    setData(filteredValue);
  };

  const cancelSearch = () => {
    setSearch('');
    searchFilter(search);
  };

  // 엔터를 눌렀을 때 검색 결과에 해당하는 페이지가 나올 수 있도록 함
  // e.g. seb_40_pre_001을 검색했을 때 001팀에 해당하는 정보 페이지가 로드됨
  // 엔터를 눌렀을 때 -> onKeyUp()?
  // 페이지는 /admin/management/pre-team/:id?
  const onSubmitSearch = (e) => {
    if (e.key === 'Enter') {
      axios.post(
        `${process.env.REACT_APP_URL}/admin/management/pre-team/${id}`,
        {
          team_name: name,
          title: title,
          content: content,
          is_completed: complete,
          complete_date: date,
        }
      );
      setName('');
      setTitle('');
      setContent('');
      setComplete('');
      setDate('');
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <HeaderContainer>
        <NavBlock>
          <div>
            <LogoStyle
              className={({ isActive }) => (isActive ? 'active' : '')}
              to='/'
            >
              <Typography component='h1' variant='h3'>
                📊
              </Typography>
            </LogoStyle>
          </div>
          <NavButton to='/admin/management/number'>
            <h5>기수</h5>
          </NavButton>
          <NavButton to='/admin/management/pre-team'>
            <h5>팀</h5>
          </NavButton>
          <NavButton to={`/admin/management/member/number/${id}`}>
            <h5>수강생</h5>
          </NavButton>
          <div>
            <SearchContainer>
              <SearchBar
                placeholder='기수, 팀, 수강생 검색'
                onChange={searchFilter}
                onKeyPress={onSubmitSearch}
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
