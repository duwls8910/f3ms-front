// // 해당하는 팀의 멤버 조회 페이지
// import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// import styled from 'styled-components';
// import RegisterModals from 'components/Modal/member/RegisterModals';
// import UpdateModals from 'components/Modal/member/UpdateModals';
// import DeleteModals from 'components/Modal/member/DeleteModals';
// import { Box, Stack, Button } from '@mui/material';
// import { StylesProvider } from '@material-ui/core';

// export const EntireNumberPage = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: left;
// `;

// export const RegisterButtonPosition = styled.div`
//   position: absolute;
//   top: 35%;
//   right: 95%;

//   /* transform: translateX(50%); */
//   margin: 4rem 0;
// `;

// export const UpdateButtonPosition = styled.div`
//   position: absolute;
//   top: 43%;
//   right: 90%;
//   /* transform: translateX(50%); */
//   margin: 4rem 0;
// `;

// export const DeleteButtonPosition = styled.div`
//   position: absolute;
//   top: 43%;
//   right: 85%;
//   /* transform: translateX(50%); */
//   margin: 4rem 0;
// `;

// export const MyButton = styled(Button)`
//   border: 0;
//   border-radius: 3px;
//   height: 48px;
//   padding: 0 30px;
// `;

// export const ModalContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   position: relative;
// `;

// export const ModalBackdrop = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 400px;
//   height: 600px;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   margin: auto;
//   z-index: 1;
//   background-color: rgb(244, 230, 193);
//   position: fixed;
// `;

// export const ModalView = styled.div.attrs((props) => ({
//   role: `dialog`,
// }))`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 200px;
//   height: 100px;
//   position: relative;

//   > div.close-btn {
//     position: absolute;
//     bottom: 320px;
//     left: 17rem;
//     cursor: pointer;
//   }
// `;

const ReadMember = () => {
  return <></>;
};

// const ReadMember = () => {
//   const [selectedNumber, setSelectedNumber] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [updateOpen, setUpdateOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   // const navigate = useNavigate();

//   // 전체 기수 데이터 조회 시
//   // const getNumber = async () => {
//   //   const json = await (
//   //     await fetch('http://localhost:3000/admin/management/number')
//   //   ).json();
//   //   setNumber(json.data[0]);
//   // };

//   // useEffect(() => {
//   //   getNumber();
//   // }, []);
//   // const getNumber = numberDummy.filter((number) => number.number === 'seb_40');

//   // 기수 진행 여부 체크박스 표시를 위한 이벤트(handleChecked, removeCheck)
//   const handleChecked = (checked, id) => {
//     if (checked) {
//       setSelectedNumber([...selectedNumber, id]);
//     } else if (!checked) {
//       setSelectedNumber(selectedNumber.filter((el) => el !== id));
//     }
//   };

//   const removeCheck = (id) => {
//     setSelectedNumber(selectedNumber.filter((el) => el !== id));
//   };

//   // // 검색기능 -> 10.11까지 관련 기능 구현 안함
//   // // p.p / m.p 구분을 할 수 있게 검색결과가 나와야함(필터)
//   // // 사용자의 관점에서 검색 기능을 정의해야함
//   // // 검색(seb_00 / seb_00_pre / 000) => 어떻게 검색을 해도 해당 검색 결과가 나와야함
//   // // Ajax 호출에 따른 엘리먼트 동적 처리 검색해볼것(기존에 떠있던 정보들이 사라지고 검색도니 정보만 받아서 뿌려주는거) => 새로고침 없이 실행해야함

//   // active 기수 / 종료 기수 구분
//   // active한 기수의 경우 수정을 할 수 있어야함 => 팀 이름은 고유한 데이터 값이기 때문에 당연히 수정되면 안됨
//   // 삭제 === 비활성화 개념

//   // validation check(필수 조건을 입력했을 때만 넘어갈 수 있게끔)

//   const openModalHandler = () => {
//     setModalOpen(true);
//   };

//   const closeModalHandler = () => {
//     setModalOpen(false);
//   };

//   const openUpdateHandler = () => {
//     setUpdateOpen(true);
//   };

//   const closeUpdateHandler = () => {
//     setUpdateOpen(false);
//   };

//   const openDeleteHandler = () => {
//     setDeleteOpen(true);
//   };

//   const closeDeleteHandler = () => {
//     setDeleteOpen(false);
//   };

//   return (
//     // 기수 조회 시 현재 진행 여부를 나눠 조회할 것
//     // 체크 여부에 따라 해당 정보가 필터링되어 나올 것
//     <>
//       <Box>
//         <EntireNumberPage>
//           <div>
//             {selectedNumber.length === 0 && (
//               <div>{'진행여부를 선택해주세요'}</div>
//             )}
//             {progressNumber.map((id) => {
//               return (
//                 <input
//                   type='checkbox'
//                   value={id.data}
//                   onChange={(e) =>
//                     handleChecked(e.target.checked, e.target.value)
//                   }
//                   checked={selectedNumber.includes(id.data) ? true : false}
//                 />
//               );
//             })}
//           </div>
//           {selectedNumber.map((id) => {
//             return (
//               <div>
//                 <div key={id}>
//                   <div>{id}</div>
//                 </div>
//                 <div onClick={() => removeCheck(id)} />
//               </div>
//             );
//           })}
//           <div>
//             <NumberList />
//           </div>
//           <div>
//             {selectedNumber ? (
//               <>
//                 <h3 className='numberName'>{selectedNumber.number_id}</h3>
//                 <h4 className='startDate'>{selectedNumber.start_date}</h4>
//                 <h4 className='endDate'>{selectedNumber.end_date}</h4>
//                 <h4 className='comment'>{selectedNumber.comment}</h4>
//               </>
//             ) : (
//               '기수의 정보를 찾을 수 없습니다'
//             )}
//           </div>

//           <div>
//             <Stack spacing={1} direction='row'>
//               <StylesProvider injectFirst>
//                 <RegisterButtonPosition>
//                   <MyButton variant='contained' onClick={openModalHandler}>
//                     등록
//                   </MyButton>
//                 </RegisterButtonPosition>
//               </StylesProvider>
//               <ModalContainer>
//                 {modalOpen ? (
//                   <ModalBackdrop onClick={openModalHandler}>
//                     <ModalView
//                       onClick={(event) => {
//                         event.stopPropagation();
//                       }}
//                     >
//                       <div className='close-btn' onClick={closeModalHandler}>
//                         &times;
//                       </div>
//                       <div className='desc'>
//                         <RegisterModals />
//                       </div>
//                     </ModalView>
//                   </ModalBackdrop>
//                 ) : null}
//               </ModalContainer>

//               <StylesProvider injectFirst>
//                 <UpdateButtonPosition>
//                   <MyButton variant='contained' onClick={openUpdateHandler}>
//                     수정
//                   </MyButton>
//                 </UpdateButtonPosition>
//               </StylesProvider>
//               <ModalContainer>
//                 {updateOpen ? (
//                   <ModalBackdrop onClick={openUpdateHandler}>
//                     <ModalView
//                       onClick={(event) => {
//                         event.stopPropagation();
//                       }}
//                     >
//                       <div className='close-btn' onClick={closeUpdateHandler}>
//                         &times;
//                       </div>
//                       <div className='desc'>
//                         <UpdateModals />
//                       </div>
//                     </ModalView>
//                   </ModalBackdrop>
//                 ) : null}
//               </ModalContainer>

//               <StylesProvider injectFirst>
//                 <DeleteButtonPosition>
//                   <MyButton variant='contained' onClick={openDeleteHandler}>
//                     삭제
//                   </MyButton>
//                 </DeleteButtonPosition>
//               </StylesProvider>
//               <ModalContainer>
//                 {deleteOpen ? (
//                   <ModalBackdrop onClick={openDeleteHandler}>
//                     <ModalView
//                       onClick={(event) => {
//                         event.stopPropagation();
//                       }}
//                     >
//                       <div className='close-btn' onClick={closeDeleteHandler}>
//                         &times;
//                       </div>
//                       <div className='desc'>
//                         <DeleteModals />
//                       </div>
//                     </ModalView>
//                   </ModalBackdrop>
//                 ) : null}
//               </ModalContainer>
//             </Stack>
//           </div>
//         </EntireNumberPage>
//       </Box>
//     </>
//   );
// };

export default ReadMember;
