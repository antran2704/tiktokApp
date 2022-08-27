import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import routes from "./components/Routers";
import "./variable.scss";

import { auth } from "./firebase/firebaseConfig";
import { getListVideo } from "./redux/actions";
import Modal from "./components/Modal/Modal";
import { useContext } from "react";
import { AuthContext } from "./components/Provider/AuthProvider";

function App() {
  const {showModal,handleShowModal,setShowModal} = useContext(AuthContext)
  useEffect(() => {
    auth.signOut();
  }, []);

  return (
    <Router>
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
