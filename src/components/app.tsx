import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { Provider } from "react-redux";
import { Store } from "../store/store";
import HomePage from "../pages";
import BottomNav from "./BottomNav";

const MyApp = () => {
  return (
    <Provider store={Store}>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<HomePage />} />
            </AnimationRoutes>
            <BottomNav />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </Provider>
  );
};
export default MyApp;
