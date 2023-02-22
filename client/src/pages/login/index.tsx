import { useState, useEffect } from "react";
import Link from 'next/link';
import { login } from "../../utils/sessionApiUtils";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const emptyInfo = {
    email: "",
    password: "",
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setErrors(emptyInfo);
    login(user)
      .then((res) => {
        if (res.data.success === true) {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err.response.data)
        const newErrors = err.response.data.err.errors;
        Object.keys(newErrors).forEach(function (key: any) {
          setErrors((prevState) => ({
            ...prevState,
            [key]: newErrors[key],
          }));
        });
      });
  };

  const handleErrors = (key: any) => {
    if (errors[key] !== "") {
      return <div>{errors[key]}</div>;
    } else {
      return null;
    }
  };

  return (
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            {handleErrors("email")}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            {handleErrors("password")}
          </div>
          <button type="submit">Login</button>
        </form>
        <div>
          <Link href="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;