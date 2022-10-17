import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../utils/LoadingIndicator';
import { Button } from '@mui/material';

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    try {
      axios
        .get(`${process.env.REACT_APP_URL}`, {
          withCredentials: true,
        })
        .then((res) => {
          navigate('/');
          setLoading(false);
          console.log('logout complete');
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        {loading ? <Loading /> : null}
        <Button onClick={handleLogout}>로그아웃</Button>
      </div>
    </>
  );
};

export default Logout;
