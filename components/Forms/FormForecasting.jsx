import React, { useState } from 'react';
import Button from '../../components/Button'; // Adjust the import path as necessary

const FormForecasting = ({ idKandang }) => {
  // State to store the date, time, and prediction
  const [tanggal, setTanggal] = useState('');
  const [waktu, setWaktu] = useState('');
  const [prediksi, setPrediksi] = useState('');

  // This function updates the date and time to the current moment
  const handleForecastClick = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID'); // Format date as per Indonesian locale
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setTanggal(dateStr);
    setWaktu(timeStr);
    console.log("Forecasting data...");
  };

  return (
    <div className="flex flex-col gap-9">
      <form action="#">
        <div className="p-6.5">
          <div className="flex flex-col mb-4">
            <div className="flex gap-4 mb-4.5">
              {/* Tanggal Input Field */}
              <div className="flex flex-col flex-1">
                <label className="mb-1 block text-sm font-medium text-bromo-neutral-900">
                  Tanggal
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={tanggal}
                    placeholder="Tanggal"
                    className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 text-bromo-neutral-900 outline-none transition"
                    readOnly
                  />
                </div>
              </div>
              {/* Waktu Input Field */}
              <div className="flex flex-col flex-1">
                <label className="mb-1 block text-sm font-medium text-bromo-neutral-900">
                  Waktu
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={waktu}
                    placeholder="Waktu"
                    className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 text-bromo-neutral-900 outline-none transition"
                    readOnly
                  />
                </div>
              </div>
            </div>
            {/* Prediksi Ayam Mati Input Field */}
            <div className="flex flex-col mb-4">
              <label className="mb-1 block text-sm font-medium text-bromo-neutral-900">
                Prediksi ayam mati
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={prediksi}
                  onChange={(e) => setPrediksi(e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent px-5 py-3 text-bromo-neutral-900 outline-none text-2xl font-medium"
                  disabled
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-neutral-900 text-2xl font-medium">ekor</span>
              </div>
            </div>
          </div>
          {/* Button to trigger the update of date and time */}
          <Button id="btnForecast" label="Forecast Sekarang" onClick={handleForecastClick} type="success" />
        </div>
      </form>
    </div>
  );
};

export default FormForecasting;
