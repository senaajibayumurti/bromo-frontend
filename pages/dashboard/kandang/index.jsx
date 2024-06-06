import DashboardLayout from "../../../components/Layout/DashboardLayout";
import RoundedContainer from "../../../components/Layout/RoundedContainer";
import TableFour from "../../../components/Tables/TableFour";
import TableKandang from "../../../components/Tables/TableKandang";

export default function Kandang(children) {
    return (
        <DashboardLayout>
            <RoundedContainer>
                <TableKandang/>
            </RoundedContainer>
        </DashboardLayout>
    );
}