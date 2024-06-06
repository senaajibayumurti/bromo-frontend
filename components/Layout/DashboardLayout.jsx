import React from 'react'; // Import React agar dapat menggunakan JSX

import Topbar_dashboard from "../TopBar/Topbar_dashboard";
import Sidebar from "../Navigation/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen w6 overflow-hidden">
            <Sidebar/>
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-bromo-neutral-50">
                <Topbar_dashboard/>
                <main>
                    <div className="p-4 md:p-6 2xl:p-10 z-0">
                        {React.Children.map(children, (child, index) => {
                            return (
                                <div className="max-w-screen-2xl mb-5" key={index}>
                                    {child}
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
}
