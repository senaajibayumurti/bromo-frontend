import React from 'react';

export default function FormKlasifikasi() {
    return (
        <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
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
                                    placeholder="Data Suhu"
                                    className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
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
                                    placeholder="Data Kelembaban"
                                    disabled
                                    className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
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
                                    placeholder="Data Amonia"
                                    disabled
                                    className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
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
                                    placeholder="Data Pakan"
                                    disabled
                                    className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
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
                                    placeholder="Data Minum"
                                    disabled
                                    className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
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
                                    placeholder="Data Bobot"
                                    disabled
                                    className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-16 text-bromo-gray-900 outline-none transition"
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
                                    placeholder="Data Populasi"
                                    disabled
                                    className="w-full rounded border-[1.5px] ring-0 focus-within:ring-bromo-green-500 focus-within:ring-1 bg-transparent px-5 py-3 pr-10 text-bromo-gray-900 outline-none transition"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bromo-gray-900">ekor</span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
