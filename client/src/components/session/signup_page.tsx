import { useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const LoginPage: NextPage = () => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password, password2 }),
    });
    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    }
    if (res.ok) {
      router.push('/');
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> 
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      
      <button onClick={() => router.push('/login')}>Log In</button>
    </div>
  );
};

export default LoginPage;