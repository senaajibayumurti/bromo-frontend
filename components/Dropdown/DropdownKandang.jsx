import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const DropdownKandang = ({ setSelectedKandang }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dataKandang, setDataKandang] = useState([]);
  const [selectedKandang, setLocalSelectedKandang] = useState(null);
  const [error, setError] = useState(null);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch('http://toko.technosv.my.id/api/data-kandang', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setDataKandang(data.data);
        if (data.data[0]) {
          setLocalSelectedKandang(data.data[0]);
          setSelectedKandang(data.data[0]);
          localStorage.setItem('selectedKandangId', data.data[0].id_kandang); // Corrected to use 'id_kandang'
          console.log('Selected Kandang ID:', data.data[0].id_kandang); // Corrected to use 'id_kandang'
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError(error.message || 'Failed to fetch data');
        if (error.message === 'User is not authenticated') {
          // Handle redirect or show login prompt
          // For example, redirect to login page:
          // window.location.href = '/login';
        }
      }
    };

    fetchData();
  }, [setSelectedKandang]);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || !dropdown.current || dropdown.current.contains(target) || trigger.current.contains(target))
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>; // Display error message if fetching fails
  }

  return (
    <div className="relative w-full">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex justify-between items-center font-medium text-bromo-neutral-50 p-4 bg-bromo-green-500 text-bromo-gray-900 cursor-pointer rounded-lg border border-stroke"
      >
        <div>
          <span className="block text-lg font-bold">{selectedKandang ? selectedKandang.kandang : "-"}</span>
          <span className="block text-sm">Populasi: {selectedKandang ? selectedKandang.populasi : "-"}</span>
          <span className="block text-sm">Luas: {selectedKandang ?.luas_kandang} m²</span>
        </div>
        <FontAwesomeIcon icon={faAngleDown}/>
      </div>

      {dropdownOpen && (
        <div
          ref={dropdown}
          className="absolute left-0 mt-2 w-full bg-bromo-green-100 rounded-md border border-gray-200 shadow-default z-10"
        >
          <ul>
            {dataKandang.length > 0 ? (
              dataKandang.map((kandang, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setLocalSelectedKandang(kandang);
                    setSelectedKandang(kandang);
                    localStorage.setItem('selectedKandangId', kandang.id_kandang); // Corrected to use 'id_kandang'
                    console.log('Selected Kandang ID:', kandang.id_kandang); // Corrected to use 'id_kandang'
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-bromo-neutral-1-400 cursor-pointer border-b border-b-bromo-green-200"
                >
                  <span className="block text-lg font-medium">{kandang.kandang}</span>
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
