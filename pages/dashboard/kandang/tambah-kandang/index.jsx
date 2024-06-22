import React, { useState } from 'react';
import RoundedContainer from "../../../../components/Layout/RoundedContainer";
import withRoleAuth from '../../../../components/hoc/withRoleAuth';
import FormKandang from '../../../../components/Forms/FormKandang';
import DashboardLayout from '../../../../components/Layout/DashboardLayout';

const TambahKandang = () => {
    return (
        <DashboardLayout>
            <RoundedContainer label={'Tambah Kandang'}>
                <FormKandang/>
            </RoundedContainer>
        </DashboardLayout>
    );
};

export default withRoleAuth(TambahKandang, ['owner']);
