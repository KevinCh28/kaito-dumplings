import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { getCurrentUser } from '@/src/utils/sessionApiUtils';

const AccountPage: NextPage = ({ user }) => {
  if (user === null) window.location.href = '/';

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name</label>
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

export async function getServerSideProps() {
  const session = await getCurrentUser();

  if (session) {
    return {
      props: { user: session.user },
    };
  } 

  return { props: { user: null } };
};