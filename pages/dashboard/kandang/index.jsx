import React, { useState } from 'react';
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import RoundedContainer from "../../../components/Layout/RoundedContainer";
import TableKandang from "../../../components/Tables/TableKandang";
import withRoleAuth from '../../../components/hoc/withRoleAuth';

const Kandang = () => {
    const handleNavigation = (url) => {
        window.location.href = url;
    };

    return (
        <DashboardLayout>
            <RoundedContainer
                label={'Daftar Kandang'}
                buttonLabel={'Tambah Kandang'} // Added buttonLabel prop
                onButtonClick={() => handleNavigation('/dashboard/kandang/tambah-kandang')}
                buttonType={'success'} // Added buttonType prop
            >
                <TableKandang/>
            </RoundedContainer>
        </DashboardLayout>
    );
};

export default withRoleAuth(Kandang, ['owner']);
