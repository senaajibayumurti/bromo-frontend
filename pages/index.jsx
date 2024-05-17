import Topbar from '../components/Topbar_landingpage';
import Circle from '../components/Temp_circle';
import Icon from '../components/Icon_arrow-right-end-on-rectangle';

export default function Home() {
  return (
    <div className="h-screen w-auto ">
        <div className="flex flex-col w-3/4 h-screen mx-auto">
            <div className="h-min w-full my-4">
                <Topbar/>
            </div>
            <div className="flex w-full h-screen items-center justify-center">
              <div class="grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-center">
                  <article class="text-wrap">
                    <h1 className="text-4xl font-bold mb-4 text-green-600">Solusi Terbaik untuk Memantau Kandang Ayam Anda!</h1>
                    <p className="text-bromo-gray-500">Broiler Monitoring, aplikasi yang dirancang untuk meningkatkan efektifitas pemantauan kandang ayam secara efektif dan efisen secara real-time.</p>
                  </article>  
                  <div className='mt-8'>
                    <button type="button" class="inline-flex items-center text-bromo-gray-50 bg-gradient-to-r from-yellow-300 to-green-500 hover:bg-gradient-to-br active:bg-gradient-to-l font-medium rounded-full text-md px-8 py-4 text-center mr-2 mb-2">
                      <Icon/>
                      <span>Masuk</span>
                    </button>
                  </div>
                </div>
                <div class="mx-auto">
                  <Circle/>
                </div>
              </div>                            
            </div>
        </div>
    </div>
  );
}
