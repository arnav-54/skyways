import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { getBookingById } from '../data/bookings';
import { getFlightById } from '../data/flights';
import BookingDetails from '../components/Booking/BookingDetails';
import { CheckCircle, AlertCircle } from 'lucide-react';

const BookingConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { user, isAuthenticated } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState(null);
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    if (!bookingId) {
      setError('Booking ID is required');
      setIsLoading(false);
      return;
    }

    const bookingData = getBookingById(bookingId);
    
    if (!bookingData) {
      setError('Booking not found');
      setIsLoading(false);
      return;
    }

    const flightData = getFlightById(bookingData.flightId);
    
    if (!flightData) {
      setError('Flight not found');
      setIsLoading(false);
      return;
    }

    setBooking(bookingData);
    setFlight(flightData);
    setIsLoading(false);
  }, [bookingId]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !booking || !flight) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="card max-w-xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Booking not found'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The booking you're looking for is not available.
            </p>
            <Link to="/" className="btn-primary inline-block">
              Return to Home
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Your flight has been successfully booked.
            </p>
          </div>
          
          <BookingDetails booking={booking} flight={flight} />
          
          <div className="flex justify-center space-x-4 mt-8">
            <Link 
              to="/bookings" 
              className="btn-primary"
            >
              View All Bookings
            </Link>
            <Link 
              to="/" 
              className="btn-secondary"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingConfirmationPage;