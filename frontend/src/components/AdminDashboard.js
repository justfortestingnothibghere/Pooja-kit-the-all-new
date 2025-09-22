import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

function AdminDashboard({ token }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', imageUrl: '' });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProducts(res.data));
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/all`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data));
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts([...products, formData]);
      setFormData({ name: '', description: '', price: '', imageUrl: '' });
    } catch (error) {
      alert('Error adding product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      alert('Error deleting product');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    } catch (error) {
      alert('Error updating status');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Add Product</h3>
      <Form onSubmit={handleAddProduct}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" className="mt-3">Add Product</Button>
      </Form>
      <h3 className="mt-5">Products</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3 className="mt-5">Orders</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>
                <Button onClick={() => handleUpdateStatus(order.id, 'Shipped')}>Mark Shipped</Button>
                <Button onClick={() => handleUpdateStatus(order.id, 'Delivered')} className="ms-2">Mark Delivered</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminDashboard;