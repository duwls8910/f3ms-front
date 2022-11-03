import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
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
import { nanoid } from 'nanoid';
import styled from 'styled-components';

const Container =styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`;
const Center =styled.div`
margin-top : 1rem;
width : 80%;
`;

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
      <Container>
        <Center>
          {loading ? <Loading/> : null}
          <Box>
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
                            <RegisterModals/>
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
                    <TableCell>팀 명</TableCell>
                    <TableCell align='center'>팀 종료 여부</TableCell>
                    <TableCell align='center'>기타사항</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                      <TableRow key={nanoid()}>
                        <TableCell component='th' scope='row'>
                          <Link
                              to={`/admin/management/pre-team/${row.id}`}
                          >{`seb_${row.number_id}_pre_${row.team_name}`}</Link>
                        </TableCell>
                        <TableCell align='center'>{row.is_opened?'진행중':'종료'}</TableCell>
                        <TableCell align='center'>{row.comment?row.comment :'-'}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Center>
      </Container>
  );
};

export default ReadTeam;
