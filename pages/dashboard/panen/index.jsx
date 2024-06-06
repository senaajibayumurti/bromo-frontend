import DashboardLayout from "../../../components/Layout/DashboardLayout";
import RoundedContainer from "../../../components/Layout/RoundedContainer";
import TablePanen from "../../../components/Tables/TablePanen";

export default function Panen(children) {
    return (
        <DashboardLayout>
            <RoundedContainer>
                <TablePanen/>
            </RoundedContainer>
        </DashboardLayout>
    );
}