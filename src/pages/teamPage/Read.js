// 각 팀 조회 시 p.p인지 m.p인지 구분할 수 있어야함
// 기본적으로 p.p를 먼저 띄우고 사용자가 라디오버튼(체크박스)를 누르면 m.p팀이 나오게 함
// 기수 api(정보)만 받아옴 -> 이벤트 클릭 시점에 아이디에 해당하는 팀만 받아옴
// (call횟수를 늘리는 대신 한번에 처리할 데이터의 양(사이즈)을 줄임)

// seb_ 고정값으로 두고
// 00 기수 숫자(number값이 들어감)
// pre / main (드롭다운, 드롭다운의 value가 나올 때 화면에서 보여지는 출력만 _pre_로 보일 수 있게)
// 000 (int값으로)
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';
import Loading from 'utils/LoadingIndicator';
import RegisterModals from 'components/Modal/team/RegisterModals';
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

export const TeamPageView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const TeamButton = styled(Button)`
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

const teamRows = [
  {
    id: '',
    team_name: '',
    number_id: '',
    is_opened: '',
    comment: '',
    created_date: '',
    updated_date: '',
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ReadTeam = () => {
  const [team, setTeam] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState(teamRows);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  let { id } = useParams();

  useEffect(() => {
    const getTeam = async () => {
      const response = await axios(
        `${process.env.REACT_APP_URL}/admin/management/pre-team`
      );
      setTeam(response.data);
      setRows(response.data);
      setLoading(false);
    };
    getTeam();
  }, []);

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
                <TableCell>팀 명</TableCell>
                <TableCell align='center'>팀 종료 여부</TableCell>
                <TableCell align='center'>기타 사항</TableCell>
                <TableCell align='center'>생성일</TableCell>
                <TableCell align='center'>수정일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={nanoid()}>
                  <TableCell component='th' scope='row'>
                    <Link
                      to={`/admin/management/pre-team/${id}`}
                    >{`seb_${row.number_id}_pre_${row.team_name}`}</Link>
                  </TableCell>
                  <TableCell align='center'>{row.is_opened}</TableCell>
                  <TableCell align='center'>{row.comment}</TableCell>
                  <TableCell align='center'>{row.created_date}</TableCell>
                  <TableCell align='center'>{row.updated_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Stack spacing={1} direction='row'>
            <TeamButton variant='contained' onClick={openModalHandler}>
              등록
            </TeamButton>
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
          </Stack>
        </div>
      </Box>
    </>
  );
};

export default ReadTeam;
