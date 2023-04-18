import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { Provider } from "react-redux";
import { store } from "../store/store";
import HomePage from "../pages";
import DetailProduct from "../pages/Detail-product";
import Page404 from "../pages/page404";
import Cart from "../pages/Cart";
import Header from "./Header";
import Initializer from "./Initializer";
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
              <Route path="/detail-product/:code" element={<DetailProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<Page404 />} />
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </Provider>
  );
};
export default MyApp;
