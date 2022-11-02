import React, { useState } from 'react';
import axios from 'axios';
import Loading from 'utils/LoadingIndicator';
import { Autocomplete, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import styled from 'styled-components';

export const ButtonPosition = styled.div`
  position: absolute;
  top: 76%;
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

const position_data = [{ label: '프론트엔드' }, { label: '백엔드' }];

const MemberRegister = ({ setModalOpen }) => {
  const [selectedDropValue, setSelectedDropValue] =
    useState('포지션을 선택하세요');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  // const handleInputValue = (key) => (e) => {
  // setName({ ...name, [key]: e.target.value });
  // };

  const handleMember = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleDropPosition = (e) => {
    const { value } = e.target;
    setSelectedDropValue(
      position_data.filter((el) => el.value === value)[0].id
    );
  };

  const onSubmit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_URL}/admin/management/member`, {
        member_name: name,
        position_cd: selectedDropValue,
        comment: comment,
      });
      setLoading(false);
      setModalOpen(false);
      setName('');
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
      {loading ? <Loading /> : null}
      <h2>수강생 정보 등록</h2>
      <h4>수강생</h4>
      <TextField
        id='outlined-basic'
        label='이름'
        variant='outlined'
        autoFocus
        value={name}
        onChange={handleMember}
      />
      <br />
      <br />
      <div>학습 코스 구분</div>
      <Autocomplete
        id='combo-box-demo'
        options={position_data}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='해당하는 학습 코스를 선택하세요'
            onChange={handleDropPosition}
          />
        )}
      />
      <br />
      <div>기타사항</div>
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
              title: '수강생의 정보를 등록하시겠습니까?',
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
              } else if (name === '') {
                Swal.fire({
                  title: '수강생의 이름을 입력하지 않았습니다',
                  text: '이름을 입력해주세요',
                  icon: 'error',
                });
                result.isDenied();
              } else if (selectedDropValue === '포지션을 선택하세요') {
                Swal.fire({
                  title: '학습 코스를 선택하지 않았습니다',
                  text: '학습 코스를 선택해주세요',
                  icon: 'error',
                });
                result.isDenied();
              } else if (result.isConfirmed) {
                onSubmit();
                Swal.fire({
                  title: '수강생의 정보가 등록되었습니다.',
                  confirmButtonText: 'OK',
                  icon: 'success',
                });
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

export default MemberRegister;
