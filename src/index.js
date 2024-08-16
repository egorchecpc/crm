import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import ImportComponent from "./components/ImportComponent/ImportComponent";


const router = createBrowserRouter([
    {
        path: '/import',
        element: <HomeComponent />,
    },
    {
        path: '/',
        element: <ImportComponent />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);




