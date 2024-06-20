import React from 'react';
import Breadcrumbs from "../Navigation/BreadCrumb";
import DropdownNotification from "./DropdownNotification";
import DropdownProfile from "./DropdownProfile";

export default function Topbar_dashboard() {
    return (
        <div className="flex min-h-16 w-full px-8 items-center justify-between bg-gray-50 shadow-md z-50">
            <div className="flex items-center">
                <Breadcrumbs />
            </div>
            <div className="flex items-center gap-3 2xsm:gap-7 bg-gray-50">
                <ul className="flex items-center gap-2 2xsm:gap-4">
                    <DropdownNotification />
                </ul>
                <ul className="flex items-center gap-2 2xsm:gap-4">
                    <DropdownProfile />
                </ul>
            </div>
        </div>
    );
}
