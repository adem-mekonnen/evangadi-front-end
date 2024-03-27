import { createContext, useContext, useEffect, useReducer } from "react";

import Footer from "./components/footer/Footer.jsx";
import Header from "./components/header/Header.jsx";
import NotFound from "./components/page404/NotFound.jsx";
import Ask from "./pages/question/Ask.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";

import HomePage from "./pages/home/HomePage.jsx";
import PostAnswer from "./pages/answer/PostAnswer.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./pages/route/ProtectedRoute.jsx";
import ResetByNewPassword from "./pages/login/ResetByNewPassword.jsx";
import ResetPassword from "./pages/login/ResetPassword.jsx";
import { reducer } from "./context/reducer.js";
import Loading from "./components/page404/Loading.jsx";

import axios from "./components/api/axios.js";

const AppProvider = createContext();
export const useAppData = () => useContext(AppProvider);

function App() {
  //const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const initialState = {
    user: "",
    loading: false,
    alert: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const checkUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return; // If token doesn't exist, do nothing
    }

    try {
      const { data } = await axios.get("/user/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "SET_USER", payload: data.username });
    } catch (error) {
      console.error(error.message);
      localStorage.setItem("token", "");
      dispatch({ type: "LOGOUT" });
    }
  };

  useEffect(() => {
    if (!state.user) {
      checkUser();
    }
  }, [state.user]);

  return (
    <AppProvider.Provider value={{ state, dispatch }}>
      <Header />
      {state.loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <Ask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post-answer"
            element={
              <ProtectedRoute>
                <PostAnswer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/:id"
            element={
              <ProtectedRoute>
                <PostAnswer />
              </ProtectedRoute>
            }
          />
          {/* Allow unauthenticated requests to resetpassword */}
          <Route path="/resetpassword" element={<ResetPassword />} />
          {/* Allow unauthenticated requests to reset */}
          <Route path="/reset/:token" element={<ResetByNewPassword />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <Footer />
    </AppProvider.Provider>
  );
}

export default App;
