import { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Modal from "./components/Modal/Modal";
import Navbar from "./components/Navbar/Navbar";
import "./i18n";
import { AuthContext } from "./providers/AuthProvider";
import routes from "./Routes/index";
import "./variable.scss";

function App() {
  const { showModal, handleShowModal } = useContext(AuthContext);
  return (
    <Router>
      <div className="App">
        <Navbar />
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
