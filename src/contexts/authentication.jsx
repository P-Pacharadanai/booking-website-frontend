import { createContext, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider(props) {
  const navigate = useNavigate();

  const register = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
    } catch (error) {
      const errorStatus = error?.request?.status;
      const errorMessage = error?.response?.data?.message;

      if (errorStatus === 409) {
        throw new Error(errorMessage);
      } else if (errorStatus === 500) {
        throw new Error("An error occurred on the server.");
      } else {
        throw new Error("Sorry, please try again.");
      }
    }
  };

  const login = async (data) => {
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
      const token = result.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      const errorStatus = error?.request?.status;
      if (errorStatus === 400) {
        throw new Error("Invalid email or password.");
      } else {
        throw new Error("An error occurred on the server.");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getUser = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const userDataFromToken = jwtDecode(token);
      return userDataFromToken;
    }

    return null;
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const value = {
    register,
    login,
    logout,
    isAuthenticated,
    getUser,
  };
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

// this is a hook that consume AuthContext
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
