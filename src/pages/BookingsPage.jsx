import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { getBookingsByStatus, updateBookingStatus } from '../data/bookings';
import { getFlightById } from '../data/flights';
import { Plane, Calendar, Clock, IndianRupee } from 'lucide-react';

const BookingsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [flightsMap, setFlightsMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const userBookings = getBookingsByStatus(user.id, activeTab);
    setBookings(userBookings);

    const flights = {};
    userBookings.forEach(booking => {
      const flight = getFlightById(booking.flightId);
      if (flight) flights[booking.flightId] = flight;
    });

    setFlightsMap(flights);
    setIsLoading(false);
  }, [user, activeTab]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      updateBookingStatus(bookingId, 'cancelled');
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    }
  };

  const viewBookingDetails = (bookingId) => {
    navigate(`/booking-confirmation/${bookingId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 shadow-md">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">My Bookings</h1>
          <p className="text-sm md:text-base mt-1 opacity-90">Manage your upcoming, completed, and cancelled trips</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {['upcoming', 'completed', 'cancelled'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Empty State */}
            {bookings.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <Plane className="mx-auto mb-4 w-16 h-16 text-blue-500" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  No {activeTab} bookings
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {activeTab === 'upcoming'
                    ? "You don't have any upcoming bookings at the moment."
                    : activeTab === 'completed'
                      ? "You haven't completed any trips yet."
                      : "You don't have any cancelled bookings."}
                </p>
                <div className="flex justify-center gap-4">
                  {activeTab !== 'upcoming' && (
                    <button
                      onClick={() => setActiveTab('upcoming')}
                      className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      View Upcoming
                    </button>
                  )}
                  <Link
                    to="/"
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
                  >
                    Book a Flight
                  </Link>
                </div>
              </div>
            ) : (
              /* Bookings List */
              <div className="space-y-6">
                {bookings.map(booking => {
                  const flight = flightsMap[booking.flightId];
                  if (!flight) return null;

                  return (
                    <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
                        
                        {/* Flight Info */}
                        <div className="lg:col-span-2 flex items-start space-x-3">
                          <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                            <Plane className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">
                              {flight.airline} - {flight.flightNumber}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {flight.departureCity} ({flight.departureCode}) → {flight.arrivalCity} ({flight.arrivalCode})
                            </p>
                          </div>
                        </div>

                        {/* Date & Time */}
                        <div className="lg:col-span-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <span className="text-gray-700 dark:text-gray-300">{formatDate(flight.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {flight.departureTime} - {flight.arrivalTime}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="lg:col-span-1 space-y-1">
                          <div className="flex items-center space-x-1">
                            <IndianRupee className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <span className="font-bold text-gray-900 dark:text-white">₹{booking.totalPrice.toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="lg:col-span-1 flex justify-end items-center gap-2">
                          <button
                            onClick={() => viewBookingDetails(booking.id)}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                          >
                            View Details
                          </button>
                          {activeTab === 'upcoming' && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
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