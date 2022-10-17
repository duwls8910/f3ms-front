// import React from 'react';
// import { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
// import Loading from 'utils/LoadingIndicator';

// const Login = () => {
//   const [loginInfo, setLoginInfo] = useState({
//     userEmail: '',
//     password: '',
//   });
//   const [loading, setLoading] = useState(false);

//   const handleInputValue = (key) => (e) => {
//     setLoginInfo({ ...loginInfo, [key]: e.target.value });
//   };

//   const handleLogin = () => {
//     setLoading(true);
//     const { userEmail, password } = loginInfo;
//     axios
//       .post(
//         `${process.env.REACT_APP_URL}`,
//         { userEmail: userEmail, password: password },
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true,
//         }
//       )
//       .then((res) => {
//         if (res.data.data.accessToken) {
//           localStorage.setItem('user', res.data.data.accessToken);
//         }
//         setLoading(false);
//         console.log('로그인 성공');
//       })
//       .catch((err) => {
//         setLoading(false);
//       });
//   };

//   return (
//     <>
//       {loading ? <Loading /> : null}
//       <div className='email'>
//         <TextField
//           margin='normal'
//           required
//           id='email'
//           label='Email Address'
//           name='email'
//           autoComplete='email'
//           autoFocus
//           onChange={handleInputValue('userEmail')}
//         />
//       </div>
//       <div className='password'>
//         <TextField
//           margin='normal'
//           required
//           id='outlined-password-input'
//           label='Password'
//           type='password'
//           autoComplete='current-password'
//         />
//       </div>
//       <FormControlLabel
//         control={<Checkbox value='remember' color='primary' />}
//         label='계정 저장하기'
//       />
//       <br />
//       <Button variant='contained' type='submit' onClick={handleLogin}>
//         로그인
//       </Button>
//     </>
//   );
// };

import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Loading from 'utils/LoadingIndicator';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    userEmail: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    const userinfo = {
      email: 'kimcoding@codestates.com',
      password: 'a12341234',
    };
    await fetch(`${process.env.REACT_APP_URL}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(userinfo),
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    console.log(userinfo);
  };

  // const handleLogin = (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   const { userEmail, password } = loginInfo;
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_URL}`,
  //       { userEmail: userEmail, password: password },
  //       {
  //         headers: { 'Content-Type': 'application/json' },
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data.data.accessToken) {
  //         localStorage.setItem('user', res.data.data.accessToken);
  //       }
  //       setLoading(false);
  //       console.log('로그인 성공');
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.log(err);
  //     });
  // };

  return (
    <>
      {loading ? <Loading /> : null}
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              F3MS
            </Typography>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={handleInputValue('userEmail')}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={handleInputValue('password')}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='계정 기억하기'
            />
            <Button
              type='submit'
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              로그인
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
