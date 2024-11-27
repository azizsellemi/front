import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
};

export default function SignUp() {
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Validation des champs
    const { email, password, confirmPassword, name } = formData;
    if (!email || !password || !confirmPassword || !name) {
      setLoading(false);
      setErrorMessage('Tous les champs sont requis.');
      return;
    }

    // Vérification que l'email contient '@'
    if (!email.includes('@')) {
      setLoading(false);
      setErrorMessage('L\'email doit contenir un symbole "@".');
      return;
    }

    // Vérification du mot de passe
    if (password.length < 6) {
      setLoading(false);
      setErrorMessage('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    // Vérification de la confirmation du mot de passe
    if (password !== confirmPassword) {
      setLoading(false);
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/student/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) { // Inscription réussie
        setSuccessMessage('Inscription réussie !');
        setFormData(initialState); // Réinitialiser le formulaire
        navigate('/signin'); // Rediriger vers la page de connexion
      } else {
        setErrorMessage(data.message || 'Une erreur est survenue lors de l\'inscription.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during sign up:', error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <section className="min-h-screen bg-gray-200 flex items-center">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-3xl">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-center">
                <div className="w-full lg:w-1/2">
                  <h1 className="text-center text-3xl font-bold mb-8">Sign up</h1>
                  <form onSubmit={handleSignUp}>
                    {/* Name Field */}
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-700">Your Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.name}
                        onChange={handleChange} 
                        required 
                      />
                    </div>

                    {/* Email Field */}
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-700">Your Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.email}
                        onChange={handleChange} 
                        required 
                      />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                      <input 
                        type="password" 
                        name="password" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.password}
                        onChange={handleChange} 
                        required 
                      />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-700">Repeat your password</label>
                      <input 
                        type="password" 
                        name="confirmPassword" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.confirmPassword}
                        onChange={handleChange} 
                        required 
                      />
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                      <div className="mb-6 text-red-500 text-sm">{errorMessage}</div>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                      <div className="mb-6 text-green-500 text-sm">{successMessage}</div>
                    )}

                    {/* Terms Checkbox */}
                    <div className="mb-6 flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <label className="text-sm text-gray-700">
                        I agree to all statements in <a href="#!" className="text-blue-500 hover:underline">Terms of service</a>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                      <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" 
                        disabled={loading}
                      >
                        {loading ? 'Chargement...' : 'Register'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Image Side */}
                <div className="hidden lg:flex items-right justify-center w-1/2">
                  <img src="/covpic2.jpg" className="rounded-lg" alt="Sample" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
