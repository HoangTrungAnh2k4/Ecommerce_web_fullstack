import { FaStar } from 'react-icons/fa';

import QandA from './Q.and.A';
import { Rate } from 'antd';
import { useEffect, useState } from 'react';
import { getUserInforAPI, postRateAPI } from '../../api/userAPI';
import { toast } from 'react-toastify';

function Evaluation({ equipmenId, listRate }) {
    const [userInfor, setUserInfor] = useState({});
    const [rate, setRate] = useState(0);

    const hanldeEvaluetion = async () => {
        try {
            await postRateAPI({
                value: rate,
                userId: userInfor.id,
                equipment_id: equipmenId,
                rate: rate,
                comment: 'Chưa có bình luận',
            });

            toast.success('Đánh giá thành công');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getUserInfor = async () => {
            try {
                const response = await getUserInforAPI();
                setUserInfor({
                    id: response.data.userInfor.id,
                    name: response.data.userInfor.name,
                });
            } catch (error) {
                console.log(error);
            }
        };
        getUserInfor();
    }, []);

    return (
        <div>
            <div className="mb-6 rounded-lg border bg-white px-5 py-3 shadow">
                <p className="text-lg font-semibold text-black">Bình luận và đánh giá</p>
                <div className="mt-4 flex rounded-lg border">
                    <div className="flex w-2/5 flex-col items-center justify-center space-y-2 border-r">
                        <span className="text-3xl font-semibold">0/5</span>
                        <span className="flex gap-1">
                            <Rate
                                onChange={(value) => {
                                    setRate(value);
                                }}
                            />
                        </span>
                        <p className="">0 đánh giá và nhận xét</p>
                    </div>
                    <ul className="w-3/5 space-y-2 px-4 py-3">
                        <li className="flex items-center justify-between gap-2">
                            <span>5</span>
                            <FaStar className="text-2xl text-yellow-400" />
                            <div className="mx-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                <div className="h-2.5 rounded-full bg-blue-600" style={{ width: '45%' }}></div>
                            </div>
                            <p className="flex-shrink-0 text-sm">0 đánh giá</p>
                        </li>
                        <li className="flex items-center justify-between gap-2">
                            <span>4</span>
                            <FaStar className="text-2xl text-yellow-400" />
                            <div className="mx-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                <div className="h-2.5 rounded-full bg-blue-600" style={{ width: '45%' }}></div>
                            </div>
                            <p className="flex-shrink-0 text-sm">0 đánh giá</p>
                        </li>
                        <li className="flex items-center justify-between gap-2">
                            <span>3</span>
                            <FaStar className="text-2xl text-yellow-400" />
                            <div className="mx-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                <div className="h-2.5 rounded-full bg-blue-600" style={{ width: '45%' }}></div>
                            </div>
                            <p className="flex-shrink-0 text-sm">0 đánh giá</p>
                        </li>
                        <li className="flex items-center justify-between gap-2">
                            <span>2</span>
                            <FaStar className="text-2xl text-yellow-400" />
                            <div className="mx-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                <div className="h-2.5 rounded-full bg-blue-600" style={{ width: '45%' }}></div>
                            </div>
                            <p className="flex-shrink-0 text-sm">0 đánh giá</p>
                        </li>
                        <li className="flex items-center justify-between gap-2">
                            <span>1</span>
                            <FaStar className="text-2xl text-yellow-400" />
                            <div className="mx-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                <div className="h-2.5 rounded-full bg-blue-600" style={{ width: '45%' }}></div>
                            </div>
                            <p className="flex-shrink-0 text-sm">0 đánh giá</p>
                        </li>
                    </ul>
                </div>

                <div className="my-6 justify-items-center">
                    <p className="mb-4 font-semibold">Bạn đánh giá sao về sản phầm này</p>
                    <button onClick={hanldeEvaluetion} className="btn rounded-full">
                        Đánh giá ngay
                    </button>
                </div>
            </div>

            <QandA listRate={listRate} />
        </div>
    );
}

export default Evaluation;
