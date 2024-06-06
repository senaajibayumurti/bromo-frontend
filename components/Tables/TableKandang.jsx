import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const DropdownKandang = ({ onSelectKandang }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedKandang, setSelectedKandang] = useState(null);
  const [dataKandang, setDataKandang] = useState([]);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/kandang'); // Ganti dengan endpoint API yang sesuai
        const data = await response.json();
        setDataKandang(data);
        setSelectedKandang(data[0] || null);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || !dropdown.current || dropdown.current.contains(target) || trigger.current.contains(target))
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    // Call the onSelectKandang function with the selected kandang when it changes
    if (selectedKandang) {
      onSelectKandang(selectedKandang);
    }
  }, [selectedKandang, onSelectKandang]);

  return (
    <div className="relative w-full">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex justify-between items-center font-medium text-bromo-neutral-50 p-4 bg-bromo-green-500 text-bromo-gray-900 cursor-pointer rounded-lg border border-stroke"
      >
        <div>
          <span className="block text-lg font-bold">{selectedKandang ? selectedKandang.kandang : "-"}</span>
          <span className="block text-sm">Alamat: {selectedKandang ? selectedKandang.alamat : "-"}</span>
          <span className="block text-sm">Luas: {selectedKandang ? selectedKandang.luas : "-"}</span>
        </div>
        <FontAwesomeIcon icon={faAngleDown}/>
      </div>

      {dropdownOpen && (
        <div
          ref={dropdown}
          className="absolute left-0 mt-2 w-full bg-neutral-50 rounded-md border border-gray-200 shadow-default z-10"
        >
          <ul>
            {dataKandang.length > 0 ? (
              dataKandang.map((kandang, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedKandang(kandang);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-bromo-neutral-1-400 cursor-pointer"
                >
                  <span className="block text-lg font-medium">{kandang.kandang}</span>
                  <span className="block text-sm">Alamat: {kandang.alamat}</span>
                  <span className="block text-sm">Luas: {kandang.luas}</span>
                </li>
              ))
            ) : (
              <li className="px-4 py-2">No data available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownKandang;
