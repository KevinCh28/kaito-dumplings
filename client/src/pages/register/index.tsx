import { useState, useEffect } from "react";
import Link from 'next/link';
import { register } from "../../utils/sessionApiUtils";

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    role: "Customer",
  });
  
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  const emptyInfo = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
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
    register(user)
      .then((res) => {
        if (res.statusText === "OK") {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        const newErrors = err.response.data.err.errors;
        Object.keys(newErrors).forEach(function (key: any, value: any) {
          setErrors((prevState) => ({
            ...prevState,
            [key]: newErrors[key],
          }));
        });
      }
    )
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              value={user.firstname}
              onChange={handleChange}
            />
            {handleErrors("firstname")}
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={user.lastname}
              onChange={handleChange}
            />
            {handleErrors("lastname")}
          </div>
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
          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={user.password2}
              onChange={handleChange}
            />
            {handleErrors("password2")}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <div>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;