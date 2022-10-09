import { useState } from 'react';
// import axios from 'axios';
// import { numberName, isStart, isEnd, isClosed } from 'utils/validator';
// import numberDummy from 'static/numberDummy';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import {
  Autocomplete,
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

// 기수 선택을 위한 드롭다운 상수 데이터
const number_data = [
  { label: 'seb_40' },
  { label: 'seb_41' },
  { label: 'seb_42' },
  { label: 'seb_43' },
];

// // 기수 이름은 seb_은 지정된 값. 숫자는 마지막 숫자 +1로 자동으로 추가되도록(=> number_name)?
const RegisterModals = () => {
  const [number, setNumber] = useState({
    number_id: 40,
    start_date: new Date(),
    end_date: new Date(),
    comment: '',
    is_closed: false,
  });
  // 기수 선택 드롭다운 상태 관리
  const [selectedDropValue, setSelectedDropValue] =
    useState('기수를 선택하세요');
  const [numberError, setNumberError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [closedError, setIsClosedError] = useState(false);
  const [inputStatus, setInputStatus] = useState('');
  // console.log({ inputStatus });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 기수 선택을 위한 드롭다운 이벤트
  const handleDropNumber = (e) => {
    const { value } = e.target;
    setSelectedDropValue(number_data.filter((el) => el.value === value)[0].id);
  };

  // 기수 종료 여부를 위한 라디오버튼 이벤트
  const handleClickRadioButton = (e) => {
    setInputStatus(e.target.value);
  };

  const handleInputValue = (key) => (e) => {
    setNumber({ ...number, [key]: e.target.value });
  };

  // 모달창 내의 등록 버튼을 눌렀을 때 일어날 이벤트
  const onSubmit = async () => {
    const data = {
      number_id: 40,
      start_date: '2022-10-14',
      end_date: '2022-12-16',
      comment: 'dd',
    };
    await fetch('http://localhost:8080/admin/management/number', {
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
    //     `http://localhost:8080/admin/management/number`,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         withCredentials: true,
    //       },
    //     }.then((res) => console.log(res))
    //   )
    //   .catch((err) => console.log(err));
    // }
  };

  // 시,분,초 타이머 기능
  // const [time, setTime] = useState('::');

  // const currentTime = () => {
  //   const date = new Date();
  //   const hours = String(date.getHours()).padStart(2, '0');
  //   const minutes = String(date.getMinutes()).padStart(2, '0');
  //   const seconds = String(date.getSeconds()).padStart(2, '0');
  //   setTime(`${hours}: ${minutes}: ${seconds}`);
  // };

  // const startTime = () => {
  //   setInterval(currentTime, 10);
  // };

  // startTime();

  return (
    <>
      <h4>기수(필수 입력)</h4>
      <Autocomplete
        id='combo-box-demo'
        options={number_data}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='기수를 선택하세요'
            onChange={handleDropNumber}
          />
        )}
      />
      <h4>프로젝트 기간(필수 선택)</h4>
      <div>프로젝트 진행 기간을 선택해주세요</div>
      <br />
      <div>프로젝트 시작일</div>
      {/* <div>{time}</div> */}
      <DatePicker
        dateFormat='yyyy-MM-dd'
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        locale={ko}
        selectsStart
        minDate={new Date()}
        startDate={startDate}
        endDate={endDate}
      />
      <div>프로젝트 종료일</div>
      <DatePicker
        dateFormat='yyyy-MM-dd'
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        locale={ko}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      <h4>기타 코멘트(선택사항)</h4>
      <TextField id='standard-basic' label='특이사항 작성' variant='standard' />
      <br />
      <FormControl>
        <FormLabel id='number-row-radio-buttons-group-label'>
          기수 종료 여부
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
