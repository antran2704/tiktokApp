import { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Modal from "./components/Modal/Modal";
import Navbar from "./components/Navbar/Navbar";
import "./i18n";
import User from "./Pages/User/User";
import { AppContext } from "./providers/AppProvider";
import { AuthContext } from "./providers/AuthProvider";
import routes from "./Routes/index";
import "./variable.scss";

function App() {
  const { showModal, handleShowModal } = useContext(AuthContext);
  const { allUser } = useContext(AppContext);
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
          {allUser.map((user) => (
            <Route
              key={user.uid}
              path={`/user/${user.uid}`}
              element={
                <>
                  <User />
                </>
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
