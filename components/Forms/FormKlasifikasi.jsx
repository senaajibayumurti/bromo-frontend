import React, { useState, useEffect } from 'react';

const FormKlasifikasi = ({ idKandang }) => {
  const [data, setData] = useState({
    suhu: '',
    kelembaban: '',
    amonia: '',
    pakan: '',
    minum: '',
    bobot: '',
    populasi: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    suhu: false,
    kelembaban: false,
    amonia: false,
    pakan: false,
    minum: false,
    bobot: false,
    populasi: false,
  });

  useEffect(() => {
    if (!idKandang) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError({
          suhu: false,
          kelembaban: false,
          amonia: false,
          pakan: false,
          minum: false,
          bobot: false,
          populasi: false,
        });

        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        const [suhuResponse, amoniaResponse, kandangResponse] = await Promise.all([
          fetch(`https://toko.technosv.my.id/api/sensor-suhu-kelembaban/${idKandang}`, { headers }),
          fetch(`https://toko.technosv.my.id/api/sensor-amoniak/${idKandang}`, { headers }),
          fetch(`https://toko.technosv.my.id/api/data-kandang-by-kandang/${idKandang}`, { headers }),
        ]);

        const suhuData = await suhuResponse.json();
        const amoniaData = await amoniaResponse.json();
        const kandangData = await kandangResponse.json();

        const newData = {
          suhu: suhuData.data?.suhu || 'Tidak ada data yang bisa ditampilkan',
          kelembaban: suhuData.data?.kelembaban || 'Tidak ada data yang bisa ditampilkan',
          amonia: amoniaData.data.length > 0 ? amoniaData.data[0].amoniak : 'Tidak ada data yang bisa ditampilkan',
          pakan: kandangData.data?.pakan || 'Tidak ada data yang bisa ditampilkan',
          minum: kandangData.data?.minum || 'Tidak ada data yang bisa ditampilkan',
          bobot: kandangData.data?.bobot || 'Tidak ada data yang bisa ditampilkan',
          populasi: kandangData.data?.populasi || 'Tidak ada data yang bisa ditampilkan',
        };

        const newError = {
          suhu: !suhuData.data?.suhu,
          kelembaban: !suhuData.data?.kelembaban,
          amonia: amoniaData.data.length === 0,
          pakan: !kandangData.data?.pakan,
          minum: !kandangData.data?.minum,
          bobot: !kandangData.data?.bobot,
          populasi: !kandangData.data?.populasi,
        };

        setData(newData);
        setError(newError);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [idKandang]);

  if (loading) {
    return <p className="text-gray-500">Memuat...</p>;
  }

  const getInputClass = (field) => (error[field] ? 'text-bromo-error-500' : 'text-bromo-gray-900');

  return (
    <div className="flex flex-col gap-9">
      <form action="#">
        <div className="p-6.5">
          <div className="mb-4.5 grid grid-cols-3 gap-6">
            <div className="flex flex-col mb-4">
              <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
                Suhu
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.suhu}
                  placeholder="Data Suhu"
                  className={`w-full rounded border-[1.5px] ring-0 ${getInputClass('suhu')} focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 outline-none transition`}
                  readOnly
                />
                <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getInputClass('suhu')}`}>°C</span>
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
                Kelembaban
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.kelembaban}
                  placeholder="Data Kelembaban"
                  className={`w-full rounded border-[1.5px] ring-0 ${getInputClass('kelembaban')} focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 outline-none transition`}
                  readOnly
                />
                <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getInputClass('kelembaban')}`}>%</span>
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
                Amonia
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.amonia}
                  placeholder="Data Amonia"
                  className={`w-full rounded border-[1.5px] ring-0 ${getInputClass('amonia')} focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 outline-none transition`}
                  readOnly
                />
                <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getInputClass('amonia')}`}>ppm</span>
              </div>
            </div>
          </div>
          <div className="mb-4.5 grid grid-cols-3 gap-6">
            <div className="flex flex-col mb-4">
              <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
                Pakan
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.pakan}
                  placeholder="Data Pakan"
                  className={`w-full rounded border-[1.5px] ring-0 ${getInputClass('pakan')} focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 outline-none transition`}
                  readOnly
                />
                <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getInputClass('pakan')}`}>kg</span>
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
                Minum
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.minum}
                  placeholder="Data Minum"
                  className={`w-full rounded border-[1.5px] ring-0 ${getInputClass('minum')} focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 outline-none transition`}
                  readOnly
                />
                <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getInputClass('minum')}`}>liter</span>
              </div>
            </div>
          </div>
          <div className="mb-4.5 grid grid-cols-3 gap-6">
            <div className="flex flex-col mb-4">
              <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
                Bobot
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.bobot}
                  placeholder="Data Bobot"
                  className={`w-full rounded border-[1.5px] ring-0 ${getInputClass('bobot')} focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-16 outline-none transition`}
                  readOnly
                />
                <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getInputClass('bobot')}`}>gr/ekor</span>
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 block text-sm font-medium text-bromo-gray-900">
                Populasi
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.populasi}
                  placeholder="Data Populasi"
                  className={`w-full rounded border-[1.5px] ring-0 ${getInputClass('populasi')} focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 outline-none transition`}
                  readOnly
                />
                <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getInputClass('populasi')}`}>ekor</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormKlasifikasi;
