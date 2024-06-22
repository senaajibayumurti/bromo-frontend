import React from 'react';
import DashboardLayout from '../../../../components/Layout/DashboardLayout';
import RoundedContainer from '../../../../components/Layout/RoundedContainer';
import FormEditKandang from '../../../../components/Forms/FormEditKandang';
import withRoleAuth from '../../../../components/hoc/withRoleAuth';

const EditKandang = () => {
    return (
        <DashboardLayout>
            <RoundedContainer label={'Edit Kandang'}>
            <FormEditKandang/>
            </RoundedContainer>
        </DashboardLayout>
    );
};

export default withRoleAuth(EditKandang, ['owner']);
