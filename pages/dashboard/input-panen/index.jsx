import React, { useState, useEffect } from 'react';
import FormInputPanen from "../../../components/Forms/FormInputPanen";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import RoundedContainer from "../../../components/Layout/RoundedContainer";
import UnassignedWorker from '../../../components/Layout/UnassignedWorker';
import withRoleAuth from '../../../components/hoc/withRoleAuth';

const InputPanen = () => {
    const [selectedKandang, setSelectedKandang] = useState(null);
    const [kandangNotFound, setKandangNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const userId = localStorage.getItem('userId');
                if (!token) {
                    throw new Error('User is not authenticated');
                }

                const userResponse = await fetch(`https://toko.technosv.my.id/api/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await userResponse.json();
                const userRole = userData.data.status;

                const apiUrl = userRole === 'anak kandang'
                    ? `https://toko.technosv.my.id/api/kandangByUser/${userId}`
                    : 'https://toko.technosv.my.id/api/owner/kandang';

                const response = await fetch(apiUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch kandang data');
                }

                const jsonData = await response.json();
                if (jsonData.data.length === 0) {
                    setKandangNotFound(true);
                } else {
                    setKandangNotFound(false);
                    setSelectedKandang(jsonData.data[0]);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
                setKandangNotFound(true);
            }
        };

        fetchData();
    }, []);

    return (
        <DashboardLayout>
            {kandangNotFound ? (
                <RoundedContainer>
                    <UnassignedWorker />
                </RoundedContainer>
            ) : (
                <RoundedContainer label={'Formulir Laporan Panen'}>
                    {selectedKandang && <FormInputPanen idKandang={selectedKandang.id} />}
                </RoundedContainer>
            )}
        </DashboardLayout>
    );
};

// Wrap the component with withRoleAuth and specify allowed roles
export default withRoleAuth(InputPanen, ['anak kandang']);
