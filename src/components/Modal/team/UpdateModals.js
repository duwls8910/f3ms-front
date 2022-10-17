import { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import { StylesProvider } from '@material-ui/core';
import styled from 'styled-components';

export const ButtonPosition = styled.div`
  position: absolute;
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
  const [team, setTeam] = useState({
    team_id: 'seb_40_pre_001',
    comment: '',
    is_closed: false,
  });
  // pre/main 체크 여부를 위한 상태변경
  const [isChecked, setCheck] = useState([]);
  const [inputStatus, setInputStatus] = useState('');
  // console.log({ inputStatus });

  const handleClickRadioButton = (e) => {
    setInputStatus(e.target.value);
  };

  const handleInputValue = (key) => (e) => {
    setTeam({ ...team, [key]: e.target.value });
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
    await axios
      .post(`${process.env.REACT_APP_URL}/admin/management/team`, {
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
        },
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h4>팀명(필수 입력)</h4>
      <TextField
        item='outlined-basic'
        label='팀명(seb_00_pre(main)_000)'
        variant='outlined'
        autoFocus
        onChange={handleInputValue}
      />
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
      <h4>기타 코멘트(선택사항)</h4>
      <TextField
        item='standard-basic'
        label='특이사항 작성'
        variant='standard'
      />
      <br />
      <FormControl>
        <FormLabel item='number-row-radio-buttons-group-label'>
          팀 종료 여부
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby='number-row-radio-buttons-group-label'
          name='number-row-radio-buttons-group'
          value={inputStatus}
          onChange={handleClickRadioButton}
        >
          <FormControlLabel
            control={<Radio />}
            value='종료'
            label='종료'
            onChange={handleInputValue}
          />
          <FormControlLabel
            control={<Radio />}
            value='종료 X'
            label='종료 X'
            onChange={handleInputValue}
          />
        </RadioGroup>
      </FormControl>
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
