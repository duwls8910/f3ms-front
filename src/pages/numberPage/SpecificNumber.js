import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from 'utils/LoadingIndicator';
import UpdateModals from 'components/Modal/number/UpdateModals';
import DeleteModals from 'components/Modal/number/DeleteModals';
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
export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
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
  height: 600px;
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

const SpecificNumber = () => {

  const [loading, setLoading] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [numberData, setNumberData] = useState({});
  const [teamData, setTeamData] = useState([]);

  let { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    const getSpecNumber = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/admin/management/number/${id}`
      );
      setNumberData(response.data);
      setLoading(false);
    };
    const getNumberTeamData = async () => {
      const response = await axios(
          `${process.env.REACT_APP_URL}/admin/management/pre-team/number/${id}`
      );
      setTeamData(response.data);
      setLoading(false);
    };
    getSpecNumber();
    getNumberTeamData();
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

      {numberData ? (
          <Container>
            <Center>
              <Row1> Seb_{numberData.number_name}</Row1>
              <Row2>
                <Title>시작일</Title>
                <Content>{numberData.start_date}</Content>
              </Row2>
              <Row2>
                <Title>종료일</Title>
                <Content>{numberData.end_date}</Content>
              </Row2>
              <Row2>
                <Title>기타사항</Title>
                <Content>{numberData.comment ? numberData.comment : '-'}</Content>
              </Row2>
              <Row2>
                <Title>기수 종료 여부</Title>
                <Content>{numberData.is_closed ? '미진행' : '진행중'}</Content>
              </Row2>
            </Center>
          </Container>
      ) : (
          '해당 기수의 정보를 찾을 수 없습니다'
      )}
        <Container>
          <ReadCenter>
            <Stack spacing={1} direction='row'>
              <StylesProvider injectFirst>
                <NumberButton variant='contained' onClick={openModalHandler}>
                  수정
                </NumberButton>
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
                          <UpdateModals setModalOpen={setUpdateOpen}/>
                        </div>
                      </ModalView>
                    </ModalBackdrop>
                ) : null}
              </ModalContainer>
              <StylesProvider injectFirst>
                <NumberButton variant='contained' onClick={openDeleteHandler}>
                  비활성
                </NumberButton>
              </StylesProvider>
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
              <NumberButton variant='contained' onClick={handleNavigate}>
                뒤로가기
              </NumberButton>
            </Stack>
          </ReadCenter>
        </Container>
        <Container>
          {teamData === undefined ? (
              <ReadCenter>해당 팀의 수강생이 없습니다</ReadCenter>
          ) : (
              <ReadCenter>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>팀 명</TableCell>
                      <TableCell align='center'>팀 종료 여부</TableCell>
                      <TableCell align='center'>기타사항</TableCell>
                    </TableRow>
                  </TableHead>
                  {teamData.map((row) => (
                      <TableRow key={nanoid()}>
                        <TableCell component='th' scope='row'>
                          <Link
                              to={`/admin/management/pre-team/${row.id}`}
                          >{`seb_${row.number_id}_pre_${row.team_name}`}</Link>
                        </TableCell>
                        <TableCell align='center'>{row.is_opened?'진행중':'종료'}</TableCell>
                        <TableCell align='center'>{row.comment ? row.comment :'-'}</TableCell>
                      </TableRow>
                  ))}
                </Table>
              </ReadCenter>
          )}
        </Container>
      </>
  );
};

export default SpecificNumber;
