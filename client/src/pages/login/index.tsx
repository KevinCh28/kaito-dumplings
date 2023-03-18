import { useState, useEffect } from "react";
import Link from 'next/link';

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

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setErrors(emptyInfo);

    (async () => {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        })
      });
      const data = await response.json();
      console.log(data);
    })();
  };


  //   login(user)
  //     .then((res) => {
  //       if (res.data.success === true) {
  //         window.location.href = "/";
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data)
  //       const newErrors = err.response.data.err.errors;
  //       Object.keys(newErrors).forEach(function (key: string) {
  //         setErrors((prevState) => ({
  //           ...prevState,
  //           [key]: newErrors[key],
  //         }));
  //       });
  //     });

  const handleEmailError = () => {
    if (errors.email !== "") {
      return <div>{errors.email}</div>;
    } else {
      return null;
    }
  };

  const handlePasswordError = () => {
    if (errors.password !== "") {
      return <div>{errors.password}</div>;
    } else {
      return null;
    }
  };

  return (
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
          {handleEmailError()}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          {handlePasswordError()}
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;