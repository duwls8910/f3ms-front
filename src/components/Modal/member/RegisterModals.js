import React, { useState } from 'react';
import axios from 'axios';
import Loading from 'utils/LoadingIndicator';
import { Autocomplete, TextField, Button } from '@mui/material';
import styled from 'styled-components';

export const ButtonPosition = styled.div`
  position: absolute;
  top: 200%;
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

const MemberRegister = ({ setModalOpen }) => {
  // 팀원을 등록할 때 필요한 것
  // 1. 각 팀에 대한 팀원 이름
  // 2. 팀원의 포지션(프/백)
  const [selectedDropValue, setSelectedDropValue] =
    useState('포지션을 선택하세요');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  // const handleInputValue = (key) => (e) => {
  // setName({ ...name, [key]: e.target.value });
  // };

  const handleMember = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleDropPosition = (e) => {
    const { value } = e.target;
    setSelectedDropValue(
      position_data.filter((el) => el.value === value)[0].id
    );
  };

  const onSubmit = async () => {
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
    // }
    try {
      await axios.post(`${process.env.REACT_APP_URL}/admin/management/number`, {
        member_name: name,
        position_cd: selectedDropValue,
        comment: comment,
      });
      setLoading(false);
      setModalOpen(false);
      setName('');
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <h4>수강생</h4>
      <br />
      <TextField
        id='outlined-basic'
        label='이름'
        variant='outlined'
        autoFocus
        value={name}
        onChange={handleMember}
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
      <TextField
        id='standard-basic'
        label='특이사항 작성'
        variant='standard'
        onChange={handleComment}
      />
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
