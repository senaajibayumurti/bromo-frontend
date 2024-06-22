import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faAngleDown, faPerson } from "@fortawesome/free-solid-svg-icons";
import Overlay from "../Layout/Overlay";
import TimedOverlay from "../Layout/TimedOverlay";

const DropdownProfil = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID is not available');
        }

        const response = await fetch(`https://toko.technosv.my.id/api/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('Received user data:', data);
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

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

  const handleLogout = () => {
    setShowLogoutOverlay(true);
  };

  const confirmLogout = () => {
    // Logic for logging out
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    window.location.href = '/'; // Redirect to home or login page

    setShowSuccessOverlay(true);
  };

  const cancelLogout = () => {
    setShowLogoutOverlay(false);
  };

  return (
    <div className="relative">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/bromo.png"
            alt="User"
          />
        </div>
        <div className="hidden lg:block text-start">
          <span className="block text-sm font-medium">{userData.nama_lengkap || '-'}</span>
          <span className="block text-xs">{userData.status || '-'}</span>
        </div>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>

      {dropdownOpen && (
        <div ref={dropdown} className="absolute right-0 mt-4 w-72 bg-bromo-green-100 rounded-lg border border-bromo-green-200 shadow-default">
          <ul className="flex flex-col">
            <li 
              className="flex items-center gap-3 text-sm font-medium cursor-pointer rounded-lg bg-bromo-green-100 text-bromo-gray-900 hover:bg-bromo-green-500 hover:text-bromo-neutral-50 active:bg-bromo-green-1000 active:text-bromo-neutral-50 p-2 w-full text-left" 
              onClick={() => handleNavigation('/dashboard/profil')}
            >
              <FontAwesomeIcon icon={faPerson} />
              <span>Profile</span>
            </li>
            <li 
              className="flex items-center gap-3 text-sm font-medium cursor-pointer rounded-lg bg-bromo-green-100 text-bromo-gray-900 hover:bg-bromo-green-500 hover:text-bromo-neutral-50 active:bg-bromo-green-1000 active:text-bromo-neutral-50 p-2 w-full text-left" 
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Log Out</span>
            </li>
          </ul>
        </div>
      )}

      {showLogoutOverlay && (
        <Overlay 
          text="Apakah Anda yakin ingin keluar akun?"
          onYes={confirmLogout}
          onNo={cancelLogout}
        />
      )}
      {showSuccessOverlay && (
          <TimedOverlay 
              teks="Berhasil Logout!"
              type="success"
              onClose={() => setShowSuccessOverlay(false)}
          />
      )}
    </div>
  );
};

export default DropdownProfil;
