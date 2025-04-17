import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import HomePage from '../pages/HomePage/HomePage';
import DetailPage from '../pages/DetailPage/DetailPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import ListProductFlowType from '../pages/ListProductFlowType/ListProductFlowType';
import ManageAccount from '../pages/ManageAccount/ManageAccount';

const routes = [
    {
        component: LoginPage,
        path: '/login',
        layout: 'auth',
    },
    {
        component: RegisterPage,
        path: '/register',
        layout: 'auth',
    },
    {
        component: HomePage,
        path: '/',
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
    {
        component: ManageAccount,
        path: '/manage-account',
    },
];

export default routes;
