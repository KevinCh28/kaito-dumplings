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

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    login(user)
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderErrors = () => {
    if (!Object.values(errors).every((val) => val === "")) {
      <div>
        <ul>
          {Object.values(errors).map((val, idx) => (
            <li key={idx}>{val}</li>
          ))}
        </ul>
      </div>
    } else {
      return null;
    }
  }

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
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
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