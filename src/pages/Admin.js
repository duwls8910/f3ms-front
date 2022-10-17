// 로그인 후에 바로 로딩 될 관리자 화면// 관리자 화면에 제일 처음으로 뜨는 화면은 기수, 팀, 팀원 조회 화면(Read)

// 로그인 후에 바로 로딩 될 관리자 화면
// 관리자 화면에 제일 처음으로 뜨는 화면은 기수, 팀, 팀원 조회 화면(Read)
// 추후 따로 페이지를 만들어뒀던 기능들을 Admin.js에 합칠 예정

// 관리자의 전체 메뉴 레이아웃(사이드바)
// => 리액트로 레이아웃 만드는 방법(header, left, article, footer ... ) 고민해볼것(각각의 페이지에 권한이 먹혀야함)

// 1. 기수별로 화면이 나옴
// 2. 팀 별로 화면이 나옴
// 각 팀을 클릭했을 때 해당 팀의 이슈가 나옴.
// 조회 화면에서 삭제를 할 수 있도록 만들기?
// 조회 화면에서 로그인이 된 상태라는 것이 보여야함(로그아웃도 같이 조회화면에 띄울 수 있게?)
// 3. 검색(기수, 팀, 팀원) 기능을 넣는다(어떻게? -> map, filter 사용?)

// // 검색기능 -> 10.11까지 관련 기능 구현 안함
// // p.p / m.p 구분을 할 수 있게 검색결과가 나와야함(필터)
// // 사용자의 관점에서 검색 기능을 정의해야함
// // 검색(seb_00 / seb_00_pre / 000) => 어떻게 검색을 해도 해당 검색 결과가 나와야함
// // Ajax 호출에 따른 엘리먼트 동적 처리 검색해볼것(기존에 떠있던 정보들이 사라지고 검색도니 정보만 받아서 뿌려주는거) => 새로고침 없이 실행해야함

import React, { useState, useEffect, useNavigate } from 'react';
// import axios from "axios";
import ReadNumber from 'pages/numberPage/Read';
import ReadTeam from 'pages/teamPage/Read';
import ReadMember from 'pages/memberPage/Read';
import Loading from 'utils/LoadingIndicator';
import styled from 'styled-components';

export const EntireAdminPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const GetNumber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
`;

const Admin = () => {
  const [loading, setLoading] = useState(false);

  // 기수
  const [number, setNumber] = useState('');

  // 팀원
  const [name, setName] = useState('');

  // 팀
  const [team, setTeam] = useState('');

  try {
    fetch(`${process.env.REACT_APP_URL}/admin/management/team`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }

  // const navigate = useNavigate();

  // 팀을 클릭했을 때 나올 팀 이슈 관리
  // const handleTeamIssue = async () => {
  //   const json = await (await fetch(``)).json();
  //   setTeam(json.data[0]);
  // };

  // useEffect(() => {
  //   handleTeamIssue();
  // }, []);

  // const header = {
  //   headers: { authorization: `` },
  //   withCredentials: true,
  // };

  // 기수, 팀, 팀원을 삭제할 때 사용할 클릭 이벤트
  // const removeAll = async () => {
  //   await axios
  //     .delete(``, header)
  //     .then((res) => {
  //       setLoading(true)
  //       navigate(-1)
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <>
      {loading ? <Loading /> : null}
      <EntireAdminPage>
        <div>
          <h3>기수명</h3>
          <ReadNumber />
        </div>
        <div />
        <br />
        <div>
          <h3>팀명</h3>
          <ReadTeam />
        </div>
        {/* <div>
           <div className="teamIssue" onClick={handleTeamIssue}>
             팀 조회 화면 div 공간 팀을 클릭했을 때 나올 팀 이슈
           </div>
         </div> */}
        <div />
        <br />
        <div>
          <h3>팀원</h3>
          <ReadMember />
        </div>
      </EntireAdminPage>
    </>
  );
};

export default Admin;
