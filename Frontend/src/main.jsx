import { StrictMode, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import routes from './routes';
import PrimaryLayout from './components/layout/PrimaryLayout';

createRoot(document.getElementById('root')).render(
    <StrictMode>
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
        </BrowserRouter>
    </StrictMode>,
);
