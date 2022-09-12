import { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Modal from "./components/Modal/Modal";
import Navbar from "./components/Navbar/Navbar";
import { AuthContext } from "./providers/AuthProvider";
import routes from "./Routes/index";
import "./variable.scss";
import "./i18n"

function App() {
  const { showModal, handleShowModal } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <h1 style={{margin: "200px 200px 0 200px"}}>{t("title")}</h1> */}
        <Modal show={showModal} onClick={handleShowModal} />
        <Routes>
          {routes.map((route) => {
            let DefaultLayout = Fragment;
            const Content = route.content;
            if (route.layout) {
              DefaultLayout = route.layout;
            }

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Content />
                  </DefaultLayout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
