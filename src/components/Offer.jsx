import React, { useState } from 'react';
import './Offer.css'; // This assumes that Offer.css is in the same directory as Offer.js

export default function Offer() {
  const [startingLocation, setStartingLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérification des champs avant soumission
    if (!startingLocation || !destination || !date || !seats || !phone) {
      setError('Tous les champs sont requis.');
      return;
    }

    // Remplacer les valeurs nulles ou vides par une chaîne vide
    const formData = {
      starting_location: startingLocation.trim() || '',
      destination: destination.trim() || '',
      date: date.trim() || '',
      seats: seats.trim() || '',
      phone: phone.trim() || '',
      additional_info: additionalInfo.trim() || '',
    };

    console.log('Form Data:', formData); // Log des données avant envoi

    try {
      // Envoyer les données au backend avec fetch
      const response = await fetch('http://localhost:8080/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi des données');
      }

      const data = await response.json();
      setSuccessMessage(data.message || 'Offre enregistrée avec succès !');

      // Réinitialiser le formulaire après une soumission réussie
      setStartingLocation('');
      setDestination('');
      setDate('');
      setSeats('');
      setPhone('');
      setAdditionalInfo('');
    } catch (error) {
      setError('Erreur lors de l\'envoi des données : ' + error.message);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="container mx-auto">
        <form className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center text-blue-800">Offer a Ride</h2>

          {/* Starting Location */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="starting_location"
              id="starting_location"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer custom-input"
              placeholder=" "
              value={startingLocation}
              onChange={(e) => {
                setStartingLocation(e.target.value);
              }}
              required
            />
            <label
              htmlFor="starting_location"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Starting Location
            </label>
          </div>

          {/* Destination */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="destination"
              id="destination"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer custom-input"
              placeholder=" "
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
            <label
              htmlFor="destination"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Destination
            </label>
          </div>

          {/* Date of the ride */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="date"
              id="date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer custom-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <label
              htmlFor="date"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Date of Ride
            </label>
          </div>

          {/* Number of seats available */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="seats"
              id="seats"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer custom-input"
              placeholder=" "
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              min="1"
              required
            />
            <label
              htmlFor="seats"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Number of Available Seats
            </label>
          </div>

          {/* Phone number */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer custom-input"
              placeholder=" "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number
            </label>
          </div>

          {/* Additional Information */}
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              name="additional_info"
              id="additional_info"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer custom-input"
              placeholder=" "
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
            <label
              htmlFor="additional_info"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Additional Information
            </label>
          </div>

          {/* Error and Success Messages */}
          {error && <div className="text-red-500 mb-3">{error}</div>}
          {successMessage && <div className="text-green-500 mb-3">{successMessage}</div>}

          {/* Submit Button */}
          <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-lg custom-btn">
            Offer Ride
          </button>
        </form>
      </div>
    </section>
  );
}
