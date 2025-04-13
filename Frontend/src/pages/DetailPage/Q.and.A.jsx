import { TbSend } from 'react-icons/tb';
import { IoMdTime } from 'react-icons/io';
import { MdQuestionAnswer } from 'react-icons/md';

function QandA({ listRate }) {
    return (
        <div className="rounded-lg border bg-white p-4 shadow">
            <h3 className="text-lg font-semibold">Hỏi và đáp</h3>
            <div className="flex items-center gap-6">
                <textarea
                    className="mt-2 h-[100px] w-full resize-none rounded-lg border bg-[#f5f5f5] p-2 outline-none"
                    type="text"
                    placeholder="Xin mời để lại câu hỏi, chúng tôi sẽ trả lời ngay trong 1h, các câu hỏi ngoài 8h-22h chúng tôi sẽ trời lời vào sáng hôm sau"
                ></textarea>
                <button className="btn flex h-fit items-center gap-2 rounded-xl">
                    <TbSend className="text-2xl" />
                    <span>Gửi</span>
                </button>
            </div>

            {listRate &&
                listRate.length > 0 &&
                listRate.map((item) => (
                    <div className="mt-6" key={item.id}>
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{item.user_name}</p>
                            <div className="flex items-center gap-2 text-textColor2">
                                <IoMdTime className="mt-[2px]" />
                                <span className="text-xs font-semibold">{item.created_at}</span>
                            </div>
                        </div>
                        <div className="mt-2 rounded-lg border bg-[#f5f5f5] p-4">
                            <p>{item.comment}</p>
                            <button className="ml-auto mt-2 flex items-center gap-1 text-green-600">
                                <MdQuestionAnswer className="mt-[2px] text-xl" />
                                <span className="font-semibold">Trả lời</span>
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default QandA;
