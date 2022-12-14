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

const UpdateModals = ({ setModalOpen, numberName }) => {
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
    // console.log(startDate, endDate, comment);
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
          <h2>?????? ?????? ??????</h2>
          <h4>??????</h4>
          <TextField
            id='outlined-basic'
            label='?????????'
            variant='outlined'
            value={numberName}
            readOnly
          />
          <h4>???????????? ??????</h4>
          <div>???????????? ?????? ????????? ??????????????????</div>
          <br />
          <div>???????????? ?????????</div>
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
          <div>???????????? ?????????</div>
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
          <h4>????????????</h4>
          <TextField
            id='standard-basic'
            label='???????????? ??????'
            variant='standard'
            onChange={handleComment}
          />
          <br />
          <ButtonPosition>
            <MyButton
              variant='contained'
              onClick={() => {
                Swal.fire({
                  title: '?????? ????????? ?????????????????????????',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: '???',
                  cancelButtonText: '?????????',
                  reverseButtons: false,
                }).then((result) => {
                  if (result.isDismissed) {
                    handleExit();
                  } else if (result.isConfirmed) {
                    onSubmit();
                    Swal.fire({
                      title: '?????? ????????? ?????????????????????.',
                      confirmButtonText: 'OK',
                      icon: 'success',
                    });
                  }
                });
              }}
            >
              ??????
            </MyButton>
          </ButtonPosition>
        </div>
      ) : null}
    </>
  );
};

export default UpdateModals;
