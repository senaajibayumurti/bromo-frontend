// pages/dashboard/pekerja/Pekerja.jsx
import React from 'react';
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import RoundedContainer from "../../../components/Layout/RoundedContainer";
import TablePekerja from "../../../components/Tables/TablePekerja";
import withRoleAuth from '../../../components/hoc/withRoleAuth';

const Pekerja = () => {
    return (
        <DashboardLayout>
            <RoundedContainer label={'Data Pekerja'}>
                <TablePekerja />
            </RoundedContainer>
        </DashboardLayout>
    );
};

// Wrap the component with withRoleAuth and specify allowed roles
export default withRoleAuth(Pekerja, ['owner']);
