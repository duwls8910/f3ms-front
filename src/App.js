import React from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Header from 'components/Nav/Header';
import Login from 'pages/sign/Login';
import Admin from 'pages/Admin';

import ReadNumber from 'pages/numberPage/Read';
import ReadTeam from 'pages/teamPage/Read';
import ReadMember from 'pages/memberPage/Read';

import SpecificNumber from 'pages/numberPage/SpecificNumber';
import SpecificTeam from 'pages/teamPage/SpecificTeam';
import SpecificMember from 'pages/memberPage/SpecificMember';

function App() {
  // let { id } = useParams();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/admin/management' element={<Admin />} />

        <Route path='/admin/management/number' element={<ReadNumber />} />
        <Route path='/admin/management/pre-team' element={<ReadTeam />} />
        <Route path='/admin/management/member' element={<ReadMember />} />

        <Route
          path='/admin/management/number/:id'
          element={<SpecificNumber />}
        />
        <Route
          path='/admin/management/pre-team/:id'
          element={<SpecificTeam />}
        />
        <Route
          path='/admin/management/member/:id'
          element={<SpecificMember />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
