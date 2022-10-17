// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import styled from 'styled-components';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

// export const Bar = styled.div`
//   display: flex;
//   align-items: flex-start;
//   text-decoration: none;
// `;

// export const ModalContainer = styled.div`
//   text-align: center;
//   width: 100%;
//   height: 100%;
// `;

// export const ModalBackdrop = styled.div`
//   position: fixed;
//   display: flex;
//   justify-content: left;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   right: 0;
//   margin: auto;
//   z-index: 999;
// `;

// export const ModalBtn = styled.button`
//   > img {
//     width: 40px;
//     height: 40px;
//   }
//   text-decoration: none;
//   border: none;
//   padding: 20px;
//   cursor: pointer;
// `;

// export const ModalView = styled.div.attrs((props) => ({
//   role: 'dialog',
// }))`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   background-color: rgba(44, 31, 15, 0.9);
//   color: #fff;
//   width: 20rem;
//   height: 100vh;
//   position: relative;
//   padding: 2rem 1rem 0 0;
//   > div.close-btn {
//     position: absolute;
//     top: 2px;
//     left: 7px;
//     cursor: pointer;
//     color: #fff;
//     font-size: 4rem;
//   }
//   > div.desc {
//     font-size: 2rem;
//     font-weight: 700;
//     margin: 2rem 2rem 0 0;
//     padding: 0.5rem;
//   }
//   > a.desc {
//     font-size: 2rem;
//     font-weight: 700;
//     margin: 2rem 2rem 0 0;
//     padding: 0.5rem;
//     color: #fff;
//   }
// `;

// function Menu() {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const openModalHandler = () => {
//     setModalIsOpen(!modalIsOpen);
//   };

//   return (
//     <>
//       <Bar>
//         <ModalContainer onClick={openModalHandler}>
//           <IconButton>
//             <MenuIcon fontSize="large" />
//           </IconButton>
//           {modalIsOpen ? (
//             <ModalBackdrop onClick={openModalHandler}>
//               <ModalView
//                 onClick={(event) => {
//                   event.stopPropagation();
//                 }}
//               >
//                 <div className='close-btn' onClick={openModalHandler}>
//                   &times;
//                 </div>
//                 <div className='desc' />
//                 <NavLink to='/admin/management/number' className='desc'>
//                   <div>기수</div>
//                 </NavLink>
//                 <NavLink to='/admin/management/team' className='desc'>
//                   <div>팀</div>
//                 </NavLink>
//                 <NavLink to='/admin/management/member' className='desc'>
//                   <div>팀원</div>
//                 </NavLink>
//               </ModalView>
//             </ModalBackdrop>
//           ) : null}
//         </ModalContainer>
//       </Bar>
//     </>
//   );
// }

// export default Menu;
