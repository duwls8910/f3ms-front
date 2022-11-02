import React, { useState } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import styled from 'styled-components';

export const ButtonPosition = styled.div`
  position: absolute;
  top: 83%;
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

const position_data = [{ label: '프론트엔드' }, { label: '백엔드' }];

const MemberRegister = ({ setModalOpen }) => {
  const [newMember, setNewMember] = useState({
    member_id: '',
    new_member_id: '',
    position_cd: '',
    new_position_cd: '',
    pre_team_id: '',
    new_pre_team_id: '',
    main_team_id: '',
    new_main_team_id: '',
    comment: '',
    new_comment: '',
  });
  const [memberName, setMemberName] = useState('');
  const [position, setPosition] = useState('');
  const [preTeam, setPreTeam] = useState('');
  const [mainTeam, setMainTeam] = useState('');
  const [comment, setComment] = useState('');
  const [selectedDropValue, setSelectedDropValue] =
    useState('해당하는 학습 코스를 선택하세요');

  const handleDropPosition = (e) => {
    const { value } = e.target;
    setSelectedDropValue(
      position_data.filter((el) => el.value === value)[0].id
    );
  };

  // const handleMember = (e) => {
  //   const { value } = e.target;
  //   // setSelectedDropValue(member_data.filter((el) => el.value === value)[0].id);
  //   setMemberName(value);
  // };

  // const handleChange = (key) => (e) => {
  //   setNewMember({ ...newMember, [key]: e.target.value });
  // };

  const handleComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handlePreTeam = (e) => {
    const { value } = e.target;
    setPreTeam(value);
  };

  const handleMainTeam = (e) => {
    const { value } = e.target;
    setMainTeam(value);
  };

  const onSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/admin/management/member/${memberName}`,
        {
          position: position.position,
          comment: comment.comment,
        }
      );
      setModalOpen(false);
      setNewMember('');
      setPosition('');
      setComment('');
      setPreTeam('');
      setMainTeam('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleExit = () => {
    setModalOpen(false);
  };

  return (
    <>
      {newMember ? (
        <div>
          <h2>수강생 정보 수정</h2>
          <h4>수강생</h4>
          <TextField
            id='outlined-basic'
            label='이름'
            variant='outlined'
            value={memberName}
            readOnly
          />
          <h4>학습 코스 구분</h4>
          {selectedDropValue ? (
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
          ) : null}
          <h4>pre팀명</h4>
          <TextField
            id='standard-basic'
            variant='standard'
            value={preTeam}
            onChange={handlePreTeam}
          />
          <h4>main팀명</h4>
          <TextField
            id='standard-basic'
            variant='standard'
            value={mainTeam}
            onChange={handleMainTeam}
          />
          <h4>기타사항</h4>
          <TextField
            id='standard-basic'
            label='특이사항 작성'
            variant='standard'
            onChange={handleComment}
          />
          <ButtonPosition>
            <MyButton
              variant='contained'
              onClick={() => {
                Swal.fire({
                  title: '수강생의 정보를 수정하시겠습니까?',
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
                      title: '수강생 정보가 수정되었습니다.',
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

export default MemberRegister;
