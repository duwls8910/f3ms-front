import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from 'utils/LoadingIndicator';
import UpdateModals from 'components/Modal/member/UpdateModals';
import DeleteModals from 'components/Modal/member/DeleteModals';
import { Stack, Button } from '@mui/material';
import styled from 'styled-components';

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
  box-shadow: 5px 5px 3px 3px grey;
`;

export const Row1 = styled.div`
  align-self: center;
  font-size: 2rem;
  padding: 2rem;
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

export const MemberButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
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

export const DeleteModalBackDrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  background-color: rgb(156, 165, 182);
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
  height: 750px;
  border-radius: 0.5rem;
  position: relative;

  > div.close-btn {
    position: absolute;
    bottom: 620px;
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
  width: 200px;
  height: 100px;
  position: relative;

  > div.close-btn {
    position: absolute;
    bottom: 150px;
    left: 16rem;
    font-size: 22px;
    cursor: pointer;
  }
`;

const SpecificMember = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const getSpecMember = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/admin/management/member/${id}`
      );
      setMemberData(response.data);
      setLoading(false);
    };
    getSpecMember();
  }, []);

  const openModalHandler = () => {
    setLoading(false);
    setUpdateOpen(true);
  };

  const closeModalHandler = () => {
    setLoading(false);
    setUpdateOpen(false);
  };

  const openDeleteHandler = () => {
    setLoading(false);
    setDeleteOpen(true);
  };

  const closeDeleteHandler = () => {
    setLoading(false);
    setDeleteOpen(false);
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <Container>
      {loading ? <Loading /> : null}
      <Center>
        {memberData.number === undefined ? (
          '해당 기수의 정보를 찾을 수 없습니다'
        ) : (
          <>
            <Row1>{memberData.member_name}</Row1>
            <Row2>
              <Title>기수</Title>
              <Content>{memberData.number.number_name}</Content>
            </Row2>
            <Row2>
              <Title>Pre-Project 팀</Title>
              <Content>
                {memberData.pre_team_id === null ? '-' : memberData.pre_team_id}
              </Content>
            </Row2>
            <Row2>
              <Title>Main-Project 팀</Title>
              <Content>
                {memberData.main_team_id === null
                  ? '-'
                  : memberData.main_team_id}
              </Content>
            </Row2>
            <Row2>
              <Title>학습 코스 구분</Title>
              <Content>
                {memberData.position_cd
                  ? memberData.position_cd === 'p_be'
                    ? '백엔드'
                    : '프론트엔드'
                  : null}
              </Content>
            </Row2>
            <Row2>
              <Title>학습 여부</Title>
              <Content>
                {memberData.is_active
                  ? memberData.is_active
                    ? '학습중'
                    : '하차'
                  : null}
              </Content>
            </Row2>
          </>
        )}
        <Stack spacing={1} direction='row'>
          <MemberButton variant='contained' onClick={openModalHandler}>
            수정
          </MemberButton>
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
                    <UpdateModals setModalOpen={setUpdateOpen} />
                  </div>
                </ModalView>
              </ModalBackdrop>
            ) : null}
          </ModalContainer>
          <MemberButton variant='contained' onClick={openDeleteHandler}>
            비활성
          </MemberButton>
          <ModalContainer>
            {deleteOpen ? (
              <DeleteModalBackDrop onClick={openDeleteHandler}>
                <DeleteModalView
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
                </DeleteModalView>
              </DeleteModalBackDrop>
            ) : null}
          </ModalContainer>
          <MemberButton variant='contained' onClick={handleNavigate}>
            뒤로가기
          </MemberButton>
        </Stack>
      </Center>
    </Container>
  );
};

export default SpecificMember;
