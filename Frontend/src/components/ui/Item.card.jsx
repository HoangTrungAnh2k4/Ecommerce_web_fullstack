import { useNavigate } from 'react-router-dom';

import { deleteProductAPI } from '../../api/adminAPI';

import bestSale from '../../assets/images/general/best-sale.png';
import pc from '../../../public/pc2.jpg';
import { toast } from 'react-toastify';

function ItemCard({ item }) {
    const navigate = useNavigate();

    const handleDeleteProduct = async () => {
        try {
            await deleteProductAPI(item.id);
            window.location.reload();
            toast.success('Xóa sản phẩm thành công!');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div
            id={item.id}
            className="card flex w-56 cursor-pointer select-none flex-col rounded-md border bg-white p-2 px-3 shadow-md"
        >
            <img
                src={pc}
                alt={item.name}
                draggable="false"
                onClick={() => navigate(`/detail/${item.id}`)}
                className="transition-all hover:-translate-y-2"
            />

            <div className="my-2 h-[25px]">
                {item.best_seller && <img src={bestSale} alt="" className="w-[70px]" />}
            </div>
            <div className="flex flex-grow flex-col">
                <h2 onClick={() => navigate('/detail')} className="line-clamp-3 h-[72px] hover:text-blue-600">
                    {item?.name}
                </h2>

                <div className="mt-auto flex items-center gap-4">
                    <p className="text-sm text-textColor2 line-through">{item?.oldPrice?.toLocaleString('vi-VN')}</p>
                    <div className="rounded-lg bg-redColor px-2 py-[2px] text-sm text-white">
                        {item?.discount || 0}%
                    </div>
                </div>

                <div className="mt-2 text-xl font-semibold text-redColor">
                    {item?.newPrice?.toLocaleString('vi-VN')}
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
                <p className="font-semibold text-textColor1">Đã bán:</p>
                <span className="">{item?.sold_quantity}</span>
                <button onClick={handleDeleteProduct} className="btn ml-auto">
                    Xóa
                </button>
            </div>
        </div>
    );
}

export default ItemCard;
