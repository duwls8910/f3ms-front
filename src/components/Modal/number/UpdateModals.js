import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import styled from 'styled-components';

export const ButtonPosition = styled.div`
  position: absolute;
  top: 80%;
  right: 55%;
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
  });
  // const [selectedDropValue, setSelectedDropValue] =
  //   useState('기수를 선택하세요');
  const [numberName, setNumberName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [comment, setComment] = useState('');

  const { id } = useParams();

  // const handleNumber = (e) => {
  //   const { value } = e.target;
  //   // setSelectedDropValue(number_data.filter((el) => el.value === value)[0].id);
  //   setNumberName(value);
  // };

  // const handleClickRadioButton = (e) => {
  //   setInputStatus(e.target.value);
  // };

  const handleComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const onSubmit = async () => {
    console.log(startDate, endDate, comment);
    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/admin/management/number/${id}`,
        {
          start_date: startDate.startDate,
          end_date: endDate.endDate,
          comment: comment.comment,
        }
      );
      setModalOpen(false);
      setNewNumber('');
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleExit = () => {
    setModalOpen(false);
  };

  return (
    <>
      {newNumber ? (
        <div>
          <h2>기수 정보 수정</h2>
          <h4>기수</h4>
          <TextField
            id='outlined-basic'
            label='기수명'
            variant='outlined'
            value={numberName}
            readOnly
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
                  title: '기수 정보를 수정하시겠습니까?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: '네',
                  cancelButtonText: '아니오',
                  reverseButtons: false,
                }).then((result) => {
                  if (result.isDismissed) {
                    handleExit();
                  } else if (result.isConfirmed) {
                    onSubmit();
                    Swal.fire({
                      title: '기수 정보가 수정되었습니다.',
                      confirmButtonText: 'OK',
                      icon: 'success',
                    });
                  }
                });
              }}
            >
              수정
            </MyButton>
          </ButtonPosition>
        </div>
      ) : null}
    </>
  );
};

export default UpdateModals;
