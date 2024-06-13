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

        // Fetch data for dropdown
        const responseKandang = await fetch('http://toko.technosv.my.id/api/data-kandang', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!responseKandang.ok) {
          throw new Error('Failed to fetch data-kandang');
        }

        const dataKandang = await responseKandang.json();

        // Fetch owner data
        const responseOwner = await fetch('http://toko.technosv.my.id/api/owner/kandang', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!responseOwner.ok) {
          throw new Error('Failed to fetch owner/kandang');
        }

        const dataOwner = await responseOwner.json();

        // Add owner data to corresponding kandang
        const mergedData = dataKandang.data.map(kandang => {
          const ownerInfo = dataOwner.data.find(owner => owner.id === kandang.id_kandang);
          return {
            ...kandang,
            nama_kandang: ownerInfo ? ownerInfo.nama_kandang : kandang.kandang,
            alamat_kandang: ownerInfo ? ownerInfo.alamat_kandang : '',
            luas_kandang: ownerInfo ? ownerInfo.luas_kandang : '',
            anak_kandang: ownerInfo ? ownerInfo.anak_kandang : null,
          };
        });

        setDataKandang(mergedData);

        if (mergedData[0]) {
          setLocalSelectedKandang(mergedData[0]);
          setSelectedKandang(mergedData[0]);
          localStorage.setItem('selectedKandangId', mergedData[0].id_kandang); // Save to localStorage
          localStorage.setItem('selectedAnakKandang', mergedData[0].anak_kandang.username); // Save to localStorage
          console.log('Selected Kandang ID:', mergedData[0].id_kandang); // Print to console
          console.log('Selected Anak Kandang Username:', mergedData[0].anak_kandang.username); // Print to console
          console.log('Luas Kandang:', mergedData[0].luas_kandang); // Print to console
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
          <span className="block text-lg font-bold">{selectedKandang ? selectedKandang.nama_kandang : "-"}</span>
          <span className="block text-sm">Alamat: {selectedKandang ? selectedKandang.alamat_kandang : "-"}</span>
          <span className="block text-sm">Peternak: {selectedKandang ? selectedKandang.anak_kandang.username : "-"}</span>
          <span className="block text-sm">Luas: {selectedKandang ? selectedKandang.luas_kandang : "-"} m²</span>
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
                    localStorage.setItem('selectedKandangId', kandang.id_kandang); // Save to localStorage
                    localStorage.setItem('selectedAnakKandang', kandang.anak_kandang.username); // Save to localStorage
                    console.log('Selected Kandang ID:', kandang.id_kandang); // Print to console
                    console.log('Selected Anak Kandang Username:', kandang.anak_kandang.username); // Print to console
                    console.log('Luas Kandang:', kandang.luas_kandang); // Print to console
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-bromo-neutral-1-400 cursor-pointer border-b border-b-bromo-green-200"
                >
                  <span className="block text-lg font-medium">{kandang.nama_kandang}</span>
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
