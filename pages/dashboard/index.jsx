import React, { useState } from 'react';
import DashboardLayout from "../../components/Layout/DashboardLayout";
import DropdownKandang from "../../components/Dropdown/DropdownKandang";
import FormKlasifikasi from "../../components/Forms/FormKlasifikasi";
import RoundedContainer from "../../components/Layout/RoundedContainer";

const Beranda = () => {
    const [selectedKandang, setSelectedKandang] = useState(null);

    return (
        <DashboardLayout>
            <DropdownKandang setSelectedKandang={setSelectedKandang} />
            <RoundedContainer label={'Forecasting'}>
                {/* <DonutChart /> */}
            </RoundedContainer>
            <RoundedContainer label={'Klasifikasi'}>
                <FormKlasifikasi idKandang={selectedKandang ? selectedKandang.id_kandang : null} />
            </RoundedContainer>
        </DashboardLayout>
    );
};

export default Beranda;
