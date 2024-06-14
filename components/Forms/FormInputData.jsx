import React, { useState } from 'react';
import Button from '../../components/Button'; // Adjust the import path as necessary

const FormInputData = ({ idKandang }) => {
  const [data, setData] = useState({
    idKandang: idKandang || '',
    pakan: '',
    minum: '',
    bobot: '',
    populasi: '',
    jumlahAyamMati: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSave = () => {
    console.log('Data saved:', data);
    // Add your save logic here
  };

  const handleCancel = () => {
    setData({
      idKandang: idKandang || '',
      pakan: '',
      minum: '',
      bobot: '',
      populasi: '',
      jumlahAyamMati: ''
    });
  };

  return (
    <div className="flex flex-col gap-9">
      <form action="#">
        <div className="p-6.5">
          {/* ID Kandang */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              ID Kandang
            </label>
            <div className="relative">
              <input
                type="text"
                name="idKandang"
                value={data.idKandang}
                onChange={handleChange}
                placeholder="ID Kandang"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
            </div>
          </div>
          {/* Pakan */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Pakan
            </label>
            <div className="relative">
              <input
                type="text"
                name="pakan"
                value={data.pakan}
                onChange={handleChange}
                placeholder="Pakan"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">kg</span>
            </div>
          </div>
          {/* Minum */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Minum
            </label>
            <div className="relative">
              <input
                type="text"
                name="minum"
                value={data.minum}
                onChange={handleChange}
                placeholder="Minum"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">liter</span>
            </div>
          </div>
          {/* Bobot */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Bobot
            </label>
            <div className="relative">
              <input
                type="text"
                name="bobot"
                value={data.bobot}
                onChange={handleChange}
                placeholder="Bobot"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-16 text-bromo-gray-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">g/ekor</span>
            </div>
          </div>
          {/* Populasi */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Populasi
            </label>
            <div className="relative">
              <input
                type="text"
                name="populasi"
                value={data.populasi}
                onChange={handleChange}
                placeholder="Populasi"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">ekor</span>
            </div>
          </div>
          {/* Jumlah Ayam Mati */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Jumlah Ayam Mati
            </label>
            <div className="relative">
              <input
                type="text"
                name="jumlahAyamMati"
                value={data.jumlahAyamMati}
                onChange={handleChange}
                placeholder="Jumlah Ayam Mati"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">ekor</span>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <Button label="Simpan" onClick={handleSave} type="success" />
            <Button label="Batal" onClick={handleCancel} type="error" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormInputData;
