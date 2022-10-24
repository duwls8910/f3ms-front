// 해당 기수 조회 페이지
// 전체 조회하는 페이지에서 기수를 클릭했을 때 보여질 조회 페이지
// 여기서 기수 정보를 수정하고 삭제하는 모달 띄우기
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from 'utils/LoadingIndicator';
import UpdateModals from 'components/Modal/number/UpdateModals';
import DeleteModals from 'components/Modal/number/DeleteModals';
import { Box, Stack, Button } from '@mui/material';
import {
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
  StylesProvider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SpecificNumber = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [numberData, setNumberData] = useState([]);

  const classes = useStyles();

  // 해당 기수 조회 시
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
        {numberData ? (
          <TableContainer>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>기수명</TableCell>
                  <TableCell align='right'>시작일</TableCell>
                  <TableCell align='right'>종료일</TableCell>
                  <TableCell align='right'>기타사항</TableCell>
                  <TableCell align='right'>기수종료여부</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {numberData.map((row) => (
                  <TableRow key={nanoid()}>
                    <TableCell component='th' scope='row'>
                      {row.id}
                    </TableCell>
                    <TableCell align='right'>{row.start_date}</TableCell>
                    <TableCell align='right'>{row.end_date}</TableCell>
                    <TableCell align='right'>{row.comment}</TableCell>
                    <TableCell align='right'>{row.is_closed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          '해당 기수의 정보를 찾을 수 없습니다'
        )}
        <Stack spacing={1} direction='row'>
          <StylesProvider injectFirst>
            <NumberButton variant='contained' onClick={openModalHandler}>
              수정
            </NumberButton>
          </StylesProvider>
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
                    <UpdateModals setModalOpen={setUpdateOpen} />
                  </div>
                </ModalView>
              </ModalBackdrop>
            ) : null}
          </ModalContainer>
          <StylesProvider injectFirst>
            <NumberButton variant='contained' onClick={openDeleteHandler}>
              삭제
            </NumberButton>
          </StylesProvider>
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
        </Stack>
      </Box>
    </>
  );
};

export default SpecificNumber;
