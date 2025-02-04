import { useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignin } from "../hooks/useSignin";

const Signin = () => {
  const [useR, setUser] = useState({
    email: "",
    password: "",
  });
  const { signinFun, isLoading, error } = useSignin()
  const {user} = useAuthContext();

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();

    const { email, password } = useR;
    signinFun(email, password);
   


    console.log(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="signin">
      <h3>Sign in</h3>
      {error && <p>{error}</p>}
      <label>Email:</label>
      <input
        name="email"
        type="text"
        value={useR.email}
        placeholder="email"
        onChange={handleUser}
      />
      <label>Password:</label>
      <input
        name="password"
        type="text"
        value={useR.password}
        placeholder="password"
        onChange={handleUser}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Signin;
