// 각 팀 조회 시 p.p인지 m.p인지 구분할 수 있어야함
// 기본적으로 p.p를 먼저 띄우고 사용자가 라디오버튼(체크박스)를 누르면 m.p팀이 나오게 함
// 기수 api(정보)만 받아옴 -> 이벤트 클릭 시점에 아이디에 해당하는 팀만 받아옴(call횟수를 늘리는 대신 한번에 처리할 데이터의 양(사이즈)을 줄임)

// seb_ 고정값으로 두고
// 00 기수 숫자(number값이 들어감)
// pre / main (드롭다운, 드롭다운의 value가 나올 때 화면에서 보여지는 출력만 _pre_로 보일 수 있게)
// 000 (int값으로)

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NumberDetail from 'pages/numberPage/NumberDetail';
import RegisterModals from 'components/Modal/team/RegisterModals';
import UpdateModals from 'components/Modal/team/UpdateModals';
import DeleteModals from 'components/Modal/team/DeleteModals';
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
    bottom: 300px;
    left: 17rem;
    cursor: pointer;
  }
`;

const progressTeam = [
  { id: 0, data: '진행중' },
  { id: 1, data: '종료' },
];

const teamRows = [
  {
    team_name: 'seb_40_pre_001',
    team_issue_id: '',
    comment: '001 pre test',
    is_opened: 'O',
  },
  {
    team_name: 'seb_40_pre_002',
    team_issue_id: '',
    comment: '',
    is_opened: 'O',
  },
  {
    team_name: 'seb_40_pre_003',
    team_issue_id: '',
    comment: '',
    is_opened: 'O',
  },
  {
    team_name: 'seb_40_pre_004',
    team_issue_id: '',
    comment: '',
    is_opened: 'O',
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ReadTeam = () => {
  const [view, setView] = useState('');
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [rows, setRows] = useState(teamRows);
  const classes = useStyles();

  // const getTeam = async () => {
  //   const json = await (
  //     await fetch(`${process.env.REACT_APP_URL}/admin/management/team`)
  //   ).json();
  //   setView(json.data[0]);
  // };

  // useEffect(() => {
  //   getTeam();
  // }, []);

  const handleChecked = (checked, id) => {
    if (checked) {
      setSelectedTeam([...selectedTeam, id]);
    } else if (!checked) {
      setSelectedTeam(selectedTeam.filter((el) => el !== id));
    }
  };

  const removeCheck = (id) => {
    setSelectedTeam(selectedTeam.filter((el) => el !== id));
  };

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

  const openDeleteHandler = () => {
    setDeleteOpen(true);
  };

  const closeDeleteHandler = () => {
    setDeleteOpen(false);
  };

  return (
    <>
      <Box>
        <TeamPageView>
          <div>
            {selectedTeam.length === 0 && (
              <div>{'진행여부를 선택해주세요'}</div>
            )}
            {progressTeam.map((id) => {
              return (
                <input
                  type='checkbox'
                  value={id.data}
                  onChange={(e) =>
                    handleChecked(e.target.checked, e.target.value)
                  }
                  checked={selectedTeam.includes(id.data) ? true : false}
                />
              );
            })}
          </div>
          {selectedTeam.map((id) => {
            return (
              <div>
                <div key={id}>
                  <div>{id}</div>
                </div>
                <div onClick={() => removeCheck(id)} />
              </div>
            );
          })}
          <TableContainer>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>기수명</TableCell>
                  <TableCell align='right'>팀 이슈</TableCell>
                  <TableCell align='right'>기타사항(comment)</TableCell>
                  <TableCell align='right'>팀종료여부</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.team_name}>
                    <TableCell component='th' scope='row'>
                      <Link to='/admin/management/issue/team'>
                        {row.team_name}
                      </Link>
                    </TableCell>
                    <TableCell align='right'>{row.team_issue_id}</TableCell>
                    <TableCell align='right'>{row.comment}</TableCell>
                    <TableCell align='right'>{row.is_opened}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TeamPageView>
        <div>
          {selectedTeam ? (
            <>
              <h3 className='team_name'>{selectedTeam.team_name}</h3>
              <h4 className='team_issue'>{selectedTeam.team_issue_id}</h4>
              <h4 className='comment'>{selectedTeam.comment}</h4>
            </>
          ) : (
            '해당 팀의 정보를 찾을 수 없습니다'
          )}
        </div>
        <div>
          <Stack spacing={1} direction='row'>
            <StylesProvider injectFirst>
              <TeamButton variant='contained' onClick={openModalHandler}>
                등록
              </TeamButton>
              <StylesProvider />
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
              <TeamButton variant='contained' onClick={openUpdateHandler}>
                수정
              </TeamButton>
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
              <TeamButton variant='contained' onClick={openDeleteHandler}>
                삭제
              </TeamButton>
              <ModalContainer>
                {deleteOpen ? (
                  <ModalBackdrop onClick={openDeleteHandler}>
                    <ModalView
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
                    </ModalView>
                  </ModalBackdrop>
                ) : null}
              </ModalContainer>
            </StylesProvider>
            <NumberDetail />
          </Stack>
        </div>
      </Box>
    </>
  );
};

export default ReadTeam;
