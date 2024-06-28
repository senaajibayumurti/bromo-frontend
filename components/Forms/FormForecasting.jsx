import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';

const FormForecasting = ({ idKandang }) => {
  const [tanggal, setTanggal] = useState('');
  const [waktu, setWaktu] = useState('');
  const [prediksi, setPrediksi] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [suhu, setSuhu] = useState('-');
  const [kelembaban, setKelembaban] = useState('-');
  const [amoniak, setAmoniak] = useState('-');

  useEffect(() => {
    if (!idKandang) {
      console.error('idKandang is undefined or null');
      setSuhu('-');
      setKelembaban('-');
      setAmoniak('-');
      setIsLoading(false);
      return;
    }

    setTanggal('');
    setWaktu('');
    setPrediksi('');
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const responseSuhuKelembaban = await fetch(`http://127.0.0.1:8080/api/sensor-suhu-kelembaban/${idKandang}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const responseAmonia = await fetch(`http://127.0.0.1:8080/api/sensor-amoniak/${idKandang}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!responseSuhuKelembaban.ok || !responseAmonia.ok) {
          throw new Error('Failed to fetch sensor data');
        }

        const dataSuhuKelembaban = await responseSuhuKelembaban.json();
        const dataAmonia = await responseAmonia.json();

        setSuhu(dataSuhuKelembaban.data ? dataSuhuKelembaban.data.suhu : '-');
        setKelembaban(dataSuhuKelembaban.data ? dataSuhuKelembaban.data.kelembaban : '-');
        setAmoniak(dataAmonia.data.length > 0 ? dataAmonia.data[0].amoniak : '-');
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
        setSuhu('-');
        setKelembaban('-');
        setAmoniak('-');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idKandang]);

  const handleForecastClick = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID');
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setTanggal(dateStr);
    setWaktu(timeStr);

    let prediksiValue = 0;

    if (kelembaban !== '-' && kelembaban > 60) {
      prediksiValue += 2 + ((kelembaban - 60) / 5);
    }
    if (suhu !== '-' && suhu > 35) {
      prediksiValue += 2 + ((suhu - 35) / 5);
    }
    if (amoniak !== '-' && amoniak > 35) {
      prediksiValue += 2 + ((amoniak - 35) / 5);
    }

    setPrediksi(prediksiValue.toFixed(0).toString());
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
                  placeholder="0"
                  className="w-full bg-transparent px-5 py-3 text-bromo-neutral-900 outline-none text-2xl font-medium"
                  readOnly
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-neutral-900 text-2xl font-medium">ekor</span>
              </div>
            </div>
          </div>
          {/* Button to trigger the update of date, time, and prediction */}
          <Button id="btnForecast" label="Forecast Sekarang" onClick={handleForecastClick} type="success" />
        </div>
      </form>
    </div>
  );
};

export default FormForecasting;
