import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from 'utils/LoadingIndicator';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import {nanoid} from "nanoid";
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 2rem;
  width: 80%;
  background-color: rgb(240, 240, 240);
  border-radius: 5px;
  box-shadow: 2px 2px 2px 2px grey;
`;
const ReadCenter =styled.div`
margin-top : 1rem;
width : 80%;
`;

export const Row1 = styled.div`
  align-self: center;
  font-size: 2rem;
  padding: 2rem 2rem 1rem 2rem;
  width: 90%;
`;

export const Row2 = styled.div`
  display: flex;
  align-self: center;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 2rem;
  width: 90%;
  border-bottom: 1px solid lightgray;
`;

export const Title = styled.span`
  flex-basis: 40%;
  font-size: 1rem;
`;

export const Content = styled.span`
  flex-basis: 60%;
  font-size: 1rem;
`;
// export const PageContainer = styled.div`
//   display: flex;
//   justify-content: center;
// `;

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
  background-color: rgb(255, 255, 255);
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

const SpecificTeam = () => {
  const [loading, setLoading] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [teamData, setTeamData] = useState({});


  const classes = useStyles();

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getSpecTeam = async () => {
      const response = await axios(
        `${process.env.REACT_APP_URL}/admin/management/pre-team/${id}`
      );
      setTeamData(response.data);
      setLoading(false);
    };
    getSpecTeam();
  }, []);


  const openModalHandler = () => {
    setUpdateOpen(true);
  };

  const closeModalHandler = () => {
    setUpdateOpen(false);
  };

  const openDeleteHandler = () => {
    setDeleteOpen(true);
  };

  const closeDeleteHandler = () => {
    setDeleteOpen(false);
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
      <>
        {loading ? <Loading/> : null}
        {teamData ? (
            <Container>
              <Center>
                <Row1> Seb_{teamData.number_id}_Pre_{teamData.team_name}</Row1>
                <Row2>
                  <Title>진행중인 프로젝트</Title>
                  <Content>{teamData.p_group}-Project</Content>
                </Row2>
                <Row2>
                  <Title>진행여부</Title>
                  <Content>{teamData.is_opened ? '진행중' : '미진행'}</Content>
                </Row2>
                <Row2>
                  <Title>기타사항</Title>
                  <Content>{teamData.comment ? teamData.comment : '-'}</Content>
                </Row2>
              </Center>
            </Container>
        ) : (
            '해당 팀의 정보를 찾을 수 없습니다'
        )}
        <Container>
          <ReadCenter>
            <Stack spacing={1} direction='row'>
              <TeamButton variant='contained' onClick={openModalHandler}>
                수정
              </TeamButton>
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
                          <UpdateModals/>
                        </div>
                      </ModalView>
                    </ModalBackdrop>
                ) : null}
              </ModalContainer>
              <TeamButton variant='contained' onClick={openDeleteHandler}>
                비활성
              </TeamButton>
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
                          <DeleteModals/>
                        </div>
                      </DeleteModalView>
                    </ModalBackdrop>
                ) : null}
              </ModalContainer>
              <TeamButton variant='contained' onClick={handleNavigate}>
                뒤로가기
              </TeamButton>
            </Stack>
          </ReadCenter>
        </Container>
        <Container>
          {teamData.member === undefined ? (
              <ReadCenter>해당 팀의 수강생이 없습니다</ReadCenter>
          ) : (
              <ReadCenter>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>팀원 이름</TableCell>
                      <TableCell align='center'>학습 코스 구분</TableCell>
                      <TableCell align='center'>하차여부</TableCell>

                    </TableRow>
                  </TableHead>
                  {teamData.member.map((row) => (
                      <TableRow key={nanoid()}>
                        <TableCell component='th' scope='row'>
                          <Link to={`/admin/management/member/${row.id}`}>
                            {row.member_name}
                          </Link>
                        </TableCell>
                        <TableCell align='center'>{row.position_cd? row.position_cd === 'p_be'
                                ? '백엔드'
                                : '프론트엔드'
                            : null}</TableCell>
                        <TableCell align='center'>{row.is_active ? '학습중' : '하차'}</TableCell>
                      </TableRow>
                  ))}
                </Table>
              </ReadCenter>
          )}
        </Container>

      </>
  )
};

export default SpecificTeam;
