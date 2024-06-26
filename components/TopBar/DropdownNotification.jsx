import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function DropdownNotification() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || !dropdown.current || dropdown.current.contains(target) || trigger.current.contains(target))
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  return (
    <li className="relative">
      <div
        id="dropdownNotification"
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full hover:text-primary cursor-pointer"
      >
        <span
          className={`absolute -top-0.5 right-0 z-50 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-50 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>
        <FontAwesomeIcon icon={faBell} className="fill-current duration-300 ease-in-out" style={{ fontSize: "24px" }} />
      </div>

      {dropdownOpen && (
        <div
          ref={dropdown}
          className="absolute -right-27 flex flex-col rounded-md border border-bromo-green-200 bg-bromo-green-100 shadow-default right-0 w-80 max-h-60 overflow-y-auto"
        >
          <div className="px-4 py-3 bg-bromo-green-500">
            <h5 className="text-lg font-medium text-bromo-neutral-50">Notifikasi</h5>
          </div>
          <ul>
            <li className="border-t border-bromo-green-200 px-4.5 py-3 hover:bg-gray-2">
              <p className="text-sm text-black">Notifikasi 1</p>
              <p className="text-xs">12 Mei, 2024</p>
            </li>
            <li className="border-t border-bromo-green-200 px-4.5 py-3 hover:bg-gray-2">
              <p className="text-sm text-black">Notifikasi 2</p>
              <p className="text-xs">10 Mei, 2024</p>
            </li>
            <li className="border-t border-bromo-green-200 px-4.5 py-3 hover:bg-gray-2">
              <p className="text-sm text-black">Anggap saja ini notifikasi</p>
              <p className="text-xs">08 Mei, 2024</p>
            </li>
            <li className="border-t border-bromo-green-200 px-4.5 py-3 hover:bg-gray-2">
              <p className="text-sm text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam nemo quod quibusdam nisi voluptatum dolorum autem fuga, est magnam sed asperiores eum qui eius similique culpa tempore aliquid minima! Provident.</p>
              <p className="text-xs">06 Mei, 2024</p>
            </li>
            {/* Add more list items as needed */}
          </ul>
        </div>
      )}
    </li>
  );
}
