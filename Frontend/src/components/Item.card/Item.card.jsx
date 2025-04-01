import { useNavigate } from 'react-router-dom';

import bestSale from '../../assets/images/general/best-sale.png';

function ItemCard({ item }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate('/detail')}
            className="card w-56 cursor-pointer select-none rounded-md border bg-white p-2 px-3 shadow-md"
        >
            <img src={item.image} alt={item.name} draggable="false" className="transition-all hover:-translate-y-2" />

            {item.bestSale && <img src={bestSale} alt="" className="w-[70px]" />}
            <div className="card-body mt-2">
                <h2 className="line-clamp-3 hover:text-blue-600">{item.name}</h2>

                <div className="mt-4 flex items-center gap-4">
                    <p className="text-sm text-textColor2 line-through">{item.oldPrice}</p>
                    <div className="rounded-lg bg-redColor px-2 py-[2px] text-sm text-white">{item.discount}</div>
                </div>

                <div className="mt-2 text-xl font-semibold text-redColor">{item.newPrice}</div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm">
                <p className="font-semibold text-textColor1">Đã bán:</p>
                <span className="">{item.countSold}</span>
            </div>
        </div>
    );
}

export default ItemCard;
