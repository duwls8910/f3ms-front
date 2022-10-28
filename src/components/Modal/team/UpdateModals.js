import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';

export const ButtonPosition = styled.div`
  position: absolute;
  top: 77%;
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

const UpdateModals = ({ setModalOpen }) => {
  const [newTeam, setNewTeam] = useState({
    team_id: '',
    new_team_id: '',
    comment: '',
    new_comment: '',
    is_closed: false,
    new_is_closed: false,
  });
  const [teamName, setTeamName] = useState('');
  const [comment, setComment] = useState('');
  const [inputStatus, setInputStatus] = useState('');

  // const handleClickRadioButton = (e) => {
  //   setInputStatus(e.target.value);
  // };

  const handleTeam = (e) => {
    const { value } = e.target;
    // setSelectedDropValue(member_data.filter((el) => el.value === value)[0].id);
    setTeamName(value);
  };

  const handleInputValue = (key) => (e) => {
    setNewTeam({ ...newTeam, [key]: e.target.value });
  };

  const handleComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  // 모달창 내의 등록 버튼을 눌렀을 때 일어날 이벤트
  const onSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/admin/management/pre-team/${teamName}`,
        {
          team_name: teamName,
          comment: comment,
          is_closed: inputStatus,
        }
      );
      setTeamName('');
      setComment('');
      setInputStatus(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleExit = () => {
    setModalOpen(false);
  };

  return (
    <>
      <h2>팀 정보 수정</h2>
      <h4>팀 명</h4>
      <TextField
        item='outlined-basic'
        label='팀명(seb_00_pre(main)_000)'
        variant='outlined'
        autoFocus
        value={teamName}
        onChange={handleTeam}
      />
      {/* <input value={teamName} onChange={handleTeam}></input> */}
      <h4>기타사항</h4>
      <TextField
        item='standard-basic'
        label='특이사항 작성'
        variant='standard'
        onChange={handleComment}
      />
      <br />
      <ButtonPosition>
        <MyButton variant='contained'>수정</MyButton>
      </ButtonPosition>
    </>
  );
};

export default UpdateModals;
