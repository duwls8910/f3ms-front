// 해당 수강생을 클릭했을 때 나오는 수강생의 정보
// 수강생의 정보에는 포지션과 하차 여부, 그 수강생에 해당하는 이슈 내용이 나오게 함
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  background-color: rgb(156, 165, 182);
  width: 400px;
  height: 550px;
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
  background-color: rgb(156, 165, 182);
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

const SpecificMember = () => {
  const [loading, setLoading] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [memberData, setMemberData] = useState([
    {
      id: '',
      member_name: '',
      number_id: '',
      position_cd: '',
      pre_team_id: '',
      main_team_id: '',
      is_active: '',
    },
  ]);

  const classes = useStyles();

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getSpecMember = async () => {
      const response = await axios(
        `${process.env.REACT_APP_URL}/admin/management/member/${id}`
      );
      setMemberData(response.data);
      console.log(response.data);
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

  const handleNavigate = () => {
    navigate(-1);
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
                  <TableCell align='center'>학습 코스 구분</TableCell>
                  <TableCell align='center'>pre팀명</TableCell>
                  <TableCell align='center'>main팀명</TableCell>
                  <TableCell align='center'>하차여부</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {memberData.map((row) => (
                  <TableRow key={nanoid()}>
                    <TableCell component='th' scope='row'>
                      {memberData.member_name}
                    </TableCell>
                    <TableCell align='center'>
                      {memberData.position_cd}
                    </TableCell>
                    <TableCell align='center'>
                      {memberData.pre_team_id}
                    </TableCell>
                    <TableCell align='center'>
                      {memberData.main_team_id}
                    </TableCell>
                    <TableCell align='center'>{memberData.is_active}</TableCell>
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
            <MemberButton variant='contained' onClick={openDeleteHandler}>
              비활성
            </MemberButton>
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
            <MemberButton variant='contained' onClick={handleNavigate}>
              뒤로가기
            </MemberButton>
          </StylesProvider>
        </Stack>
      </Box>
    </>
  );
};

export default SpecificMember;
