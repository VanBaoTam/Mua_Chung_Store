import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { Provider } from "react-redux";
import { store } from "../store/store";
import HomePage from "../pages";
import BottomNav from "./BottomNav";
import DetailProduct from "../pages/Detail-product";
import Page404 from "../pages/page404";
import User from "../pages/User";
import Discovery from "../pages/Discovery";
import Cart from "../pages/Cart";
import Header from "./Header";

const MyApp = () => {
  return (
    <Provider store={store}>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <Header />
            <AnimationRoutes>
              <Route path="/" element={<HomePage />} />
              <Route path="/detail-product/:id" element={<DetailProduct />} />
              <Route path="/user" element={<User />} />
              <Route path="/discovery" element={<Discovery />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<Page404 />} />
            </AnimationRoutes>
            <BottomNav />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </Provider>
  );
};
export default MyApp;
