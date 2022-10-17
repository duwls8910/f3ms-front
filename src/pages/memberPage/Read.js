// 해당하는 팀의 멤버 조회 페이지
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import MemberList from 'pages/memberPage/memberList';
import RegisterModals from 'components/Modal/member/RegisterModals';
import UpdateModals from 'components/Modal/member/UpdateModals';
import DeleteModals from 'components/Modal/member/DeleteModals';
import { Box, Stack, Button } from '@mui/material';
import { StylesProvider } from '@material-ui/core';

export const EntireMemberPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

export const MemberButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 0;
  border-radius: 3px;
  height: 48px;
  padding: 0 30px;
`;

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
  width: 400px;
  height: 600px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  background-color: rgb(244, 230, 193);
  position: fixed;
`;

export const ModalView = styled.div.attrs((props) => ({
  role: `dialog`,
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  position: relative;

  > div.close-btn {
    position: absolute;
    bottom: 320px;
    left: 17rem;
    cursor: pointer;
  }
`;

const ReadMember = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  // const navigate = useNavigate();

  // 전체 멤버 데이터 조회 시
  // const getMember = async () => {
  //   const json = await (
  //     await fetch(`${process.env.REACT_APP_URL}/admin/management/member`)
  //   ).json();
  //   setNumber(json.data[0]);
  // };

  // useEffect(() => {
  //   getMember();
  // }, []);
  // const getMember = memberDummy.filter((member) => member.member === '김코딩');

  // validation check(필수 조건을 입력했을 때만 넘어갈 수 있게끔)
  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const openUpdateHandler = () => {
    setUpdateOpen(true);
  };

  const closeUpdateHandler = () => {
    setUpdateOpen(false);
  };

  const openDeleteHandler = () => {
    setDeleteOpen(true);
  };

  const closeDeleteHandler = () => {
    setDeleteOpen(false);
  };

  return (
    <>
      <Box>
        <EntireMemberPage>
          <div>
            <MemberList />
          </div>
        </EntireMemberPage>
        <div>
          <Stack spacing={1} direction='row'>
            <StylesProvider injectFirst>
              <MemberButton variant='contained' onClick={openModalHandler}>
                등록
              </MemberButton>
            </StylesProvider>
            <ModalContainer>
              {modalOpen ? (
                <ModalBackdrop onClick={openModalHandler}>
                  <ModalView
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <div className='close-btn' onClick={closeModalHandler}>
                      &times;
                    </div>
                    <div className='desc'>
                      <RegisterModals />
                    </div>
                  </ModalView>
                </ModalBackdrop>
              ) : null}
            </ModalContainer>
            <StylesProvider injectFirst>
              <MemberButton variant='contained' onClick={openUpdateHandler}>
                수정
              </MemberButton>
            </StylesProvider>
            <ModalContainer>
              {updateOpen ? (
                <ModalBackdrop onClick={openUpdateHandler}>
                  <ModalView
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <div className='close-btn' onClick={closeUpdateHandler}>
                      &times;
                    </div>
                    <div className='desc'>
                      <UpdateModals />
                    </div>
                  </ModalView>
                </ModalBackdrop>
              ) : null}
            </ModalContainer>
            <StylesProvider injectFirst>
              <MemberButton variant='contained' onClick={openDeleteHandler}>
                삭제
              </MemberButton>
            </StylesProvider>
            <ModalContainer>
              {deleteOpen ? (
                <ModalBackdrop onClick={openDeleteHandler}>
                  <ModalView
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <div className='close-btn' onClick={closeDeleteHandler}>
                      &times;
                    </div>
                    <div className='desc'>
                      <DeleteModals />
                    </div>
                  </ModalView>
                </ModalBackdrop>
              ) : null}
            </ModalContainer>
          </Stack>
        </div>
      </Box>
    </>
  );
};

export default ReadMember;
