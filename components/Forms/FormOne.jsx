import React from 'react';

function DatasetItem({ label, value }) {
  return (
    <div className="mb-4.5">
      <label className="mb-3 block text-sm font-medium text-black dark:text-black">
        {label}
      </label>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-black dark:focus:border-primary"
      />
    </div>
  );
}

export default function FormLayout() {
  const dataset = {
    "Nama Kandang": "Kandang 1",
    "Kelembaban": "60%",
    "Suhu": "25°C",
    "Amonia": "0.5 ppm",
    "Pakan": "300 gram",
    "Minum": "500 ml",
    "Bobot": "5 kg",
    "Populasi": "100 ekor",
    "Luas Kandang": "10 m²",
  };

  return (
    <div>
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-black">
            Klasifikasi
            </h3>
        </div>
        <div className="p-6.5">
            {Object.entries(dataset).map(([label, value]) => (
                <DatasetItem key={label} label={label} value={value} />
            ))}
            </div>
    </div>
    
  );
}
