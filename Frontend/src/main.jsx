import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';

import './index.css';
import routes from './routes';
import PrimaryLayout from './components/layout/PrimaryLayout';
import AuthLayout from './components/layout/AuthLayout';
import { ListItemBuyWrapper } from './components/hooks/listItemBuyContext';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                components: {
                    Rate: {
                        starBg: 'rgba(183, 196, 207, 0.8)',
                    },
                },
            }}
        >
            <ListItemBuyWrapper>
                <BrowserRouter>
                    <Routes>
                        {routes.map((route, index) => {
                            const Page = route.component;

                            if (route.layout === 'auth') {
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <AuthLayout>
                                                <Page />
                                            </AuthLayout>
                                        }
                                    />
                                );
                            }

                            // Default layout
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <PrimaryLayout>
                                            <Page />
                                        </PrimaryLayout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                    <ToastContainer autoClose={3000} />
                </BrowserRouter>
            </ListItemBuyWrapper>
        </ConfigProvider>
    </StrictMode>,
);
