import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./providers/AuthProvider";
import AppProvider from "./providers/AppProvider";
import {Provider} from "react-redux"
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <Provider store={store}>
        <AuthProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </AuthProvider>
     </Provider>
  </React.StrictMode>
);