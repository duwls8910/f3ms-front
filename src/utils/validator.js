// 기수명을 등록하지 않으면 넘어가지 않게 만들기
// 프로젝트 시작일, 종료일을 작성하지 않으면 넘어가지 않게 만들기

// 팀명을 작성하지 않으면 넘어가지 않음
// pre/main 체크 안하면 안넘어감

// 수강생 이름을 등록해야함
// 포지션을 선택해야함

// 위의 조건들이 전부 체크되지 않았을 때 등록이 될 수 없음
import React, { useState } from 'react';

const validate = () => {
  const [error, setError] = useState('');
  const [number, setNumber] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [team, setTeam] = useState([]);
  const [member, setMember] = useState([]);
  const [position, setPosition] = useState('');

  return <></>;
};

export default validate;
