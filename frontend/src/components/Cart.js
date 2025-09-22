import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Cart({ token }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ListGroup>
        {cart.map(item => (
          <ListGroup.Item key={item.id}>
            {item.name} - ₹{item.price} x {item.quantity}
            <Button variant="danger" className="ms-2" onClick={() => removeFromCart(item.id)}>Remove</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {cart.length > 0 && <Button className="mt-3" onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>}
    </div>
  );
}

export default Cart;