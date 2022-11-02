import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Stack, Button } from '@mui/material';
import Swal from 'sweetalert2';

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`;

export const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
`;

export const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: white; */
  width: 200px;
  height: 100px;
  border-radius: 0.5rem;
  position: relative;

  > div.close-btn {
    position: relative;
    bottom: 10px;
    font-size: 22px;
    cursor: pointer;
  }
`;

export const OkButtonPosition = styled.div`
  position: absolute;
  right: 80%;
  transform: translateX(50%);
  margin: 4rem 0;
`;

export const NoButtonPosition = styled.div`
  position: absolute;
  left: 40%;
  transform: translateX(50%);
  margin: 4rem 0;
`;

export const MyButton = styled(Button)`
  border: 0;
  border-radius: 3px;
  height: 48px;
  padding: 0 30px;
`;

const DeleteModals = () => {
  let { id } = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleClick = () => {
    axios
      .patch(`${process.env.REACT_APP_URL}/admin/management/pre-team/${id}`, {
        is_opened: false,
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
    setOpenDeleteModal(openDeleteModal);
  };

  const closeModal = () => {
    axios
      .patch(`${process.env.REACT_APP_URL}/admin/management/pre-team/${id}`, {
        is_opened: false,
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
    setOpenDeleteModal(openDeleteModal);
  };

  return (
    <>
      <ModalContainer>
        <div>
          해당 팀의 정보를
          <br />
          비활성화하시겠습니까?
        </div>
        <Stack spacing={1} direction='row'>
          <div>
            <OkButtonPosition>
              <MyButton
                variant='contained'
                onClick={() => {
                  Swal.fire({
                    title: '정말 비활성화 하시겠습니까?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    reverseButtons: false,
                  }).then((result) => {
                    if (result.isDismissed) {
                      closeModal();
                    } else if (result.isConfirmed) {
                      handleClick();
                      Swal.fire({
                        title: '해당 팀은 비활성화되었습니다.',
                        confirmButtonText: 'OK',
                        icon: 'success',
                      });
                    }
                  });
                }}
              >
                예
              </MyButton>
            </OkButtonPosition>
            <NoButtonPosition>
              <MyButton variant='contained' onClick={closeModal}>
                아니오
              </MyButton>
            </NoButtonPosition>
          </div>
        </Stack>
      </ModalContainer>
    </>
  );
};

export default DeleteModals;
