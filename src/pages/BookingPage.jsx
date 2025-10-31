import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { getFlightById } from '../data/flights';
import { addBooking } from '../data/bookings';
import { Plane, Calendar, Clock, Users, IndianRupee, AlertCircle } from 'lucide-react';

const BookingPage = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  
  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (flightId) {
      const flightData = getFlightById(flightId);
      if (flightData) {
        setFlight(flightData);
      } else {
        setError('Flight not found');
      }
      setIsLoading(false);
    }
  }, [flightId]);

  const handlePassengersChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= (flight?.availableSeats || 1)) {
      setPassengers(value);
    }
  };

  const handleBookFlight = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    if (!flight || !user) return;
    
    setIsSubmitting(true);
    
    try {
      // Create booking
      const totalPrice = flight.price * passengers;
      const booking = addBooking({
        id: Math.random().toString(36).substr(2, 9),
        flightId: flight.id,
        userId: user.id,
        status: 'upcoming',
        bookingDate: new Date().toISOString(),
        passengers,
        totalPrice
      });
      
      // Redirect to booking confirmation
      navigate(`/booking-confirmation/${booking.id}`);
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to create booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !flight) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="card max-w-xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Flight not found'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The flight you're looking for is not available.
            </p>
            <Link to="/" className="btn-primary inline-block">
              Return to Home
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(flight.price);

  const formattedTotalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(flight.price * passengers);

  const formattedDate = new Date(flight.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-white">
            <Plane className="h-6 w-6 mr-2" />
            <h1 className="text-2xl font-bold">Book Your Flight</h1>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flight Details */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Flight Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Airline</p>
                    <p className="font-medium text-gray-900 dark:text-white">{flight.airline}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Flight Number</p>
                    <p className="font-medium text-gray-900 dark:text-white">{flight.flightNumber}</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{formattedDate}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Departure</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {flight.departureTime} - {flight.departureCity} ({flight.departureCode})
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{flight.departureAirport}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Arrival</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {flight.arrivalTime} - {flight.arrivalCity} ({flight.arrivalCode})
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{flight.arrivalAirport}</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-gray-900 dark:text-white">Duration: {flight.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Passenger Details */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Passenger Details
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Passengers
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    max={flight.availableSeats}
                    value={passengers}
                    onChange={handlePassengersChange}
                    className="input-field w-24 text-center"
                  />
                  <div className="flex items-center ml-3 text-gray-600 dark:text-gray-400">
                    <Users className="h-5 w-5 mr-1" />
                    <span className="text-sm">{flight.availableSeats} seats available</span>
                  </div>
                </div>
              </div>
              
              {!isAuthenticated && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-400 mb-6">
                  <p>You need to be logged in to complete your booking.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Booking Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Price per passenger:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formattedPrice}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Passengers:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{passengers}</span>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">Total Price:</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {formattedTotalPrice}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleBookFlight}
                disabled={isSubmitting}
                className="w-full btn-primary py-3 flex items-center justify-center"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
              
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                By confirming, you agree to our Terms & Conditions and Cancellation Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingPage;