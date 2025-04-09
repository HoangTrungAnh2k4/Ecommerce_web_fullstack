import { IoSearch, IoCart } from 'react-icons/io5';

import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Space } from 'antd';

import logo from '../../assets/images/logo.webp';
import Cart from '../ui/Cart';
import { useContext } from 'react';
import { AuthContext } from '../hooks/authContext';

function HeaderPage() {
    const avatr =
        'https://danhgiaxe.edu.vn/upload/2024/12/bo-suu-tap-hinh-anh-gai-k8-dep-quyen-ru-khien-ban-say-dam-4.webp';

    const navigation = useNavigate();

    const { setAuth } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.clear('access_token');
        setAuth({
            isAuthenticated: false,
            user: { phoneNumber: '', userName: '' },
        });
        navigation('/login');
    };

    const items = [
        {
            label: (
                <Link to={''} className="">
                    Your profile
                </Link>
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <div onClick={handleLogout}>Đăng xuất</div>,
            key: '1',
        },
    ];

    return (
        <div className="relative z-50 flex items-center bg-background px-20 py-4">
            <Link to={'/'}>
                <img src={logo} alt="" />
            </Link>
            <div className="mx-auto flex w-[40%] rounded-md bg-white">
                <input
                    type="text"
                    placeholder="Search Something..."
                    className="w-full rounded-md border-none bg-white px-4 py-3 text-sm text-gray-600 focus:outline-none focus:ring-0"
                />
                <button type="button" className="m-1 flex items-center justify-center rounded-md bg-[#f9bb01] px-5">
                    <IoSearch className="text-2xl text-white" />
                </button>
            </div>

            <div className="flex items-center gap-6">
                <div className="group relative">
                    <div className="cursor-pointer px-8 py-1 text-primary transition-all">
                        <IoCart className="my-auto mt-[18px] text-3xl" />
                        <div className="relative -right-5 -top-9 flex size-[18px] items-center justify-center rounded-full bg-redColor text-[10px] font-semibold text-white">
                            20
                        </div>
                    </div>
                    <Cart />
                </div>
                <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
                    <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
                        <Space>
                            <img src={avatr} alt="" className="size-11 rounded-full object-cover object-center" />
                        </Space>
                    </a>
                </Dropdown>
                <Link to={'/login'}></Link>
            </div>
        </div>
    );
}

export default HeaderPage;
