import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';

const HomePage = React.lazy(() => import('../pages/home/home.page'))

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_KEYS.ROUTER_KEYS.ROOT} element={<HomePage />} />
        <Route path='*' element={<Navigate to={APP_KEYS.ROUTER_KEYS.ROOT} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
