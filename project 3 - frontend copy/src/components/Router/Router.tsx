import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import VacationsArea from '../VacationsArea/VacationsArea';
import EditVacation from '../VacationsArea/EditVacation/EditVacation';
import Register from '../authArea/Register/Register';
import Login from '../authArea/Login/Login';
import FollowersGraph from '../FollowersGraph/FollowersGraph';

interface RouterProps { }

const Router: FC<RouterProps> = () => (
    <Routes>
        
        {/* Default route */}
        <Route path="/" element={<VacationsArea />} />
        <Route path="/vacations/statistics" element={<FollowersGraph />}/>

        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />

        {/* Page not Found */}
        <Route path="*" element={<PageNotFound />} />

    </Routes>
);

export default Router;

