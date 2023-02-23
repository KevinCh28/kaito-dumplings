import { useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const AccountPage: NextPage = () => {
  const [firstname, setFirstName] = useState(user.firstname);
  const [lastname, setLastName] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, lastname, email, password, password2 }),
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
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
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
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;