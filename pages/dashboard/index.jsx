import Sidebar from "../../components/Sidebar";
import Topbar_dashboard from "../../components/Topbar_dashboard";

export default function Dashboard() {
    return (
        <div className="flex h-screen w-screen">
            <div className="flex-none w-1/5 border border-yellow-300">1</div>
            <div className="flex-col w-4/5 border border-yellow-300">
                <div className=" border border-yellow-300">
                    <Sidebar/>
                </div>
                <div className="h-auto border border-yellow-300">3</div>
            </div>
        </div>
    );
}