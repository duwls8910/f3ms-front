import { Link } from 'react-router-dom';
import memberDummy from 'static/memberDummy';

export default function Member() {
  return (
    <>
      <div className='all_members'>
        <div>
          {memberDummy.map((member) => (
            <div>
              <Link to='/admin/management/issue' key={member.id}>
                {member.member_name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
