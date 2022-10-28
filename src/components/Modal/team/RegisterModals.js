import { useState } from 'react';
import axios from 'axios';
import Loading from 'utils/LoadingIndicator';
import { TextField, Autocomplete, Button } from '@mui/material';
import styled from 'styled-components';

const ButtonPosition = styled.div`
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  margin: 4rem 0;
`;

const MyButton = styled(Button)`
  border: 0;
  border-radius: 3px;
  height: 48px;
  padding: 0 30px;
`;

const RegisterModals = ({ setModalOpen }) => {
  const [team, setTeam] = useState('');
  const [numberId, setNumberId] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  // 라디오 버튼 상태변경
  // const [inputStatus, setInputStatus] = useState('');

  // 팀 등록 여부에 따른 라디오 버튼 이벤트
  // const handleClickRadioButton = (e) => {
  //   setInputStatus(e.target.value);
  // };

  // const handleInputValue = (key) => (e) => {
  //   setTeam({ ...team, [key]: e.target.value });
  // };

  const handleTeam = (e) => {
    const { value } = e.target;
    // setSelectedDropValue(number_data.filter((el) => el.value === value)[0].id);
    setTeam(value);
  };

  const handleComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  // 모달창 내의 등록 버튼을 눌렀을 때 일어날 이벤트
  const onSubmit = async () => {
    if (team === '') {
      alert('팀명을 입력해주세요');
    } else {
      try {
        await axios.post(
          `${process.env.REACT_APP_URL}/admin/management/pre-team`,
          {
            team_name: team,
            number_id: numberId,
            comment: comment,
          }
        );
        setLoading(false);
        setModalOpen(false);
        setTeam('');
        setNumberId('');
        setComment('');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleExit = () => {
    setModalOpen(false);
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <h2>팀 정보 등록</h2>
      <h4>팀 명</h4>
      {/* <Autocomplete
      id='combo-box-demo'
      options={team_data}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='해당하는 팀 번호를 선택하세요'
          onChange={handleDropTeam}
        />
      )}
    /> */}
      <TextField
        item='outlined-basic'
        label='팀명(seb_00_pre(main)_000)'
        variant='outlined'
        autoFocus
        value={team}
        onChange={handleTeam}
      />
      {/* <input value={team} onChange={handleTeam}></input> */}
      <h4>기타사항</h4>
      <TextField
        item='standard-basic'
        label='특이사항 작성'
        variant='standard'
        onChange={handleComment}
      />
      <br />
      <ButtonPosition>
        <MyButton variant='contained'>등록</MyButton>
      </ButtonPosition>
    </>
  );
};

export default RegisterModals;
