export default function FormKlasifikasi(){
    return (
        <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-bromo-green-50 px-5 pb-5">
                <div className="border-b border-stroke px-6.5 py-4">
                    <h3 className="font-bold text-lg text-bromo-gray-900">
                        Klasifikasi
                    </h3>
                </div>
                <form action="#">
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-3 block text-sm font-medium text-bromo-gray-900">
                                    Suhu
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    value="Data Suhu"
                                    disabled
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-bromo-gray-900 outline-none transition"
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-3 block text-sm font-medium text-bromo-gray-900">
                                    Amonia
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    value="Data Amonia"
                                    disabled
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-bromo-gray-900 outline-none transition"
                                />
                            </div>
                        </div>
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-3 block text-sm font-medium text-bromo-gray-900">
                                    Pakan
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    value="Data Pakan"
                                    disabled
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-bromo-gray-900 outline-none transition"
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-3 block text-sm font-medium text-bromo-gray-900">
                                    Minum
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    value="Data Minum"
                                    disabled
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-bromo-gray-900 outline-none transition"
                                />
                            </div>
                        </div>
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-3 block text-sm font-medium text-bromo-gray-900">
                                    Bobot
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    value="Data Bobot"
                                    disabled
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-bromo-gray-900 outline-none transition"
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="mb-3 block text-sm font-medium text-bromo-gray-900">
                                    Populasi
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    value="Data Populasi"
                                    disabled
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-bromo-gray-900 outline-none transition"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
