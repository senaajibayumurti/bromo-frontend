// pages/dashboard/panen/TablePanen.jsx
import React from 'react';
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import RoundedContainer from "../../../components/Layout/RoundedContainer";
import TablePanen from "../../../components/Tables/TablePanen";
import withRoleAuth from '../../../components/hoc/withRoleAuth';

const Panen = () => {
    return (
        <DashboardLayout>
            <RoundedContainer label={'Data Panen'}>
                <TablePanen />
            </RoundedContainer>
        </DashboardLayout>
    );
};

// Wrap the component with withRoleAuth and specify allowed roles
export default withRoleAuth(Panen, ['owner']);
