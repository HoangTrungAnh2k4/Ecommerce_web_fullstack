import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ConfigProvider } from 'antd';

import './index.css';
import routes from './routes';
import PrimaryLayout from './components/layout/PrimaryLayout';
import { ListItemBuyWrapper } from './components/hooks/listItemBuyContext';
import { ToastContainer } from 'react-toastify';

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
