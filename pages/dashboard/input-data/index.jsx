import FormInputData from "../../../components/Forms/FormInputData";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import RoundedContainer from "../../../components/Layout/RoundedContainer";

export default function InputData(children) {
    return (
        <DashboardLayout>
            <RoundedContainer>
                <FormInputData/>
            </RoundedContainer>
        </DashboardLayout>
    );
}