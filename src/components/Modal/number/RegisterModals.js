import { useState } from 'react';
import axios from 'axios';
import Loading from 'utils/LoadingIndicator';
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

// 기수 선택을 위한 드롭다운 상수 데이터
// const number_data = [
//   { label: 'seb_40' },
//   { label: 'seb_41' },
//   { label: 'seb_42' },
//   { label: 'seb_43' },
// ];

// // 기수 이름은 seb_은 지정된 값. 숫자는 마지막 숫자 +1로 자동으로 추가되도록(=> number_name)?
const RegisterModals = ({ setModalOpen }) => {
  // // 기수 선택 드롭다운 상태 관리
  // const [selectedDropValue, setSelectedDropValue] =
  //   useState('기수를 선택하세요');
  // const [inputStatus, setInputStatus] = useState('');
  const [numberName, setNumberName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [comment, setComment] = useState('');
  const [createdDate, setCreatedDate] = useState(new Date());
  const [updatedDate, setUpdatedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // 기수 선택을 위한 input value
  const handleNumber = (e) => {
    const { value } = e.target;
    // setSelectedDropValue(number_data.filter((el) => el.value === value)[0].id);
    setNumberName(value);
  };

  const handleComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  // 기수 종료 여부를 위한 라디오버튼
  // const handleClickRadioButton = (e) => {
  //   setInputStatus(e.target.value);
  // };

  // const handleInputValue = (key) => (e) => {
  //   setNumber({ ...number, [key]: e.target.value });
  // };

  // 모달창 내의 등록 버튼을 눌렀을 때 일어날 이벤트
  const onSubmit = async () => {
    // if (!numberName) {
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
    // console.log(numberName, startDate, endDate, comment);
    try {
      await axios.post(`${process.env.REACT_APP_URL}/admin/management/number`, {
        number_name: numberName,
        start_date: startDate,
        end_date: endDate,
        comment: comment,
        created_date: createdDate,
        updated_date: updatedDate,
      });
      setLoading(false);
      setModalOpen(false);
      setNumberName('');
      setComment('');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <h4>기수</h4>
      <input value={numberName} onChange={handleNumber} required></input>
      {/* <Autocomplete
        id='combo-box-demo'
        options={number_data}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='기수를 선택하세요'
            value={numberName}
            onChange={handleDropNumber}
          />
        )}
      /> */}
      <h4>프로젝트 기간</h4>
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
      <h4>기타 코멘트</h4>
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
            등록
          </MyButton>
        </ButtonPosition>
      </StylesProvider>
    </>
  );
};

export default RegisterModals;
