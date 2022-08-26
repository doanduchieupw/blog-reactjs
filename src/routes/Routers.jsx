import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicPath } from './path';

const Routers = () => {
    return (
        <Routes>
            {publicPath.map((route, index) => {
                const Page = route?.component || <></>;
                const Layout = route?.layout || Fragment;

                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                                <Layout>
                                    <Page />
                                </Layout>
                        }
                    />
                );
            })}
        </Routes>
    );
};

export default Routers;
