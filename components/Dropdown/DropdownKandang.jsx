import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const dataKandang = [
    {
        kandang: "Kandang A",
        tanggalMulai: "Jan 13, 2023",
        alamat: "Jl. Pertanian No.1",
        luas: "100 m²",
        pekerja: "Pekerja A",
        status: "Aktif",
    },
    {
        kandang: "Kandang B",
        tanggalMulai: "Jan 14, 2023",
        alamat: "Jl. Pertanian No.2",
        luas: "120 m²",
        pekerja: "Pekerja B",
        status: "Rehat",
    },
    {
        kandang: "Kandang C",
        tanggalMulai: "Jan 15, 2023",
        alamat: "Jl. Pertanian No.3",
        luas: "130 m²",
        pekerja: "Pekerja C",
        status: "Aktif",
    },
    {
        kandang: "Kandang D",
        tanggalMulai: "Jan 16, 2023",
        alamat: "Jl. Pertanian No.4",
        luas: "140 m²",
        pekerja: "Pekerja D",
        status: "Rehat",
    },
];

const DropdownKandang = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedKandang, setSelectedKandang] = useState(dataKandang[0]);

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
        <div className="relative w-full">
        <div
            ref={trigger}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex justify-between items-center p-4 bg-bromo-green-50 text-bromo-gray-900 cursor-pointer rounded border border-stroke"
        >
            <div>
                <span className="block text-lg font-bold">{selectedKandang.kandang}</span>
                <span className="block text-sm">Alamat: {selectedKandang.alamat}</span>
                <span className="block text-sm">Luas: {selectedKandang.luas}</span>
            </div>
            <FontAwesomeIcon icon={faAngleDown} />
        </div>

        {dropdownOpen && (
            <div
            ref={dropdown}
            className="absolute left-0 mt-2 w-full bg-bromo-green-50 rounded-sm border border-gray-300 shadow-default z-10"
            >
            <ul>
                {dataKandang.map((kandang, index) => (
                <li
                    key={index}
                    onClick={() => {
                    setSelectedKandang(kandang);
                    setDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-bromo-green-1-400 cursor-pointer"
                >
                    <span className="block text-lg font-medium">{kandang.kandang}</span>
                    <span className="block text-sm">{kandang.alamat}</span>
                    <span className="block text-sm">{kandang.luas}</span>
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
};

export default DropdownKandang;
