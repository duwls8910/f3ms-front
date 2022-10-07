import { Link } from 'react-router-dom';
import teamDummy from 'static/teamDummy';

export default function Team() {
  return (
    <>
      <div className='all_teams'>
        <div>
          {teamDummy.map((team) => (
            <div>
              <Link to='/admin/management/team/issue' key={team.id}>
                {team.team_id}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
