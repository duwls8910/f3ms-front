import { useState } from 'react';
import axios from 'axios';
import Loading from 'utils/LoadingIndicator';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import styled from 'styled-components';

export const ButtonPosition = styled.div`
  position: absolute;
  top: 79%;
  right: 55%;
  transform: translateX(50%);
  margin: 4rem 0;
`;

export const MyButton = styled(Button)`
  border: 0;
  border-radius: 0.5rem;
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

  // 기수 작성을 위한 input value
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
      setCreatedDate('');
      setUpdatedDate('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleExit = () => {
    setModalOpen(false);
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <h2>기수 정보 등록</h2>
      <h4>기수</h4>
      <TextField
        item='outlined-basic'
        label='팀명(seb_00_pre(main)_000)'
        variant='outlined'
        autoFocus
        value={numberName}
        onChange={handleNumber}
      />
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
      <h4>기타사항</h4>
      <TextField
        id='standard-basic'
        label='특이사항 작성'
        variant='standard'
        onChange={handleComment}
      />
      <br />
      <ButtonPosition>
        <MyButton
          variant='contained'
          onClick={() => {
            Swal.fire({
              title: '기수 정보를 등록하시겠습니까?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '네',
              cancelButtonText: '아니오',
              reverseButtons: false,
            }).then((result) => {
              if (numberName === '') {
                Swal.fire({
                  title: '기수명을 입력하지 않았습니다',
                  text: '기수명을 입력해주세요',
                  icon: 'warning',
                });
                result.isDenied();
              } else if (result.isConfirmed) {
                onSubmit();
                Swal.fire({
                  title: '기수 정보가 등록되었습니다.',
                  confirmButtonText: 'Ok',
                });
              } else if (result.isDismissed) {
                handleExit();
              }
            });
          }}
        >
          등록
        </MyButton>
      </ButtonPosition>
    </>
  );
};

export default RegisterModals;
