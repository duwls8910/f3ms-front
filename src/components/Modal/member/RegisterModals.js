import React, { useState } from 'react';
// import axios from "axios";
import { Autocomplete, TextField, Button } from '@mui/material';
import styled from 'styled-components';

export const ButtonPosition = styled.div`
  position: absolute;
  top: 220%;
  right: 60%;
  transform: translateX(50%);
  margin: 4rem 0;
`;

export const MyButton = styled(Button)`
  border: 0;
  border-radius: 3px;
  height: 48px;
  padding: 0 30px;
`;

const position_data = [{ label: '프론트엔드' }, { label: '백엔드' }];

const MemberRegister = () => {
  // 팀원을 등록할 때 필요한 것
  // 1. 각 팀에 대한 팀원 이름
  // 2. 팀원의 포지션(프/백)
  const [name, setName] = useState('');
  const [selectedDropValue, setSelectedDropValue] =
    useState('포지션을 선택하세요');

  // const handleInputValue = (key) => (e) => {
  // setName({ ...name, [key]: e.target.value });
  // };

  const handleDropPosition = (e) => {
    const { value } = e.target;
    setSelectedDropValue(
      position_data.filter((el) => el.value === value)[0].id
    );
  };

  // const onSubmit = async () => {
  //   try {
  //     await axios.post(``, {}).then((res) => {});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onSubmit = async () => {
    const data = {
      member_name: '김코딩',
      position_cd: 'backend',
      is_active: true,
    };
    await fetch(`${process.env.REACT_APP_URL}/admin/management/member`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data),
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    console.log(data);
    // if (!number) {
    //   setNumberError(true);
    //   alert('기수명을 작성해주세요');
    // }
    // if (!isStart && !isEnd) {
    //   setDateError(true);
    //   alert('프로젝트의 시작일과 종료일을 선택해주세요');
    // }
    // if (!isClosed) {
    //   setIsClosedError(true);
    //   alert('기수 종료 여부를 선택해주세요');
    // } else {
    // await axios
    //   .post(
    //     `${process.env.REACT_APP_URL}/admin/management/member`,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         withCredentials: true,
    //       },
    //     }.then((res) => console.log(res))
    //   )
    //   .catch((err) => console.log(err));
  };

  return (
    <>
      <div>팀원</div>
      <br />
      <TextField
        id='outlined-basic'
        label='이름'
        variant='outlined'
        autoFocus
      />
      <br />
      <br />
      <div>포지션</div>
      <Autocomplete
        id='combo-box-demo'
        options={position_data}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='포지션을 선택하세요'
            onChange={handleDropPosition}
          />
        )}
      />
      <br />
      <div>기타 코멘트(선택사항)</div>
      <TextField id='standard-basic' label='특이사항 작성' variant='standard' />
      <br />
      <ButtonPosition>
        <MyButton variant='contained' onClick={onSubmit}>
          등록
        </MyButton>
      </ButtonPosition>
    </>
  );
};

export default MemberRegister;
