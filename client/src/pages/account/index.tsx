import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { getCurrentUser } from '@/src/utils/sessionApiUtils';
import { logout } from '@/src/utils/sessionApiUtils';

const AccountPage: NextPage = ({ user }) => {
  if (user === null) window.location.href = '/';

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const handleModal = async () => {
    {showModal && (
      <div style={{backgroundColor: '#fff', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px'}}>
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password2"
              value={password2}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            <button type="submit">Submit</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    )}
  };

  const orderHistory = (user) => {
    if (user.orders.length === 0) {
      return (
      <div>
        <p>You have no orders associated with this email address ({user.email}).</p>
        <p>If you believe this is incorrect, please try another email address or contact our support team for further help.</p>
      </div>
    )};

    return (
      <div>
        {user.orders.map((order: any) => (
          <div key={order._id}>
            <p>{order.date}</p>
            <p>{order.orderNumber}</p>
            <p>{order.total}</p>
            <p>{order.products.length}</p>
          </div>
        ))}
      </div>
    )
  };

  return (
    <div>
      <div>
        <div>
          YOUR ORDERS
        </div>
        {orderHistory(user)}
      </div>

      <div>
        <div>
          <button onClick={openModal}>Update Password</button>
          {handleModal()}
        </div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
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