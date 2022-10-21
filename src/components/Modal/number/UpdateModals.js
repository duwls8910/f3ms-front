import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { TextField, Button } from '@mui/material';
import { StylesProvider } from '@material-ui/core';
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

const UpdateModals = ({ setModalOpen }) => {
  const [newNumber, setNewNumber] = useState({
    number_id: '',
    new_number_id: '',
    start_date: new Date(),
    new_start_date: new Date(),
    end_date: new Date(),
    new_end_date: new Date(),
    comment: '',
    new_comment: '',
    is_closed: false,
    new_is_closed: false,
  });
  // const [selectedDropValue, setSelectedDropValue] =
  //   useState('기수를 선택하세요');
  const [inputStatus, setInputStatus] = useState('');
  const [numberName, setNumberName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [comment, setComment] = useState('');

  const handleNumber = (e) => {
    const { value } = e.target;
    // setSelectedDropValue(number_data.filter((el) => el.value === value)[0].id);
    setNumberName(value);
  };

  const handleChange = (key) => (e) => {
    setNewNumber({ ...newNumber, [key]: e.target.value });
  };

  const handleComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  // const handleClickRadioButton = (e) => {
  //   setInputStatus(e.target.value);
  // };

  const onSubmit = async () => {
    console.log(numberName, startDate, endDate, comment, inputStatus);
    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/admin/management/number/${numberName}`,
        {
          start_date: startDate,
          end_date: endDate,
          comment: comment,
          is_closed: inputStatus,
        }
      );
      setModalOpen(false);
      setNumberName('');
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h4>기수</h4>
      <input value={numberName} onChange={handleNumber}></input>
      {/* <Autocomplete
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
      /> */}
      <h4>프로젝트 기간(필수 선택)</h4>
      <div>프로젝트 진행 기간을 선택해주세요</div>
      <br />
      <div>프로젝트 시작일</div>
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
      <TextField
        id='standard-basic'
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

export default UpdateModals;
