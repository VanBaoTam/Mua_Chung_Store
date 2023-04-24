import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { Provider } from "react-redux";
import { store } from "../store/store";
import HomePage from "../pages";
import DetailProduct from "../pages/Detail-product";
import Page404 from "../pages/page404";
import Cart from "../pages/Cart";
import Header from "./Header";
import Initializer from "./Initializer";
import User from "../pages/User/User";
import BottomNavigationPage from "./BottomNavbar";
import UserOrders from "../pages/User/Orders";

const MyApp = () => {
  return (
    <Provider store={store}>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <Header />
            <Initializer type="Products" />
            <AnimationRoutes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user" element={<User />} />
              <Route path="/orders" element={<UserOrders />} />
              <Route path="/detail-product/:code" element={<DetailProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<Page404 />} />
            </AnimationRoutes>
            <BottomNavigationPage />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </Provider>
  );
};
export default MyApp;
