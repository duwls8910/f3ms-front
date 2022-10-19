import React, { useState } from 'react';
import DeleteModals from 'components/Modal/number/DeleteModals';
import { Button } from '@mui/material';
import { StylesProvider } from '@material-ui/core';
import styled from 'styled-components';

export const NumberButton = styled(Button)`
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

const NumberDetail = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openDeleteHandler = () => {
    setDeleteOpen(true);
  };

  const closeDeleteHandler = () => {
    setDeleteOpen(false);
  };

  return (
    <>
      <div>
        <StylesProvider injectFirst>
          <NumberButton variant='contained' onClick={openDeleteHandler}>
            기수 삭제
          </NumberButton>
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
        </StylesProvider>
      </div>
    </>
  );
};

export default NumberDetail;
