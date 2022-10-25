// 해당 수강생을 클릭했을 때 나오는 수강생의 정보
// 수강생의 정보에는 포지션과 하차 여부, 그 수강생에 해당하는 이슈 내용이 나오게 함
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from 'utils/LoadingIndicator';
import UpdateModals from 'components/Modal/member/UpdateModals';
import DeleteModals from 'components/Modal/member/DeleteModals';
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
import { Link } from 'react-router-dom';
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
    font-size: 22px;
    cursor: pointer;
  }
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SpecificMember = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [memberData, setMemberData] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const getSpecMember = async () => {
      const response = await axios(
        `${process.env.REACT_APP_URL}/admin/management/member/:id`
      );
      getSpecMember(response.data);
      setLoading(false);
    };
    getSpecMember();
  }, []);

  const openModalHandler = () => {
    setLoading(false);
    setUpdateOpen(true);
  };

  const closeModalHandler = () => {
    setLoading(false);
    setUpdateOpen(false);
  };

  const openDeleteHandler = () => {
    setLoading(false);
    setDeleteOpen(true);
  };

  const closeDeleteHandler = () => {
    setLoading(false);
    setDeleteOpen(false);
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <Box>
        {memberData ? (
          <TableContainer>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>팀원 이름</TableCell>
                  <TableCell align='center'>제목</TableCell>
                  <TableCell align='center'>이슈 내용</TableCell>
                  <TableCell align='center'>해결 여부</TableCell>
                  <TableCell align='center'>완료 날짜</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {memberData.map((row) => (
                  <TableRow key={nanoid()}>
                    <TableCell component='th' scope='row'>
                      {row.id}
                    </TableCell>
                    <TableCell align='center'>{row.title}</TableCell>
                    <TableCell align='center'>{row.content}</TableCell>
                    <TableCell align='center'>{row.is_completed}</TableCell>
                    <TableCell align='center'>{row.completed_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          '해당 수강생의 정보를 찾을 수 없습니다'
        )}
        <Stack spacing={1} direction='row'>
          <StylesProvider injectFirst>
            <MemberButton variant='contained' onClick={openModalHandler}>
              수정
            </MemberButton>
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
            <MemberButton variant='contained' onClick={openDeleteHandler}>
              삭제
            </MemberButton>
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

export default SpecificMember;
