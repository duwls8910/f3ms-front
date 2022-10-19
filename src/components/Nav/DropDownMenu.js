// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import styled, { css } from 'styled-components';
// import useDetectClose from 'components/Nav/useDetectClose';

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: center;
//   position: relative;
//   left: 11rem;
//   margin-left: 70px;
//   color: black;
//   font-size: 19px;
//   width: 400px;
//   height: 50px;
//   font-weight: bold;
// `;

// const DropdownContainer = styled.div`
//   position: relative;
//   text-align: center;
// `;

// const DropdownButton = styled.div`
//   cursor: pointer;
// `;

// const Menu = styled.div`
//   background: gray;
//   position: absolute;
//   top: 52px;
//   left: 50%;
//   width: 100px;
//   text-align: center;
//   box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
//   border-radius: 3px;
//   opacity: 0;
//   visibility: hidden;
//   transform: translate(-50%, -20px);
//   transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
//   z-index: 9;

//   &:after {
//     content: '';
//     height: 0;
//     width: 0;
//     position: absolute;
//     top: -3px;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     border: 12px solid transparent;
//     border-top-width: 0;
//     border-bottom-color: gray;
//   }

//   ${({ isDropped }) =>
//     isDropped &&
//     css`
//       opacity: 1;
//       visibility: visible;
//       transform: translate(-50%, 0);
//       left: 50%;
//     `};
// `;

// const Ul = styled.ul`
//   & > li {
//     margin-bottom: 10px;
//   }

//   & > li:first-of-type {
//     margin-top: 10px;
//   }

//   list-style-type: none;
//   padding: 0;
//   margin: 0;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Li = styled.li``;

// const LinkWrapper = styled(NavLink)`
//   font-size: 16px;
//   text-decoration: none;
//   color: white;
//   &:link {
//     transition: 0.5s;
//     text-decoration: none;
//   }
// `;

// // const LogoutDiv = styled.div`
// //   cursor: pointer;
// //   font-size: 16px;
// //   display: block;
// //   text-decoration: none;
// //   color: black;
// //   font-size: 19px;
// // `;

// const DropdownMenu = () => {
//   const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
//   const [boardIsOpen, boardRef, boardHandler] = useDetectClose(false);

//   return (
//     <Wrapper>
//       <DropdownContainer>
//         <DropdownButton onClick={myPageHandler} ref={myPageRef}>
//           페이지
//         </DropdownButton>
//         <Menu isDropped={myPageIsOpen}>
//           <Ul>
//             <Li>
//               <LinkWrapper to='admin/management/number'>기수</LinkWrapper>
//             </Li>
//             <Li>
//               <LinkWrapper to='admin/management/team'>팀</LinkWrapper>
//             </Li>
//             <Li>
//               <LinkWrapper to='admin/management/member'>팀원</LinkWrapper>
//             </Li>
//           </Ul>
//         </Menu>
//       </DropdownContainer>
//       <DropdownContainer>
//         <DropdownButton onClick={boardHandler} ref={boardRef}>
//           게시판
//         </DropdownButton>
//         <Menu isDropped={boardIsOpen}>
//           <Ul>
//             <Li>
//               <LinkWrapper href='#2-1'>메뉴1</LinkWrapper>
//             </Li>
//             <Li>
//               <LinkWrapper href='#2-2'>메뉴2</LinkWrapper>
//             </Li>
//             <Li>
//               <LinkWrapper href='#2-3'>메뉴3</LinkWrapper>
//             </Li>
//           </Ul>
//         </Menu>
//       </DropdownContainer>
//     </Wrapper>
//   );
// };

// export default DropdownMenu;
