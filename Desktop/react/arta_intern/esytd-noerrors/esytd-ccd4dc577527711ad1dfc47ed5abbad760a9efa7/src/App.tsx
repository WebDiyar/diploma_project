import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';
import RequestPage from './pages/RequestPage/RequestPage';
import AddPage from './pages/(crudPages)/AddPage';
import EditPage from './pages/(crudPages)/EditPage';
import 'react-material-symbols/rounded';
import './App.css';

const AuthLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<AuthLayout />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/requests" element={<RequestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
