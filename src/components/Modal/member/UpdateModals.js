import React, { useState } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Button } from '@mui/material';
import styled from 'styled-components';

export const ButtonPosition = styled.div`
  position: absolute;
  top: 83%;
  right: 50%;
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
  const [newMember, setNewMember] = useState({
    member_id: '',
    new_member_id: '',
    position_cd: '',
    new_position_cd: '',
    comment: '',
    new_comment: '',
    is_closed: false,
    new_is_closed: false,
  });
  const [memberName, setMemberName] = useState('');
  const [position, setPosition] = useState('');
  const [preTeam, setPreTeam] = useState('');
  const [mainTeam, setMainTeam] = useState('');
  const [comment, setComment] = useState('');
  const [inputStatus, setInputStatus] = useState('');
  const [selectedDropValue, setSelectedDropValue] =
    useState('해당하는 학습 코스를 선택하세요');

  const handleDropPosition = (e) => {
    const { value } = e.target;
    setSelectedDropValue(
      position_data.filter((el) => el.value === value)[0].id
    );
  };

  const handleMember = (e) => {
    const { value } = e.target;
    // setSelectedDropValue(member_data.filter((el) => el.value === value)[0].id);
    setMemberName(value);
  };

  const handleChange = (key) => (e) => {
    setNewMember({ ...newMember, [key]: e.target.value });
  };

  const handleComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handlePreTeam = (e) => {
    const { value } = e.target;
    setPreTeam(value);
  };

  const handleMainTeam = (e) => {
    const { value } = e.target;
    setMainTeam(value);
  };

  const onSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/admin/management/member/${memberName}`,
        {
          position: position,
          comment: comment,
          is_closed: inputStatus,
        }
      );
      setModalOpen(false);
      setMemberName('');
      setComment('');
      setPreTeam('');
      setMainTeam('');
    } catch (err) {
      console.log(err);
    }
  };

  // const handleExit = () => {
  //   setModalOpen(false);
  // };

  return (
    <>
      <h2>수강생 정보 수정</h2>
      <h4>수강생</h4>
      <TextField
        id='outlined-basic'
        label='이름'
        variant='outlined'
        value={memberName}
        onChange={handleMember}
        autoFocus
      />
      {/* <input value={memberName} onChange={handleMember}></input> */}
      <h4>학습 코스 구분</h4>
      <Autocomplete
        id='combo-box-demo'
        options={position_data}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='해당하는 학습 코스를 선택하세요'
            onChange={handleDropPosition}
          />
        )}
      />
      <h4>pre팀명</h4>
      <TextField
        id='standard-basic'
        label='pre팀명'
        variant='standard'
        value={preTeam}
        onChange={handlePreTeam}
      />
      <h4>main팀명</h4>
      <TextField
        id='standard-basic'
        label='main팀명'
        variant='standard'
        value={mainTeam}
        onChange={handleMainTeam}
      />
      <h4>기타사항</h4>
      <TextField
        id='standard-basic'
        label='특이사항 작성'
        variant='standard'
        onChange={handleComment}
      />
      <ButtonPosition>
        <MyButton variant='contained' onClick={onSubmit}>
          수정
        </MyButton>
      </ButtonPosition>
    </>
  );
};

export default MemberRegister;
