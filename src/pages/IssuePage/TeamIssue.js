// 각 팀에 해당하는 이슈의 내용이 들어갈 페이지
// 게시판에 글 작성한다고 생각해보기
// 팀 이름, 이슈 내용, 이슈 등록자, 해결여부, 이슈등록일자, 해결완료일자
// 이슈 등록, 수정, 삭제버튼 활성화
import React, { useState } from 'react';
import Register from 'components/Modal/Issue/TeamIssue/Register';
import Update from 'components/Modal/Issue/TeamIssue/Update';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

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
    bottom: 320px;
    left: 17rem;
    font-size: 22px;
    cursor: pointer;
  }
`;

const issueRows = [
  {
    name: 'seb_40_pre_001',
    issue_date: '2022-10-20',
    issue_writer: 'kimcoding',
    issue_comment: 'test',
    is_closed: 'O',
  },
  {
    name: 'seb_40_pre_001',
    issue_date: '2022-10-20',
    issue_writer: 'parkhacker',
    issue_comment: 'test1',
    is_closed: 'O',
  },
];

const TeamIssue = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [rows, setRows] = useState(issueRows);
  const classes = useStyles();

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

  return (
    <>
      <Box>
        <TableContainer>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>팀 명</TableCell>
                <TableCell align='center'>이슈 등록일</TableCell>
                <TableCell align='center'>이슈 등록자</TableCell>
                <TableCell align='center'>이슈 내용</TableCell>
                <TableCell align='center'>해결여부</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='center'>{row.issue_date}</TableCell>
                  <TableCell align='center'>{row.issue_writer}</TableCell>
                  <TableCell align='center'>{row.issue_comment}</TableCell>
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
                      <Register />
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
                      <Update />
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

export default TeamIssue;
