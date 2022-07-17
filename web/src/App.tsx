import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import Lists from "./pages/Lists";
import store from "@todo/state/store";
import setAuthToken from "@todo/state/util/setAuthToken";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { loadUser } from "@todo/state/actions/auth";
import { LOGOUT } from "@todo/state/actions/types";

const App = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    store.dispatch(loadUser());
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/list/:id" element={<Todos />} />
          <Route path="/lists" element={<Lists />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
