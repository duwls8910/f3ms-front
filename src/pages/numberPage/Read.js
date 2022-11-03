import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from 'utils/LoadingIndicator';
import RegisterModals from 'components/Modal/number/RegisterModals';
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
import axios from 'axios';
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

export const numberRows = [
  {
    id: '',
    name: '',
    start_date: '',
    end_date: '',
    comment: '',
    is_closed: '',
    created_date: '',
    updated_date: '',
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ReadNumber = () => {
  const [number, setNumber] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(numberRows);
  // const [searched, setSearched] = useState('');
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const getNumber = async () => {
      const response = await axios(
        `${process.env.REACT_APP_URL}/admin/management/number`
      );
      setNumber(response.data);
      setRows(response.data);
      setLoading(false);
    };
    getNumber();
  }, []);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  // 기수 진행 여부 체크박스 표시를 위한 이벤트(handleChecked, removeCheck)
  // const handleChecked = (checked, id) => {
  //   if (checked) {
  //     setSelectedNumber([...selectedNumber, id]);
  //   } else if (!checked) {
  //     setSelectedNumber(selectedNumber.filter((el) => el !== id));
  //   }
  // };

  // const removeCheck = (id) => {
  //   setSelectedNumber(selectedNumber.filter((el) => el !== id));
  // };

  return (
    <>
      {loading ? <Loading /> : null}
      <Box>
        <div>
          <Stack spacing={1} direction='row'>
            <NumberButton variant='contained' onClick={openModalHandler}>
              등록
            </NumberButton>
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
                      <RegisterModals setModalOpen={setModalOpen} />
                    </div>
                  </ModalView>
                </ModalBackdrop>
              ) : null}
            </ModalContainer>
          </Stack>
        </div>
        {number ? (
          <TableContainer>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>기수명</TableCell>
                  <TableCell align='center'>시작일</TableCell>
                  <TableCell align='center'>종료일</TableCell>
                  <TableCell align='center'>기타사항</TableCell>
                  <TableCell align='center'>기수종료여부</TableCell>
                  <TableCell align='center'>생성날짜</TableCell>
                  <TableCell align='center'>수정날짜</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={nanoid()}>
                    <TableCell component='th' scope='row'>
                      <Link
                        to={`/admin/management/number/${row.id}`}
                      >{`seb_${row.number_name}`}</Link>
                    </TableCell>
                    <TableCell align='center'>{row.start_date}</TableCell>
                    <TableCell align='center'>{row.end_date}</TableCell>
                    <TableCell align='center'>
                      {row.comment ? row.comment : '-'}
                    </TableCell>
                    <TableCell align='center'>{row.is_closed}</TableCell>
                    <TableCell align='center'>{row.created_date}</TableCell>
                    <TableCell align='center'>{row.updated_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </Box>
    </>
  );
};

export default ReadNumber;
