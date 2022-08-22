import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./components/Provider/AuthProvider";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppProvider from "./components/Provider/AppProvider";

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
