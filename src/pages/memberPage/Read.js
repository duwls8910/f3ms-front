// 해당하는 팀의 멤버 조회 페이지
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  StylesProvider,
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

const memberRows = [
  {
    name: 'kimcoding',
    team_id: 'seb_40_pre_001',
    position_cd: '프론트엔드',
    comment: 'test',
    is_closed: 'X',
  },
  {
    name: 'parkhacker',
    team_id: 'seb_40_pre_001',
    position_cd: '백엔드',
    comment: 'test1',
    is_closed: 'X',
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ReadMember = () => {
  const [member, setMember] = useState([]);
  const [rows, setRows] = useState(memberRows);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // const navigate = useNavigate();

  const classes = useStyles();

  // 전체 멤버 데이터 조회 시
  useEffect(() => {
    const getMember = async () => {
      const response = await axios(
        `${process.env.REACT_APP_URL}/admin/management/number`
      );
      setMember(response.data);
      setRows(response.data);
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
        <TableContainer>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>팀원 이름</TableCell>
                <TableCell align='right'>팀 이름</TableCell>
                <TableCell align='right'>포지션</TableCell>
                <TableCell align='right'>하차여부</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={nanoid()}>
                  <TableCell component='th' scope='row'>
                    <Link to='/admin/management/member/:id'>{row.name}</Link>
                  </TableCell>
                  <TableCell align='right'>{row.team_id}</TableCell>
                  <TableCell align='right'>{row.position_cd}</TableCell>
                  <TableCell align='right'>{row.is_closed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Stack spacing={1} direction='row'>
            <StylesProvider injectFirst>
              <MemberButton variant='contained' onClick={openModalHandler}>
                등록
              </MemberButton>
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

export default ReadMember;
