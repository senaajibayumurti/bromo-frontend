export default function Landingpage(){
    return (
        <div className="flex justify-center items-center h-screen w-auto bg-green-600">
        <div class="flex justify-center h-fit w-fit my-10 mx-auto">
            <Image src={"/logo.png"}
            width={100}
            height={100}
            layout='fit'/>
            <article class="text-wrap my-auto">
                <h1 className="text-4xl font-bold text-bromo-gray-50">BroMo</h1>
                <p className="text-lg font-bold text-bromo-gray-50">Broiler Monitoring</p>
            </article>
            </div>
        </div>
    );
}