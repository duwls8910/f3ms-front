import React, { useState } from 'react';
// import axios from "axios";
import { TextField, Button } from '@mui/material';

// const position = [
// { id: null, value: "포지션 선택" },
// { id: 1, value: "프론트엔드" },
// { id: 2, value: "백엔드" },
// ];

const MemberRegister = () => {
  // 팀원을 등록할 때 필요한 것
  // 1. 각 팀에 대한 팀원 이름
  // 2. 팀원의 포지션(프/백)
  const [name, setName] = useState('');

  // // 포지션 선택 시 드롭다운방식
  // const [selectedDropValue, setSelectedDropValue] = useState("");

  // const handleDropPosition = (e) => {
  // setSelectedDropValue(e.target.value);
  // };

  // const handleClick = (key) => (e) => {
  // setName({ ...name, [key]: e.target.value });
  // };

  // const onSubmit = async () => {
  // try {
  // await axios
  // .post(``,
  // {
  // })
  // .then((res) => {
  // });
  // } catch (err) {
  // console.log(err);
  // }
  // };

  return (
    <section>
      <div>
        <div>팀원</div>
        <br />
        <TextField
          id='outlined-basic'
          label='이름'
          variant='outlined'
          autoFocus
        />
        <br />
        <div>포지션</div>
        {/* <div>포지션</div>
        <div onChange={handleDropPosition}>
          {position.map((el) => {
            return <option key={el.id}>{el.value}</option>;
          })}
          {selectedDropValue}
        </div> */}
        <div>기타 코멘트</div>
        <TextField
          id='outlined-base'
          label='기타 코멘트(선택사항)'
          variant='outlined'
        />
        <br />
        <Button variant='contained'>등록</Button>
        {/* <Button variant="contained" onClick={onSubmit}>등록</Button> */}
      </div>
    </section>
  );
};

export default MemberRegister;
