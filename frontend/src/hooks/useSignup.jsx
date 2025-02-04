import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import js from "@eslint/js";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signupFun = async (name, email, password) => {
    setIsLoading(true);

    const response = await fetch(`http://localhost:3000/api/auth/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setIsLoading(false);
      throw new Error("Error while signup: " + json.message);
    } else {
      console.log(typeof json.user);
      localStorage.setItem("user", JSON.stringify(json.user));
      dispatch({
        type: "LOGIN",
        payload: json.user,
      });

      setIsLoading(false);
    }
  };

  return { signupFun, isLoading, error };
};
