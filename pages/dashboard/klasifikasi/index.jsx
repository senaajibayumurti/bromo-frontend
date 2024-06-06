import DashboardLayout from "../../../components/Layout/DashboardLayout";
import FormOne from "../../../components/Forms/FormOne";
import FormKlasifikasi from "../../../components/Forms/FormKlasifikasi";
import RoundedContainer from "../../../components/Layout/RoundedContainer";

export default function Panen(children) {
    return (
        <DashboardLayout>
            <RoundedContainer>
                <FormKlasifikasi/>
            </RoundedContainer>
        </DashboardLayout>
    );
}