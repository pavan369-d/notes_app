import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signinFun = async (email, password) => {
    setIsLoading(true);

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setIsLoading(false);
    } else {
      localStorage.setItem("user", JSON.stringify(json.user));
      dispatch({
        type: "LOGIN",
        payload: json.user,
      });
    }
  };

  return { signinFun, isLoading, error };
};
