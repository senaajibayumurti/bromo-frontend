import React, { useState } from 'react';
import Button from '../../components/Button'; // Adjust the import path as necessary

const FormInputPanen = ({ idKandang }) => {
  const [data, setData] = useState({
    idKandang: idKandang || '',
    tanggalMulai: '',
    tanggalPanen: '',
    jumlahPanen: '',
    bobotTotal: ''
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
      tanggalMulai: '',
      tanggalPanen: '',
      jumlahPanen: '',
      bobotTotal: ''
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
          {/* Tanggal Mulai */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Tanggal Mulai
            </label>
            <div className="relative">
              <input
                type="text"
                name="tanggalMulai"
                value={data.tanggalMulai}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
            </div>
          </div>
          {/* Tanggal Panen */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Tanggal Panen
            </label>
            <div className="relative">
              <input
                type="text"
                name="tanggalPanen"
                value={data.tanggalPanen}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
            </div>
          </div>
          {/* Jumlah Panen */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Jumlah Panen
            </label>
            <div className="relative">
              <input
                type="text"
                name="jumlahPanen"
                value={data.jumlahPanen}
                onChange={handleChange}
                placeholder="Jumlah Panen"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">ekor</span>
            </div>
          </div>
          {/* Bobot Total */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
              Bobot Total
            </label>
            <div className="relative">
              <input
                type="text"
                name="bobotTotal"
                value={data.bobotTotal}
                onChange={handleChange}
                placeholder="Bobot Total"
                className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">kg</span>
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

export default FormInputPanen;
