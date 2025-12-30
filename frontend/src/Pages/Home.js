import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]); // 🔹 initial state array
  const navigate = useNavigate();

  // Check login
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  // Logout simple
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logout');
    setTimeout(() => navigate('/login'), 1000);
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:5000/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // 🔹 proper header
        },
      });

      const data = await response.json();
      console.log('API response:', data);

      // Make sure data is an array
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      handleError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome to <br /> <center>{loggedInUser}</center> </h1>
      <button onClick={handleLogout}>Logout</button>

      <div>
        {Array.isArray(products) && products.map((item, index) => (
          <ul key={index}>
            <span>{item.name} : {item.price}</span>
          </ul>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
