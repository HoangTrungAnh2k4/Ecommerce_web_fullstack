import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import HomePage from '../pages/HomePage/HomePage';
import DetailPage from '../pages/DetailPage/DetailPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import ListProductFlowType from '../pages/ListProductFlowType/ListProductFlowType';

const routes = [
    {
        component: HomePage,
        path: '/',
    },
    {
        component: LoginPage,
        path: '/login',
    },
    {
        component: RegisterPage,
        path: '/register',
    },
    {
        component: DetailPage,
        path: '/detail/:id',
    },
    {
        component: CheckoutPage,
        path: '/checkout',
    },
    {
        component: ListProductFlowType,
        path: '/list-product',
    },
];

export default routes;
