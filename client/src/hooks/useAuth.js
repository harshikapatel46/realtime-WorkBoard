import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);
}

export default useAuth;
