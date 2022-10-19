// 전체 기수 조회 페이지
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterModals from 'components/Modal/number/RegisterModals';
import UpdateModals from 'components/Modal/number/UpdateModals';
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

export const EntireNumberPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

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

const progressNumber = [
  { id: 0, data: '진행중' },
  { id: 1, data: '종료' },
];

const numberRows = [
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
  // const [isActive, setIsActive] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState([]);
  const [rows, setRows] = useState(numberRows);
  // const [searched, setSearched] = useState('');
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const openUpdateHandler = () => {
    setUpdateOpen(true);
  };

  const closeUpdateHandler = () => {
    setUpdateOpen(false);
  };

  // 전체 기수 데이터 조회 시
  useEffect(() => {
    const getNumber = async () => {
      let json = await fetch(
        `${process.env.REACT_APP_URL}/admin/management/number`
      ).json();
      setNumber(json.data);
    };
    getNumber();
  }, []);

  // 기수 진행 여부 체크박스 표시를 위한 이벤트(handleChecked, removeCheck)
  const handleChecked = (checked, id) => {
    if (checked) {
      setSelectedNumber([...selectedNumber, id]);
    } else if (!checked) {
      setSelectedNumber(selectedNumber.filter((el) => el !== id));
    }
  };

  const removeCheck = (id) => {
    setSelectedNumber(selectedNumber.filter((el) => el !== id));
  };

  // active 기수 / 종료 기수 구분
  // active한 기수의 경우 수정을 할 수 있어야함 => 팀 이름은 고유한 데이터 값이기 때문에 당연히 수정되면 안됨
  // 삭제 === 비활성화 개념

  // validation check(필수 조건을 입력했을 때만 넘어갈 수 있게끔)

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  return (
    // 기수 조회 시 현재 진행 여부를 나눠 조회할 것
    // 체크 여부에 따라 해당 정보가 필터링되어 나올 것
    <>
      <Box>
        <EntireNumberPage>
          <div>
            {selectedNumber.length === 0 && (
              <div>{'진행여부를 선택해주세요'}</div>
            )}
            {progressNumber.map((id) => {
              return (
                <input
                  type='checkbox'
                  value={id.data}
                  onChange={(e) =>
                    handleChecked(e.target.checked, e.target.value)
                  }
                  checked={selectedNumber.includes(id.data) ? true : false}
                />
              );
            })}
          </div>
          {selectedNumber.map((id) => {
            return (
              <div>
                <div key={id}>
                  <div>{id}</div>
                </div>
                <div onClick={() => removeCheck(id)} />
              </div>
            );
          })}
        </EntireNumberPage>
        <TableContainer>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>기수명</TableCell>
                <TableCell align='right'>시작일(start date)</TableCell>
                <TableCell align='right'>종료일(end date)</TableCell>
                <TableCell align='right'>기타사항(comment)</TableCell>
                <TableCell align='right'>기수종료여부</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    <Link to='/admin/management/number/detail'>{row.name}</Link>
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
        <div>
          {selectedNumber ? (
            <>
              <h3 className='numberName'>{selectedNumber.number_id}</h3>
              <h4 className='startDate'>{selectedNumber.start_date}</h4>
              <h4 className='endDate'>{selectedNumber.end_date}</h4>
              <h4 className='comment'>{selectedNumber.comment}</h4>
            </>
          ) : (
            '기수의 정보를 찾을 수 없습니다'
          )}
        </div>
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
                      <RegisterModals />
                    </div>
                  </ModalView>
                </ModalBackdrop>
              ) : null}
            </ModalContainer>
            <StylesProvider injectFirst>
              <NumberButton variant='contained' onClick={openUpdateHandler}>
                수정
              </NumberButton>
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
          </Stack>
        </div>
      </Box>
    </>
  );
};

export default ReadNumber;
