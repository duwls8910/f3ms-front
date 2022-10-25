// 전체 기수 조회 페이지
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  StylesProvider,
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
  width: 400px;
  height: 550px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  background-color: rgb(156, 165, 182);
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
    font-size: 22px;
    cursor: pointer;
  }
`;

// const progressNumber = [
//   { id: 0, data: '진행중' },
//   { id: 1, data: '종료' },
// ];

export const numberRows = [
  {
    name: 'seb_40',
    start_date: '2022-10-20',
    end_date: '2022-11-04',
    comment: 'test',
    is_closed: 'X',
  },
  {
    name: 'seb_41',
    start_date: '2022-10-20',
    end_date: '2022-11-04',
    comment: 'test1',
    is_closed: 'X',
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
  // const [isActive, setIsActive] = useState(false);
  const [rows, setRows] = useState(numberRows);
  // const [searched, setSearched] = useState('');
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  // 전체 기수 데이터 조회 시
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

  // active 기수 / 종료 기수 구분
  // active한 기수의 경우 수정을 할 수 있어야함 => 팀 이름은 고유한 데이터 값이기 때문에 당연히 수정되면 안됨
  // 삭제 === 비활성화 개념

  // validation check(필수 조건을 입력했을 때만 넘어갈 수 있게끔)
  return (
    <>
      {loading ? <Loading /> : null}
      <Box>
        <TableContainer>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>기수명</TableCell>
                <TableCell align='center'>시작일(start date)</TableCell>
                <TableCell align='center'>종료일(end date)</TableCell>
                <TableCell align='center'>기타사항(comment)</TableCell>
                <TableCell align='center'>기수종료여부</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={nanoid()}>
                  <TableCell component='th' scope='row'>
                    <Link to='/admin/management/number/:id'>{`seb_${row.number_name}`}</Link>
                  </TableCell>
                  <TableCell align='center'>{row.start_date}</TableCell>
                  <TableCell align='center'>{row.end_date}</TableCell>
                  <TableCell align='center'>{row.comment}</TableCell>
                  <TableCell align='center'>{row.is_closed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Stack spacing={1} direction='row'>
            <StylesProvider injectFirst>
              <NumberButton variant='contained' onClick={openModalHandler}>
                등록
              </NumberButton>
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
                      <RegisterModals setModalOpen={setModalOpen} />
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

export default ReadNumber;
