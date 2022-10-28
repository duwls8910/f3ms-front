// 해당 기수 조회 페이지
// 전체 조회하는 페이지에서 기수를 클릭했을 때 보여질 조회 페이지
// 여기서 기수 정보를 수정하고 삭제하는 모달 띄우기
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
  background-color: rgb(255, 255, 255);
  width: 400px;
  height: 600px;
  border-radius: 0.5rem;
  position: relative;

  > div.close-btn {
    position: absolute;
    bottom: 500px;
    left: 22rem;
    font-size: 22px;
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
  width: 300px;
  height: 300px;
  position: relative;
  background-color: rgb(255, 255, 255);
  border-radius: 0.5rem;

  > div.close-btn {
    position: absolute;
    bottom: 240px;
    left: 16rem;
    font-size: 22px;
    cursor: pointer;
  }
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SpecificNumber = () => {
  const [loading, setLoading] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [numberData, setNumberData] = useState({
    id: '',
    name: '',
    start_date: '',
    end_date: '',
    comment: '',
    is_closed: '',
    created_date: '',
    updated_date: '',
  });

  const classes = useStyles();

  let { id } = useParams();
  const navigate = useNavigate();

  // 해당 기수 조회 시
  useEffect(() => {
    const getSpecNumber = async () => {
      const response = await axios(
        `${process.env.REACT_APP_URL}/admin/management/number/${id}`
      );
      setNumberData(response.data);
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

  const handleNavigate = () => {
    navigate(-1);
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
                  <TableCell align='center'>시작일</TableCell>
                  <TableCell align='center'>종료일</TableCell>
                  <TableCell align='center'>기타사항</TableCell>
                  <TableCell align='center'>기수종료여부</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell component='th' scope='row'>
                  {numberData.number_name}
                </TableCell>
                <TableCell align='center'>{numberData.start_date}</TableCell>
                <TableCell align='center'>{numberData.end_date}</TableCell>
                <TableCell align='center'>
                  {numberData.comment ? numberData.comment : '-'}
                </TableCell>
                <TableCell align='center'>
                  {numberData.is_closed ? '수료' : '진행중'}
                </TableCell>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          '해당 기수의 정보를 찾을 수 없습니다'
        )}
        <Stack spacing={1} direction='row'>
          <NumberButton variant='contained' onClick={openModalHandler}>
            수정
          </NumberButton>
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
          <NumberButton variant='contained' onClick={openDeleteHandler}>
            비활성
          </NumberButton>
          <ModalContainer>
            {deleteOpen ? (
              <ModalBackdrop onClick={openDeleteHandler}>
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
              </ModalBackdrop>
            ) : null}
          </ModalContainer>
          <NumberButton variant='contained' onClick={handleNavigate}>
            뒤로가기
          </NumberButton>
        </Stack>
      </Box>
    </>
  );
};

export default SpecificNumber;
