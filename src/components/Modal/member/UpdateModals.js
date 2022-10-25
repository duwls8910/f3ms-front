import React, { useState } from 'react';
import axios from 'axios';
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
  const [comment, setComment] = useState('');
  const [inputStatus, setInputStatus] = useState('');
  const [selectedDropValue, setSelectedDropValue] =
    useState('포지션을 선택하세요');

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
    } catch (err) {
      console.log(err);
    }
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
    //   .patch(
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
      <h4>수강생</h4>
      <br />
      {/* <TextField
        id='outlined-basic'
        label='이름'
        variant='outlined'
        value={memberName}
        onChange={handleMember}
        autoFocus
      /> */}
      <input value={memberName} onChange={handleMember}></input>
      <br />
      <br />
      <h4>포지션</h4>
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
      <h4>기타 코멘트</h4>
      <TextField
        id='standard-basic'
        label='특이사항 작성'
        variant='standard'
        onChange={handleComment}
      />
      <br />
      <ButtonPosition>
        <MyButton variant='contained' onClick={onSubmit}>
          수정
        </MyButton>
      </ButtonPosition>
    </>
  );
};

export default MemberRegister;
