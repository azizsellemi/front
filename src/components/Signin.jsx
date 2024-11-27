import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BiLogoFacebook } from 'react-icons/bi';
import LottieCarAnimation from './LottieCarAnimation'; // Import the animation component
import '../styles/Signin.css'; // Import updated styles

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/student/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/home');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Error occurred. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <section className="signin-container">
      {/* Animation Section */}
      <div className="signin-image">
        <LottieCarAnimation /> {/* Replace image with animation */}
      </div>

      {/* Form Section */}
      <div className="signin-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>

        {/* Social Media Login */}
        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
            <BiLogoFacebook />
          </button>
          <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
            <AiOutlineTwitter />
          </button>
        </div>

        {/* Don't have an account? Register */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Register
          </a>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
