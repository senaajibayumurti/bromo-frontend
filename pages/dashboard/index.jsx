import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function Dashboard() {
    return (
        <div className="flex h-screen w-full">
            <div className="w-1/4 h-screen">
                <Sidebar />
            </div>

            <div className="w-3/4 h-screen flex flex-col">
                <div className="h-min">
                    <Topbar/>
                </div>
                <div className="flex w-screen h-fit items-center justify-center">
                    <h1 className="text-4xl font-bold">Dashboard Page</h1>
                </div>
            </div>
        </div>
    );
}
