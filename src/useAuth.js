import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useVerify } from "./AuthProvider";
import { verify } from "./api";
const useAuth = () => {
  const navigate = useNavigate();
  const { is2FAVerified } = useVerify();
  const token = localStorage.getItem("token");
  const verifyToken = localStorage.getItem("verifyToken");

  useEffect(() => {
    const checkAuth = () => {
      if (!token || !isValidToken(token)) {
        navigate("/signin");
      } else if (!verifyToken || !isValidToken(verifyToken)) {
        navigate("/verify-2fa");
      }
    };

    checkAuth();
  }, [token, is2FAVerified, navigate, verifyToken]);

  const isValidToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    isValidToken,
  };
};

export default useAuth;
