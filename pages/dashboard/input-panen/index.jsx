
import FormInputPanen from "../../../components/Forms/FormInputPanen";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import RoundedContainer from "../../../components/Layout/RoundedContainer";

export default function InputPanen(children) {
    return (
        <DashboardLayout>
            <RoundedContainer>
                <FormInputPanen/>
            </RoundedContainer>
        </DashboardLayout>
    );
}