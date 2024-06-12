import React, { useState, useEffect } from 'react';

const FormKlasifikasi = () => {
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        // Get user ID from localStorage
        const id = localStorage.getItem('userId');
        if (!id) {
          throw new Error('User ID is not available');
        }

        console.log('Token:', token);
        console.log('UserID:', id);

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        // Fetch data for suhu, kelembaban, amonia, and other relevant data
        const [suhuResponse, amoniaResponse, kandangResponse] = await Promise.all([
          fetch(`http://toko.technosv.my.id/api/sensor-suhu-kelembaban/${id}`, { headers }),
          fetch(`http://toko.technosv.my.id/api/sensor-amoniak/${id}`, { headers }),
          fetch(`http://toko.technosv.my.id/api/data-kandang-by-kandang/${id}`, { headers }),
        ]);

        // Check if all responses are OK
        if (!suhuResponse.ok || !amoniaResponse.ok || !kandangResponse.ok) {
          throw new Error('Error fetching data');
        }

        // Parse JSON responses
        const suhuData = await suhuResponse.json();
        const amoniaData = await amoniaResponse.json();
        const kandangData = await kandangResponse.json();

        // Set state with fetched data
        setData({
          suhu: suhuData.data.suhu || '',
          kelembaban: suhuData.data.kelembaban || '',
          amonia: amoniaData.data.length > 0 ? amoniaData.data[0].amoniak : '',
          pakan: kandangData.data.pakan || '',
          minum: kandangData.data.minum || '',
          bobot: kandangData.data.bobot || '',
          populasi: kandangData.data.populasi || '',
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
                  className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
                  readOnly
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">°C</span>
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
                  className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
                  readOnly
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">%</span>
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
                  className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
                  readOnly
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">ppm</span>
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
                  className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
                  readOnly
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">kg</span>
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
                  className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
                  readOnly
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">liter</span>
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
                  className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-16 text-bromo-gray-900 outline-none transition"
                  readOnly
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">gr/ekor</span>
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
                  className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
                  readOnly
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">ekor</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormKlasifikasi;
