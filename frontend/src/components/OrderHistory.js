import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

function OrderHistory({ token }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h2>Your Orders</h2>
      <ListGroup>
        {orders.map(order => (
          <ListGroup.Item key={order.id}>
            Order #{order.id} - Status: {order.status} - Estimated Delivery: {order.estimatedDelivery}
            <p>Address: {order.deliveryAddress}, {order.city}, {order.state} {order.pincode}</p>
            <p>Products: {order.products.map(p => `${p.name} (₹${p.price} x ${p.quantity})`).join(', ')}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default OrderHistory;