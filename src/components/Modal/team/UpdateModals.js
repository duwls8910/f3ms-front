import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { StylesProvider } from '@material-ui/core';
import styled from 'styled-components';

export const ButtonPosition = styled.div`
  position: absolute;
  top: 200%;
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

const semester = [
  { item: 0, data: 'pre' },
  { item: 1, data: 'main' },
];

const RegisterModals = () => {
  const [newTeam, setNewTeam] = useState({
    team_id: '',
    new_team_id: '',
    comment: '',
    new_comment: '',
    is_closed: false,
    new_is_closed: false,
  });
  const [teamName, setTeamName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');
  const [inputStatus, setInputStatus] = useState('');
  // pre/main 체크 여부를 위한 상태변경
  const [isChecked, setCheck] = useState([]);

  // const handleClickRadioButton = (e) => {
  //   setInputStatus(e.target.value);
  // };

  const handleTeam = (e) => {
    const { value } = e.target;
    // setSelectedDropValue(member_data.filter((el) => el.value === value)[0].id);
    setTeamName(value);
  };

  const handleTitle = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleContent = (e) => {
    const { value } = e.target;
    setContent(value);
  };

  const handleInputValue = (key) => (e) => {
    setNewTeam({ ...newTeam, [key]: e.target.value });
  };

  const handleComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  // pre/main체크 이벤트
  const handleChecked = (checked, item) => {
    if (checked) {
      setCheck([...isChecked, item]);
    } else if (!checked) {
      setCheck(isChecked.filter((el) => el !== item));
    }
  };

  const removeCheck = (item) => {
    setCheck(isChecked.filter((el) => el !== item));
  };

  // 모달창 내의 등록 버튼을 눌렀을 때 일어날 이벤트
  const onSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/admin/management/team/${teamName}`,
        {
          comment: comment,
          is_closed: inputStatus,
        }
      );
      setTeamName('');
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h4>팀 명</h4>
      {/* <TextField
        item='outlined-basic'
        label='팀명(seb_00_pre(main)_000)'
        variant='outlined'
        autoFocus
        onChange={handleInputValue}
      /> */}
      <input value={teamName} onChange={handleTeam}></input>
      <div>
        {isChecked.length === 0 && <div>{'pre/main을 선택해주세요'}</div>}
        {semester.map((item) => {
          return (
            <input
              type='checkbox'
              value={item.data}
              onChange={(e) => handleChecked(e.target.checked, e.target.value)}
              checked={isChecked.includes(item.data) ? true : false}
            />
          );
        })}
      </div>
      <div>
        {isChecked.map((item) => {
          return (
            <div>
              <div key={item}>
                <div>{item}</div>
              </div>
              <div onClick={() => removeCheck(item)} />
            </div>
          );
        })}
      </div>
      <h4>제목</h4>
      <input value={title} onChange={handleTitle}></input>
      <h4>내용</h4>
      <input value={content} onChange={handleContent}></input>
      <h4>기타 코멘트</h4>
      <TextField
        item='standard-basic'
        label='특이사항 작성'
        variant='standard'
        onChange={handleComment}
      />
      <br />
      <StylesProvider injectFirst>
        <ButtonPosition>
          <MyButton variant='contained' onClick={onSubmit}>
            수정
          </MyButton>
        </ButtonPosition>
      </StylesProvider>
    </>
  );
};

export default RegisterModals;
