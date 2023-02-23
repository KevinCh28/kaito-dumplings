import { useState, useEffect, SyntheticEvent } from "react";
import Link from 'next/link';
import { register } from "../../utils/sessionApiUtils";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setUser({
      firstname,
      lastname,
      email,
      password,
      password2,
      role: "Customer",
    });
    setErrors(emptyInfo);
    register(user)
      .then((res) => {
        if (res.data.success === true) {
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
              onChange={e => setFirstname(e.target.value)}
            />
            {handleErrors("firstname")}
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={user.lastname}
              onChange={e => setLastname(e.target.value)}
            />
            {handleErrors("lastname")}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={e => setEmail(e.target.value)}
            />
            {handleErrors("email")}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={e => setPassword(e.target.value)}
            />
            {handleErrors("password")}
          </div>
          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={user.password2}
              onChange={e => setPassword2(e.target.value)}
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