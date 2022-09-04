import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import routes from "./Routes/index";
import "./variable.scss";
import "./i18n"
import { useTranslation } from 'react-i18next';
import { useContext } from "react";
import Modal from "./components/Modal/Modal";
import { AuthContext } from "./providers/AuthProvider";

function App() {
  const {showModal,handleShowModal} = useContext(AuthContext)
  const { t, i18n } = useTranslation();
  return (
    <Router>
      {/* <h1 style={{marginTop: "200px"}}>{t('Welcome to React')}</h1>
      <button onClick={() => {}}>franch</button> */}
      <div className="App">
        <Navbar />
        <Modal show={showModal} onClick={handleShowModal}/>
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
