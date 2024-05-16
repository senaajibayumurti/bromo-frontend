import DropdownNotification from "../TopBar/DropdownNotification";
import DropdownProfile from "../TopBar/DropdownProfile";

export default function Topbar_dashboard(){
    return (
        <div className="flex min-h-16 w-full px-8 items-center justify-end bg-bromo-green-1-50">
            <div className="flex items-center gap-3 2xsm:gap-7 bg-bromo-green-1-50">
                <ul className="flex items-center gap-2 2xsm:gap-4">
                    <DropdownNotification/>
                </ul>
                <ul className="flex items-center gap-2 2xsm:gap-4">
                    <DropdownProfile/>
                </ul>
            </div>
        </div>
    );
}