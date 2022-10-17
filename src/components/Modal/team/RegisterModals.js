import { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Autocomplete,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import { StylesProvider } from '@material-ui/core';
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

const team_data = [
  { label: '001' },
  { label: '002' },
  { label: '003' },
  { label: '004' },
];

const semester = [
  { id: 0, data: 'pre' },
  { id: 1, data: 'main' },
];

const RegisterModals = () => {
  const [team, setTeam] = useState({
    team_id: 'seb_40_pre_001',
    comment: '',
    is_closed: false,
  });

  const [selectedDropValue, setSelectedDropValue] =
    useState('해당하는 팀 번호를 선택하세요');

  // pre/main 체크 여부를 위한 상태변경
  const [isChecked, setCheck] = useState([]);

  // 라디오 버튼 상태변경
  const [inputStatus, setInputStatus] = useState('');

  const handleDropTeam = (e) => {
    const { value } = e.target;
    setSelectedDropValue(team_data.filter((el) => el.value === value)[0].id);
  };

  // pre/main체크 이벤트
  const handleChecked = (checked, id) => {
    if (checked) {
      setCheck([...isChecked, id]);
    } else if (!checked) {
      setCheck(isChecked.filter((el) => el !== id));
    }
  };

  const removeCheck = (id) => {
    setCheck(isChecked.filter((el) => el !== id));
  };

  // 팀 등록 여부에 따른 라디오 버튼 이벤트
  const handleClickRadioButton = (e) => {
    setInputStatus(e.target.value);
  };

  const handleInputValue = (key) => (e) => {
    setTeam({ ...team, [key]: e.target.value });
  };

  // 모달창 내의 등록 버튼을 눌렀을 때 일어날 이벤트
  const onSubmit = async () => {
    const data = {
      team_name: 'seb_40_pre_001',
      is_closed: false,
    };
    await fetch(`${process.env.REACT_APP_URL}/admin/management/team`, {
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
    // await axios
    //   .post(`${process.env.REACT_APP_URL}/admin/management/team`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       withCredentials: true,
    //     },
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <>
      <h4>팀명(필수 입력)</h4>
      <Autocomplete
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
      />
      <div>
        {isChecked.length === 0 && <div>{'pre/main을 선택해주세요'}</div>}
        {semester.map((id) => {
          return (
            <input
              type='checkbox'
              value={id.data}
              onChange={(e) => handleChecked(e.target.checked, e.target.value)}
              checked={isChecked.includes(id.data) ? true : false}
            />
          );
        })}
      </div>
      <div>
        {isChecked.map((id) => {
          return (
            <div>
              <div key={id}>
                <div>{id}</div>
              </div>
              <div onClick={() => removeCheck(id)} />
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
            등록
          </MyButton>
        </ButtonPosition>
      </StylesProvider>
    </>
  );
};

export default RegisterModals;
