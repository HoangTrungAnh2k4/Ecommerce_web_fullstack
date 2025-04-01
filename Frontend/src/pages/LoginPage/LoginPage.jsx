import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaEye } from 'react-icons/fa';

import { useEffect } from 'react';

import zaloIcon from '../../assets/images/general/zalo-icon.png';

function LoginPage() {
    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const userNumber = formData.get('username');
        const password = formData.get('password');

        console.log(userNumber, password);
    };

    useEffect(() => {}, []);

    return (
        <div className="login__page justify-items-center">
            <div className="mt-12 w-[600px]">
                <h3 className="text-center text-xl font-semibold">Đăng nhập với</h3>
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
                <form onSubmit={handleLogin} className="mt-8">
                    <div className="group relative z-0 mb-6 w-full">
                        <input
                            type="text"
                            name="username"
                            id="userNumber"
                            className="peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 outline-none"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="username"
                            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400"
                        >
                            Số điện thoại
                        </label>
                    </div>
                    <div className="group relative z-0 w-full">
                        <input
                            type="text"
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

                    <div className="mt-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" name="remember" id="remember" />
                            <label htmlFor="remember" className="text-sm text-textColor2">
                                Ghi nhớ đăng nhập
                            </label>
                        </div>
                        <Link to="" className="text-sm text-textColor2 hover:underline">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="mt-10 w-full rounded-md bg-primary py-3 text-lg font-semibold text-white"
                    >
                        Đăng nhập
                    </button>
                </form>

                <div className="mt-8 flex items-center justify-center">
                    <p className="text-textColor2">Bạn chưa có tài khoản?</p>
                    <Link to="/register" className="ml-2 font-semibold text-primary hover:underline">
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
