// 해당하는 팀의 멤버 조회 페이지
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from 'utils/LoadingIndicator';
import RegisterModals from 'components/Modal/member/RegisterModals';
import { Box, Stack, Button } from '@mui/material';
import axios from 'axios';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import {
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const memberRows = [
  {
    id: '',
    name: '',
    pre_team_id: '',
    main_team_id: '',
    position_cd: '',
    comment: '',
    is_active: '',
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ReadMember = () => {
  let { id } = useParams();
  const [member, setMember] = useState([]);
  const [rows, setRows] = useState(memberRows);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const classes = useStyles();

  // 전체 멤버 데이터 조회 시
  useEffect(() => {
    const getMember = async () => {
      const response = await axios(
        `${process.env.REACT_APP_URL}/admin/management/member`
      );
      setMember(response.data);
      setRows(response.data);
      //console.log(response.data);
      setLoading(false);
    };
    getMember();
  }, []);

  // validation check(필수 조건을 입력했을 때만 넘어갈 수 있게끔)
  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <Box>
        <div>
          <Stack spacing={1} direction='row'>
            <MemberButton variant='contained' onClick={openModalHandler}>
              등록
            </MemberButton>
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
        <TableContainer>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>팀원 이름</TableCell>
                <TableCell align='center'>pre팀이름</TableCell>
                <TableCell align='center'>main팀이름</TableCell>
                <TableCell align='center'>학습 코스 구분</TableCell>
                <TableCell align='center'>하차여부</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={nanoid()}>
                  <TableCell component='th' scope='row'>
                    <Link to='admin/management/member'>{row.member_name}</Link>
                  </TableCell>
                  <TableCell align='center'>{row.pre_team_id}</TableCell>
                  <TableCell align='center'>{row.main_team_id}</TableCell>
                  <TableCell align='center'>{row.position_cd}</TableCell>
                  <TableCell align='center'>{row.is_active}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ReadMember;
