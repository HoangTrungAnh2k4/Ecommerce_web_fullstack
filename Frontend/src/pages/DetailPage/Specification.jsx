import { toast } from 'react-toastify';

function Specification() {
    return (
        <div className="rounded-lg border bg-white px-5 py-3 shadow">
            <h3 className="text-xl font-semibold">Thông số kĩ thuật</h3>
            <ul className="mt-6 h-[400px] overflow-hidden">
                {Array.from({ length: 10 }).map((_, index) => (
                    <li key={index} className="flex items-center px-4 py-5 odd:bg-blue-50 even:bg-gray-50">
                        <span className="block w-1/2 font-semibold">Coming soon</span>
                        <span className="block w-1/2 text-sm">......</span>
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex justify-center pb-3">
                <button
                    onClick={() => {
                        toast.warning('Coming soon!');
                    }}
                    className="btn mx-auto w-4/5 font-semibold"
                >
                    Xem đầy đủ thông tin kĩ thuật
                </button>
            </div>
        </div>
    );
}

export default Specification;
