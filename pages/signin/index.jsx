export default function SignIn(){
    return (
        <div class="flex h-screen">
            <div class="w-3/4 flex justify-center items-center bg-green-600">
                <img class="h-full w-full max-w-full object-cover" src="" alt="BroMo.png"/>
            </div>
            <div class="w-1/4 bg-gray-100 flex items-center justify-center px-5">
                <div class="w-full max-w-sm">
                    <div class="sm:mx-auto sm:w-full">
                        <div className="text-5xl font-bold">Sign In</div>
                        <div className="text-4xl font-medium">Join us today</div>
                    </div>
                    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-6" action="#" method="POST">
                            <div>
                                <button type="submit" class="flex w-full justify-center rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-black py-4 px-4">
                                    Daftar dengan Google
                                </button>
                            </div>
                            <div class="flex items-center justify-center">
                                <div class="flex-grow border-t border-gray-500"></div>
                                <div class="mx-4 font-semibold text-xs text-gray-500">Atau</div>
                                <div class="flex-grow border-t border-gray-500"></div>
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Nama</label>
                                <div class="mt-2">
                                    <input id="name" name="name" type="name" autocomplete="name" required class="flex w-full justify-center rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-black py-4 px-4"/>
                                </div>
                            </div>                            
                            <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                <div class="mt-2">
                                    <input id="email" name="email" type="email" autocomplete="email" required class="flex w-full justify-center rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-black py-4 px-4"/>
                                </div>
                            </div>
                            <div>
                                <label for="number" class="block text-sm font-medium leading-6 text-gray-900">No. Telepon</label>
                                <div class="mt-2">
                                    <input id="number" name="number" type="number" autocomplete="off" required class="flex w-full justify-center rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-black py-4 px-4"/>
                                </div>
                            </div>
                        </div>
                            <div>
                                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div class="mt-2">
                                    <input id="password" name="password" type="password" autocomplete="current-password" required class="flex w-full justify-center rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-black py-4 px-4"/>
                                </div>
                            </div>                            
                            <div>
                                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Konfirmasi Password</label>
                                <div class="mt-2">
                                    <input id="password" name="password" type="password" autocomplete="current-password" required class="flex w-full justify-center rounded-full bg-transparent border border-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-black py-4 px-4"/>
                                </div>
                            </div>

                            <div>
                                <button type="submit" class="flex w-full justify-center rounded-full bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-bold text-bromo-gray-50 py-4 px-4">
                                    Daftar
                                </button>
                            </div>
                        </form>
                        <p class="mt-10 text-center text-sm text-gray-500">
                            Sudah punya akun?
                            <a href="#" class="font-semibold text-green-600 hover:text-green-500 underline"> Masuk di sini.</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}