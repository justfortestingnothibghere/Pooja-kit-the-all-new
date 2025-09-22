import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout({ token }) {
  const [formData, setFormData] = useState({ deliveryAddress: '', city: '', state: '', pincode: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        { ...formData, products: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem('cart');
      navigate('/orders');
    } catch (error) {
      console.error(error);
      alert('Error placing order');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Delivery Address</Form.Label>
        <Form.Control type="text" name="deliveryAddress" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control type="text" name="city" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>State</Form.Label>
        <Form.Control type="text" name="state" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Pincode</Form.Label>
        <Form.Control type="text" name="pincode" onChange={handleChange} required />
      </Form.Group>
      <Button type="submit" className="mt-3">Place Order</Button>
    </Form>
  );
}

export default Checkout;