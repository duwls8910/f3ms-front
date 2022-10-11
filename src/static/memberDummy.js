import shortid from 'shortid';
import numberDummy from 'static/numberDummy';

const memberDummy = [
  {
    id: shortid(),
    member_name: '김코딩',
    position_cd: '',
    number_id: numberDummy[0],
    is_active: true,
  },
  {
    id: shortid(),
    member_name: '박해커',
    position_cd: '',
    number_id: numberDummy[0],
    is_active: true,
  },
  {
    id: shortid(),
    member_name: '최자바',
    position_cd: '',
    number_id: numberDummy[0],
    is_active: true,
  },
];

export default memberDummy;
