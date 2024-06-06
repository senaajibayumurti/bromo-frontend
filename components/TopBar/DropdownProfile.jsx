import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faSignOutAlt, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const DropdownProfil = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  const handleNavigation = (url) => {
    window.location.href = url;
  };

  return (
    <div className="relative">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="hidden lg:block text-right">
          <span className="block text-sm font-medium">Paijo Subarjo</span>
          <span className="block text-xs">Pemilik</span>
        </div>
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/bromo.png"
            alt="User"
          />
        </div>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>

      {dropdownOpen && (
        <div ref={dropdown} className="absolute right-0 mt-4 w-48 bg-bromo-green-50 rounded-sm border border-gray-300 shadow-default">
          <ul className="flex flex-col gap-2 border-b border-gray-300 px-3 py-2">
            <li 
              className="flex items-center gap-3 text-sm font-medium cursor-pointer rounded-lg bg-bromo-green-50 text-bromo-gray-900 hover:bg-bromo-green-400 hover:text-bromo-gray-50 active:bg-bromo-green-500 active:text-bromo-gray-50 p-2" 
              onClick={() => handleNavigation('/dashboard/profil')}
            >
              <FontAwesomeIcon icon={faUser} />
              <span>Profil</span>
            </li>
          </ul>
          <ul className="flex flex-col gap-2 px-3 py-2">
            <li 
              className="flex items-center gap-3 text-sm font-medium cursor-pointer rounded-lg bg-bromo-green-50 text-bromo-gray-900 hover:bg-bromo-green-400 hover:text-bromo-gray-50 active:bg-bromo-green-500 active:text-bromo-gray-50 p-2 w-full text-left" 
              onClick={() => handleNavigation('/logout')}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Log Out</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownProfil;
