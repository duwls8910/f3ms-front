import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from 'utils/LoadingIndicator';
import UpdateModals from 'components/Modal/team/UpdateModals';
import DeleteModals from 'components/Modal/team/DeleteModals';
import { Box, Stack, Button } from '@mui/material';
import { StylesProvider } from '@material-ui/core';
import styled from 'styled-components';

export const TeamButton = styled(Button)`
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
  flex-direction: column;
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
  height: 550px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  background-color: rgb(244, 230, 193);
  position: fixed;
`;

export const DeleteModalBackDrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
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
    bottom: 290px;
    left: 17rem;
    cursor: pointer;
  }
`;

export const DeleteModalView = styled.div.attrs((props) => ({
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
    bottom: 150px;
    left: 16rem;
    cursor: pointer;
  }
`;

const SpecificNumber = () => {
  const [loading, setLoading] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    const getSpecNumber = async () => {
      const response = await axios(
        `${process.env.REACT_APP_URL}/admin/management/number/:id`
      );
      getSpecNumber(response.data);
      setLoading(false);
    };
    getSpecNumber();
  }, []);

  const openModalHandler = () => {
    setUpdateOpen(true);
  };

  const closeModalHandler = () => {
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
      {loading ? <Loading /> : null}
      <Box>
        <Stack spacing={1} direction='row'>
          <StylesProvider injectFirst>
            <TeamButton variant='contained' onClick={openModalHandler}>
              수정
            </TeamButton>
            <ModalContainer>
              {updateOpen ? (
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
                      <UpdateModals />
                    </div>
                  </ModalView>
                </ModalBackdrop>
              ) : null}
            </ModalContainer>
            <TeamButton variant='contained' onClick={openDeleteHandler}>
              삭제
            </TeamButton>
            <ModalContainer>
              {deleteOpen ? (
                <DeleteModalBackDrop onClick={openDeleteHandler}>
                  <DeleteModalView
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
                  </DeleteModalView>
                </DeleteModalBackDrop>
              ) : null}
            </ModalContainer>
          </StylesProvider>
        </Stack>
      </Box>
    </>
  );
};

export default SpecificNumber;
