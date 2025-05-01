import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { getUserBookings, getBookingsByStatus, updateBookingStatus } from '../data/bookings';
import { getFlightById } from '../data/flights';
import { Booking, Flight } from '../types';
import { Plane, Calendar, Clock, DollarSign } from 'lucide-react';

const BookingsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [flightsMap, setFlightsMap] = useState<Record<string, Flight>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Get bookings for the active tab
    const userBookings = getBookingsByStatus(user.id, activeTab);
    setBookings(userBookings);
    
    // Get flight data for each booking
    const flights: Record<string, Flight> = {};
    userBookings.forEach(booking => {
      const flight = getFlightById(booking.flightId);
      if (flight) {
        flights[booking.flightId] = flight;
      }
    });
    
    setFlightsMap(flights);
    setIsLoading(false);
  }, [user, activeTab]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      updateBookingStatus(bookingId, 'cancelled');
      // Update state
      setBookings(prevBookings => 
        prevBookings.filter(booking => booking.id !== bookingId)
      );
    }
  };

  const viewBookingDetails = (bookingId: string) => {
    navigate(`/booking-confirmation/${bookingId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">My Bookings</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap -mb-px">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`inline-block p-4 mr-2 border-b-2 font-medium ${
                activeTab === 'upcoming'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`inline-block p-4 mr-2 border-b-2 font-medium ${
                activeTab === 'completed'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`inline-block p-4 border-b-2 font-medium ${
                activeTab === 'cancelled'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  No {activeTab} bookings found
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {activeTab === 'upcoming' 
                    ? "You don't have any upcoming bookings at the moment."
                    : activeTab === 'completed'
                      ? "You haven't completed any trips yet."
                      : "You don't have any cancelled bookings."
                  }
                </p>
                {activeTab !== 'upcoming' && (
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className="btn-secondary"
                  >
                    View Upcoming Bookings
                  </button>
                )}
                <Link 
                  to="/" 
                  className="btn-primary ml-4"
                >
                  Book a Flight
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map(booking => {
                  const flight = flightsMap[booking.flightId];
                  if (!flight) return null;
                  
                  return (
                    <div key={booking.id} className="card hover:shadow-lg transition-shadow">
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        {/* Flight Info */}
                        <div className="lg:col-span-2">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                              <Plane className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 dark:text-white">
                                {flight.airline} - {flight.flightNumber}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {flight.departureCity} ({flight.departureCode}) →{' '}
                                {flight.arrivalCity} ({flight.arrivalCode})
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Date & Time */}
                        <div className="lg:col-span-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {formatDate(flight.date)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {flight.departureTime} - {flight.arrivalTime}
                            </span>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="lg:col-span-1">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <span className="font-bold text-gray-900 dark:text-white">
                              ₹{booking.totalPrice.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}
                          </p>
                        </div>
                        
                        {/* Actions */}
                        <div className="lg:col-span-1 flex lg:justify-end items-center space-x-2">
                          <button
                            onClick={() => viewBookingDetails(booking.id)}
                            className="btn-secondary py-1 px-3"
                          >
                            View Details
                          </button>
                          
                          {activeTab === 'upcoming' && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="py-1 px-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm transition-colors duration-200"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default BookingsPage;