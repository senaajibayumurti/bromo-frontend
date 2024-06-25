import React, { useState, useEffect } from 'react';
import FormInputData from "../../../components/Forms/FormInputData";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import RoundedContainer from "../../../components/Layout/RoundedContainer";
import UnassignedWorker from '../../../components/Layout/UnassignedWorker';
import withRoleAuth from '../../../components/hoc/withRoleAuth';

const InputData = () => {
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

                const userResponse = await fetch(`http://127.0.0.1:8080/api/user/${userId}`, {
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
                    ? `http://127.0.0.1:8080/api/kandangByUser/${userId}`
                    : 'http://127.0.0.1:8080/api/owner/kandang';

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
                <RoundedContainer label={'Formulir Data Kandang'}>
                    {selectedKandang && <FormInputData idKandang={selectedKandang.id} />}
                </RoundedContainer>
            )}
        </DashboardLayout>
    );
};

// Wrap the component with withRoleAuth and specify allowed roles
export default withRoleAuth(InputData, ['anak kandang']);
