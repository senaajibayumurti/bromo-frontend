import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../components/Layout/DashboardLayout";
import DropdownKandang from "../../components/Dropdown/DropdownKandang";
import FormKlasifikasi from "../../components/Forms/FormKlasifikasi";
import RoundedContainer from "../../components/Layout/RoundedContainer";
import DonutChart from "../../components/Charts/DonutChart";

const Beranda = () => {
    return (
        <DashboardLayout>
            <DropdownKandang s/>
            <RoundedContainer label={'Forecasting'}>
                {/* <DonutChart /> */}
            </RoundedContainer>
            <RoundedContainer label={'Klasifikasi'}>
                <FormKlasifikasi/>
            </RoundedContainer>
        </DashboardLayout>
    );
};

export default Beranda;
