import { useState, SyntheticEvent } from "react";
import Link from 'next/link';
import { register } from "../../utils/sessionApiUtils";
import { createCart } from "../../utils/cartApiUtils";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
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

  const handleChange = (e: { target: { name: string; value: string; } } ) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrors(emptyInfo);
    register(user)
      .then((res) => {
        if (res.data.success === true) {
          createCart(res.data.userId);
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err)
        const newErrors = err.response.data.err.errors;
        Object.keys(newErrors).forEach(function (key: string) {
          setErrors((prevState) => ({
            ...prevState,
            [key]: newErrors[key],
          }));
        });
      }
    )
  };

  const handleFirstNameError = () => {
    if (errors.email !== "") {
      return <div>{errors.email}</div>;
    } else {
      return null;
    }
  };

  const handleLastNameError = () => {
    if (errors.email !== "") {
      return <div>{errors.email}</div>;
    } else {
      return null;
    }
  };

  const handleEmailError = () => {
    if (errors.email !== "") {
      return <div>{errors.email}</div>;
    } else {
      return null;
    }
  };

  const handlePasswordError = () => {
    if (errors.email !== "") {
      return <div>{errors.email}</div>;
    } else {
      return null;
    }
  };

  const handlePassword2Error = () => {
    if (errors.email !== "") {
      return <div>{errors.email}</div>;
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
            {handleFirstNameError()}
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={user.lastname}
              onChange={handleChange}
            />
            {handleLastNameError()}
          </div>
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
          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={user.password2}
              onChange={handleChange}
            />
            {handlePassword2Error()}
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