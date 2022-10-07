import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from 'components/Nav/Header';
import Login from 'pages/sign/Login';
import Admin from 'pages/Admin';

import ReadNumber from 'pages/numberPage/Read';
import ReadTeam from 'pages/teamPage/Read';
import ReadMember from 'pages/memberPage/Read';

import NumberList from 'pages/numberPage/numberList';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/admin/management' element={<Admin />} />
        <Route path='/admin/management/number' element={<ReadNumber />} />
        <Route
          path='/admin/management/number/:number'
          element={<NumberList />}
        />
        <Route path='/admin/management/team' element={<ReadTeam />} />
        <Route path='/admin/management/member' element={<ReadMember />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
