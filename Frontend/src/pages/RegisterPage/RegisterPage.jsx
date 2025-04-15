import { Link, useNavigate } from 'react-router-dom';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import zaloIcon from '../../assets/images/general/zalo-icon.png';

import { authRegisterAPI } from '../../api/authAPI';
import { toast } from 'react-toastify';

function RegisterPage() {
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const name = formData.get('userName');
        const phoneNumber = formData.get('phoneNumber');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (!name || !phoneNumber || !email || !password || !confirmPassword) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (phoneNumber.length < 10) {
            toast.error('Số điện thoại không hợp lệ!');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Mật khẩu không khớp!');
            return;
        }

        const data = {
            name,
            phoneNumber,
            email,
            password,
            confirmPassword,
            role: 'user',
        };

        try {
            const response = await authRegisterAPI(data);

            if (response.status === 200) {
                toast.success('Đăng ký thành công!');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (error) {
            console.log(error);

            if (error.status === 401) {
                toast.error('Số điện thoại đã tồn tại!');
            } else {
                toast.error('Đăng ký thất bại!');
            }
        }
    };

    return (
        <div className="justify-items-center">
            <div className="mt-12 w-[600px]">
                <h3 className="text-center text-xl font-semibold">Đăng ký với</h3>
                <div className="mt-10 flex justify-evenly">
                    <div className="flex items-center gap-2">
                        <FcGoogle className="size-[26px]" />
                        <p className="text-lg text-textColor2">Google</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaFacebook className="size-[26px] text-[#4267B2]" />
                        <p className="text-lg text-textColor2">Facebook</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={zaloIcon} alt="" className="size-[24px]" />
                        <p className="text-lg text-textColor2">Zalo</p>
                    </div>
                </div>
                {/* separate line */}
                <div className="mt-12 flex items-center px-12">
                    <div className="w-full border-b-2 border-[#dbdbdb]"></div>
                    <p className="mx-4 text-lg text-textColor2">Hoặc</p>
                    <div className="w-full border-b-2 border-[#dbdbdb]"></div>
                </div>

                {/* form input */}
                <form onSubmit={handleRegister} className="mt-8">
                    <div className="group relative z-0 mb-6 w-full">
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            className="peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 outline-none"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="userName"
                            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400"
                        >
                            Họ và tên
                        </label>
                    </div>
                    <div className="group relative z-0 mb-6 w-full">
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            className="peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 outline-none"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="phoneNumber"
                            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400"
                        >
                            Số điện thoại
                        </label>
                    </div>
                    <div className="group relative z-0 mb-6 w-full">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 outline-none"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="email"
                            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400"
                        >
                            Gmail
                        </label>
                    </div>
                    <div className="group relative z-0 mb-6 w-full">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 outline-none"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="password"
                            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400"
                        >
                            Mật khẩu
                        </label>
                    </div>
                    <div className="group relative z-0 w-full">
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 outline-none"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="confirmPassword"
                            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400"
                        >
                            Nhập lại mật khẩu
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-10 w-full rounded-md bg-primary py-3 text-lg font-semibold text-white"
                    >
                        Đăng ký
                    </button>
                </form>

                <div className="mt-8 flex items-center justify-center">
                    <p className="text-textColor2">Bạn đã có tài khoản?</p>
                    <Link to="/login" className="ml-2 font-semibold text-primary hover:underline">
                        Đăng nhập ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
