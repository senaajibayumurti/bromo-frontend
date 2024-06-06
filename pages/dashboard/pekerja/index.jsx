import DashboardLayout from "../../../components/Layout/DashboardLayout";
import RoundedContainer from "../../../components/Layout/RoundedContainer";
import TablePekerja from "../../../components/Tables/TablePekerja";

export default function Pekerja(children) {
    return (
        <DashboardLayout>
            <RoundedContainer>
                <TablePekerja/>
            </RoundedContainer>
        </DashboardLayout>
    );
}