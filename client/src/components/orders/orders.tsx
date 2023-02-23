const UserPastOrders = () => {
  const { data: orders, error } = useSWR('/api/orders', fetcher);
  if (error) return <div>Failed to load</div>;
  if (!orders) return <div>Loading...</div>;
  return (
    <div>
      <h1>Past Orders</h1>
      {orders.map((order) => (
        <div key={order.id}>
          <h3>{order.id}</h3>
          <p>{order.status}</p>
          <p>{order.total}</p>
        </div>
      ))}
    </div>
  );
};

export default UserPastOrders;