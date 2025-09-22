import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from '@formspree/react';
import axios from 'axios';

function Contact({ setAuth, isLogin }) {
  const [formspreeState, formspreeHandleSubmit] = useForm('mzzvoalo');
  const [authData, setAuthData] = useState({ email: '', password: '' });
  const [contactData, setContactData] = useState({ email: '', message: '' });

  const handleAuthChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/${isLogin ? 'login' : 'signup'}`, authData);
      if (isLogin) {
        setAuth(res.data.token, res.data.role);
        window.location.href = '/';
      } else {
        alert('Signup successful! Please login.');
        window.location.href = '/login';
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Error');
    }
  };

  if (!isLogin && !setAuth) {
    return (
      <Form onSubmit={formspreeHandleSubmit}>
        <h2>Contact Us</h2>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleContactChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" name="message" onChange={handleContactChange} required />
        </Form.Group>
        <Button type="submit" className="mt-3" disabled={formspreeState.submitting}>
          Submit
        </Button>
        {formspreeState.succeeded && <p>Thanks for your message!</p>}
      </Form>
    );
  }

  return (
    <Form onSubmit={handleAuthSubmit}>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" onChange={handleAuthChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" onChange={handleAuthChange} required />
      </Form.Group>
      <Button type="submit" className="mt-3">{isLogin ? 'Login' : 'Signup'}</Button>
    </Form>
  );
}

export default Contact;