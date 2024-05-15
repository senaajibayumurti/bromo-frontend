import Topbar_dashboard from "../../components/Topbar_dashboard";
import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen w6 overflow-hidden">
            <Sidebar/>
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Topbar_dashboard/>
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
