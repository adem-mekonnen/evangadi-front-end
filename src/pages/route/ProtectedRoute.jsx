import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppData } from "../../App";
import axios from "../../components/api/axios";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppData();
  const token = localStorage.getItem("token");

  const checkUser = async () => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.get("/user/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "SET_USER", payload: data.username });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to forgot password page when unauthorized
        navigate("/resetpassword");
      } else {
        console.error("Error checking user:", error);
        // Handle other errors as needed
      }
    }
  };

  useEffect(() => {
    if (!state.user) {
      checkUser();
    }
  }, [state.user]);

  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
