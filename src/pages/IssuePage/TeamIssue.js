// 각 팀에 해당하는 이슈의 내용이 들어갈 페이지
// 게시판에 글 작성한다고 생각해보기
// 팀 이름, 이슈 내용, 이슈 등록자, 해결여부, 이슈등록일자, 해결완료일자
// 이슈 등록, 수정, 삭제버튼 활성화
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import styled from 'styled-components';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const issueRows = [
  {
    name: 'seb_40_pre_001',
    issue_date: '2022-10-20',
    issue_writer: 'kimcoding',
    issue_comment: 'test',
    is_closed: 'O',
  },
  {
    name: 'seb_40_pre_002',
    issue_date: '2022-10-20',
    issue_writer: 'kimcoding',
    issue_comment: 'test1',
    is_closed: 'O',
  },
];

const TeamIssue = () => {
  const [rows, setRows] = useState(issueRows);
  const classes = useStyles();

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>팀 명</TableCell>
              <TableCell align='right'>이슈 등록일</TableCell>
              <TableCell align='right'>이슈 등록자</TableCell>
              <TableCell align='right'>이슈 내용</TableCell>
              <TableCell align='right'>해결여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.issue_date}</TableCell>
                <TableCell align='right'>{row.issue_writer}</TableCell>
                <TableCell align='right'>{row.issue_comment}</TableCell>
                <TableCell align='right'>{row.is_closed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TeamIssue;
